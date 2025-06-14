package com.ecohabito.api.config;

import com.ecohabito.api.model.TaskCategory;
import com.ecohabito.api.model.TaskDifficulty;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        
        // Adiciona deserializador personalizado para TaskCategory
        module.addDeserializer(TaskCategory.class, new JsonDeserializer<TaskCategory>() {
            @Override
            public TaskCategory deserialize(JsonParser p, DeserializationContext ctxt) {
                try {
                    String value = p.getValueAsString();
                    return TaskCategory.fromValue(value);
                } catch (Exception e) {
                    throw new RuntimeException("Erro ao deserializar TaskCategory", e);
                }
            }
        });

        // Adiciona deserializador personalizado para TaskDifficulty
        module.addDeserializer(TaskDifficulty.class, new JsonDeserializer<TaskDifficulty>() {
            @Override
            public TaskDifficulty deserialize(JsonParser p, DeserializationContext ctxt) {
                try {
                    String value = p.getValueAsString();
                    return TaskDifficulty.fromValue(value);
                } catch (Exception e) {
                    throw new RuntimeException("Erro ao deserializar TaskDifficulty", e);
                }
            }
        });

        // Registra o módulo para suporte a LocalDateTime
        mapper.registerModule(new JavaTimeModule());
        mapper.registerModule(module);
        return mapper;
    }
} 