package com.ecohabito.api.controller;

import com.ecohabito.api.model.Achievement;
import com.ecohabito.api.repository.AchievementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "http://localhost:5173")
public class AchievementController {
    private static final Logger logger = LoggerFactory.getLogger(AchievementController.class);

    @Autowired
    private AchievementRepository achievementRepository;

    @GetMapping
    public ResponseEntity<List<Achievement>> getAllAchievements() {
        try {
            logger.debug("Buscando todas as conquistas");
            return ResponseEntity.ok(achievementRepository.findAll());
        } catch (Exception e) {
            logger.error("Erro ao buscar conquistas: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Achievement> getAchievementById(@PathVariable String id) {
        try {
            logger.debug("Buscando conquista por ID: {}", id);
            return achievementRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao buscar conquista por ID: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/unlocked")
    public ResponseEntity<List<Achievement>> getUnlockedAchievements() {
        try {
            logger.debug("Buscando conquistas desbloqueadas");
            return ResponseEntity.ok(achievementRepository.findByUnlocked(true));
        } catch (Exception e) {
            logger.error("Erro ao buscar conquistas desbloqueadas: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Achievement> createAchievement(@RequestBody Achievement achievement) {
        try {
            logger.debug("Criando nova conquista");
            return ResponseEntity.ok(achievementRepository.save(achievement));
        } catch (Exception e) {
            logger.error("Erro ao criar conquista: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Achievement> updateAchievement(@PathVariable String id, @RequestBody Achievement achievement) {
        try {
            logger.debug("Atualizando conquista: {}", id);
            return achievementRepository.findById(id)
                    .map(existingAchievement -> {
                        achievement.setId(id);
                        return ResponseEntity.ok(achievementRepository.save(achievement));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao atualizar conquista: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAchievement(@PathVariable String id) {
        try {
            logger.debug("Deletando conquista: {}", id);
            return achievementRepository.findById(id)
                    .map(achievement -> {
                        achievementRepository.delete(achievement);
                        return ResponseEntity.ok().<Void>build();
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao deletar conquista: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
} 