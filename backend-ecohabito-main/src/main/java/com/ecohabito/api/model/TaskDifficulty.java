package com.ecohabito.api.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TaskDifficulty {
    FACIL("Fácil"),
    MEDIO("Médio"),
    DIFICIL("Difícil");

    private static final Logger logger = LoggerFactory.getLogger(TaskDifficulty.class);
    private final String value;

    TaskDifficulty(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    public static TaskDifficulty fromValue(String value) {
        logger.debug("Tentando converter valor para dificuldade: {}", value);
        String normalizedValue = value.toUpperCase();
        
        for (TaskDifficulty difficulty : TaskDifficulty.values()) {
            logger.debug("Comparando com: {}", difficulty.value);
            if (difficulty.value.equals(value) || 
                difficulty.name().equals(normalizedValue)) {
                logger.debug("Dificuldade encontrada: {}", difficulty);
                return difficulty;
            }
        }
        logger.error("Dificuldade não encontrada para o valor: {}", value);
        throw new IllegalArgumentException("Dificuldade inválida: " + value);
    }
} 