package com.ecohabito.api.controller;

import com.ecohabito.api.model.Task;
import com.ecohabito.api.model.TaskCategory;
import com.ecohabito.api.model.TaskDifficulty;
import com.ecohabito.api.repository.TaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        return taskRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Task>> getTasksByCategory(@PathVariable String category) {
        try {
            TaskCategory taskCategory = TaskCategory.fromValue(category);
            return ResponseEntity.ok(taskRepository.findByCategory(taskCategory));
        } catch (IllegalArgumentException e) {
            logger.error("Categoria inválida: {}", category);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        try {
            logger.debug("Recebendo tarefa para criação:");
            logger.debug("Título: {}", task.getTitle());
            logger.debug("Descrição: {}", task.getDescription());
            logger.debug("Categoria: {}", task.getCategory());
            logger.debug("Impacto: {}", task.getImpact());
            logger.debug("Dificuldade: {}", task.getDifficulty());
            
            if (task.getTitle() == null || task.getTitle().trim().isEmpty()) {
                logger.error("Título da tarefa é obrigatório");
                return ResponseEntity.badRequest().build();
            }
            
            if (task.getDescription() == null || task.getDescription().trim().isEmpty()) {
                logger.error("Descrição da tarefa é obrigatória");
                return ResponseEntity.badRequest().build();
            }
            
            if (task.getCategory() == null) {
                logger.error("Categoria da tarefa é obrigatória");
                return ResponseEntity.badRequest().build();
            }
            
            if (task.getImpact() == null || task.getImpact().trim().isEmpty()) {
                logger.error("Impacto da tarefa é obrigatório");
                return ResponseEntity.badRequest().build();
            }
            
            if (task.getDifficulty() == null) {
                logger.error("Dificuldade da tarefa é obrigatória");
                return ResponseEntity.badRequest().build();
            }

            // Converter categoria
            try {
                logger.debug("Tentando converter categoria: {}", task.getCategory());
                TaskCategory category = TaskCategory.fromValue(task.getCategory().getValue());
                task.setCategory(category);
                logger.debug("Categoria convertida com sucesso: {}", category);
            } catch (IllegalArgumentException e) {
                logger.error("Erro ao converter categoria: {}", e.getMessage());
                return ResponseEntity.badRequest().build();
            }

            // Converter dificuldade
            try {
                logger.debug("Tentando converter dificuldade: {}", task.getDifficulty());
                TaskDifficulty difficulty = TaskDifficulty.fromValue(task.getDifficulty().getValue());
                task.setDifficulty(difficulty);
                logger.debug("Dificuldade convertida com sucesso: {}", difficulty);
            } catch (IllegalArgumentException e) {
                logger.error("Erro ao converter dificuldade: {}", e.getMessage());
                return ResponseEntity.badRequest().build();
            }

            task.setCompleted(false);
            Task savedTask = taskRepository.save(task);
            logger.debug("Tarefa criada com sucesso: {}", savedTask);
            return ResponseEntity.ok(savedTask);
        } catch (Exception e) {
            logger.error("Erro ao criar tarefa: ", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody Task task) {
        try {
            logger.debug("Recebendo tarefa para atualização: {}", task);
            return taskRepository.findById(id)
                    .map(existingTask -> {
                        task.setId(id);
                        Task updatedTask = taskRepository.save(task);
                        logger.debug("Tarefa atualizada com sucesso: {}", updatedTask);
                        return ResponseEntity.ok(updatedTask);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao atualizar tarefa: ", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        try {
            logger.debug("Recebendo requisição para deletar tarefa: {}", id);
            return taskRepository.findById(id)
                    .map(task -> {
                        taskRepository.delete(task);
                        logger.debug("Tarefa deletada com sucesso: {}", id);
                        return ResponseEntity.noContent().<Void>build();
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao deletar tarefa: ", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Task> toggleTask(@PathVariable String id) {
        try {
            logger.debug("Recebendo requisição para alternar tarefa: {}", id);
            return taskRepository.findById(id)
                    .map(task -> {
                        task.setCompleted(!task.getCompleted());
                        Task updatedTask = taskRepository.save(task);
                        logger.debug("Tarefa alternada com sucesso: {}", updatedTask);
                        return ResponseEntity.ok(updatedTask);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao alternar tarefa: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
} 