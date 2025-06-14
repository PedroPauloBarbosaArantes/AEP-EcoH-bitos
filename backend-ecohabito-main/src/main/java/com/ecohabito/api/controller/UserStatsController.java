package com.ecohabito.api.controller;

import com.ecohabito.api.model.UserStats;
import com.ecohabito.api.repository.UserStatsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "http://localhost:5173")
public class UserStatsController {
    private static final Logger logger = LoggerFactory.getLogger(UserStatsController.class);

    @Autowired
    private UserStatsRepository userStatsRepository;

    @GetMapping
    public ResponseEntity<UserStats> getStats() {
        try {
            logger.debug("Buscando estatísticas do usuário");
            UserStats stats = userStatsRepository.findAll().stream()
                    .findFirst()
                    .orElseGet(() -> {
                        logger.debug("Nenhuma estatística encontrada, criando nova");
                        UserStats newStats = new UserStats();
                        return userStatsRepository.save(newStats);
                    });
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            logger.error("Erro ao buscar estatísticas: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    public ResponseEntity<UserStats> updateStats(@RequestBody UserStats stats) {
        try {
            logger.debug("Atualizando estatísticas do usuário");
            return userStatsRepository.findAll().stream()
                    .findFirst()
                    .map(existingStats -> {
                        stats.setId(existingStats.getId());
                        return ResponseEntity.ok(userStatsRepository.save(stats));
                    })
                    .orElseGet(() -> ResponseEntity.ok(userStatsRepository.save(stats)));
        } catch (Exception e) {
            logger.error("Erro ao atualizar estatísticas: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping("/reset")
    public ResponseEntity<UserStats> resetStats() {
        try {
            logger.debug("Resetando estatísticas do usuário");
            return userStatsRepository.findAll().stream()
                    .findFirst()
                    .map(stats -> {
                        stats.setTasksCompleted(0);
                        stats.setStreak(0);
                        stats.setImpactScore(0);
                        stats.setLastCompletedDate(null);
                        return ResponseEntity.ok(userStatsRepository.save(stats));
                    })
                    .orElseGet(() -> ResponseEntity.ok(userStatsRepository.save(new UserStats())));
        } catch (Exception e) {
            logger.error("Erro ao resetar estatísticas: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
} 