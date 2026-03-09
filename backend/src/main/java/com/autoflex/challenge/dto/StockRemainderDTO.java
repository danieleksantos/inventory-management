package com.autoflex.challenge.dto;

import org.eclipse.microprofile.openapi.annotations.media.Schema;

@Schema(description = "Representa o resíduo (sobra) de matéria-prima após o cálculo de produção")
public record StockRemainderDTO(
    @Schema(description = "Nome da matéria-prima", defaultValue = "High-Density Plastic")
    String materialName, 
    
    @Schema(description = "Quantidade que sobrará em estoque", defaultValue = "122.0")
    Double remainingQuantity
) {}