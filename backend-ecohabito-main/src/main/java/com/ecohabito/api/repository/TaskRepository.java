package com.ecohabito.api.repository;

import com.ecohabito.api.model.Task;
import com.ecohabito.api.model.TaskCategory;
import com.ecohabito.api.model.TaskDifficulty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, String> {
    List<Task> findByCategory(TaskCategory category);
    List<Task> findByCompleted(Boolean completed);
    List<Task> findByDifficulty(TaskDifficulty difficulty);
    List<Task> findByCategoryAndCompleted(TaskCategory category, Boolean completed);
} 