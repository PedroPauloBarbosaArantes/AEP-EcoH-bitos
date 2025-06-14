package com.ecohabito.api.config;

import com.ecohabito.api.model.Achievement;
import com.ecohabito.api.model.UserStats;
import com.ecohabito.api.repository.AchievementRepository;
import com.ecohabito.api.repository.UserStatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AchievementRepository achievementRepository;

    @Autowired
    private UserStatsRepository userStatsRepository;

    @Override
    public void run(String... args) {
        // Inicializa UserStats se não existir
        if (userStatsRepository.count() == 0) {
            UserStats stats = new UserStats();
            userStatsRepository.save(stats);
        }

        // Inicializa Achievements se não existirem
        if (achievementRepository.count() == 0) {
            Achievement achievement1 = new Achievement();
            achievement1.setTitle("Primeiro Passo");
            achievement1.setDescription("Complete sua primeira tarefa");
            achievement1.setIcon("🌱");
            achievement1.setPoints(10);
            achievement1.setUnlocked(false);
            achievementRepository.save(achievement1);

            Achievement achievement2 = new Achievement();
            achievement2.setTitle("Economia de Energia");
            achievement2.setDescription("Complete 5 tarefas de economia de energia");
            achievement2.setIcon("⚡");
            achievement2.setPoints(20);
            achievement2.setUnlocked(false);
            achievementRepository.save(achievement2);

            Achievement achievement3 = new Achievement();
            achievement3.setTitle("Guardião da Água");
            achievement3.setDescription("Complete 5 tarefas de economia de água");
            achievement3.setIcon("💧");
            achievement3.setPoints(20);
            achievement3.setUnlocked(false);
            achievementRepository.save(achievement3);
        }
    }
} 