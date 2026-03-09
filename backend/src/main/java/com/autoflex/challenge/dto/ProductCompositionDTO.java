package com.autoflex.challenge.dto;

import org.eclipse.microprofile.openapi.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Schema(description = "Representa o vínculo de necessidade entre um produto e seu insumo")
public record ProductCompositionDTO(
    @Schema(description = "ID único do produto final", defaultValue = "1")
    @NotNull Long productId,
    
    @Schema(description = "ID único da matéria-prima necessária", defaultValue = "5")
    @NotNull Long rawMaterialId,
    
    @Schema(description = "Quantidade física necessária para fabricar uma unidade", defaultValue = "2.5")
    @NotNull @Positive Double quantityNeeded
) {}