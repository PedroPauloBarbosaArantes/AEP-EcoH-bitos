package com.ecohabito.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class UserStats {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    private int tasksCompleted;
    private int streak;
    private int impactScore;
    private LocalDateTime lastCompletedDate;

    public UserStats() {
        this.tasksCompleted = 0;
        this.streak = 0;
        this.impactScore = 0;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getTasksCompleted() {
        return tasksCompleted;
    }

    public void setTasksCompleted(int tasksCompleted) {
        this.tasksCompleted = tasksCompleted;
    }

    public int getStreak() {
        return streak;
    }

    public void setStreak(int streak) {
        this.streak = streak;
    }

    public int getImpactScore() {
        return impactScore;
    }

    public void setImpactScore(int impactScore) {
        this.impactScore = impactScore;
    }

    public LocalDateTime getLastCompletedDate() {
        return lastCompletedDate;
    }

    public void setLastCompletedDate(LocalDateTime lastCompletedDate) {
        this.lastCompletedDate = lastCompletedDate;
    }
}