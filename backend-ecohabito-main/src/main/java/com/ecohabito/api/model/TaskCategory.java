package com.ecohabito.api.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TaskCategory {
    ENERGIA("energia"),
    AGUA("água"),
    RESIDUOS("resíduos"),
    CONSUMO("consumo");

    private static final Logger logger = LoggerFactory.getLogger(TaskCategory.class);
    private final String value;

    TaskCategory(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    public static TaskCategory fromValue(String value) {
        logger.debug("Tentando converter valor para categoria: {}", value);
        for (TaskCategory category : TaskCategory.values()) {
            logger.debug("Comparando com: {}", category.value);
            if (category.value.equals(value)) {
                logger.debug("Categoria encontrada: {}", category);
                return category;
            }
        }
        logger.error("Categoria não encontrada para o valor: {}", value);
        throw new IllegalArgumentException("Categoria inválida: " + value);
    }
} 