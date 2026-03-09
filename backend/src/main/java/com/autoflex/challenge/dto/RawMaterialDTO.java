package com.autoflex.challenge.dto;

import org.eclipse.microprofile.openapi.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

@Schema(description = "Dados para cadastro ou atualização de estoque de matéria-prima")
public record RawMaterialDTO(
    @Schema(description = "Nome da matéria-prima", defaultValue = "Steel Sheet")
    @NotBlank(message = "Name is required") 
    String name,

    @Schema(description = "Quantidade atual em estoque", defaultValue = "500.0")
    @NotNull 
    @PositiveOrZero(message = "Stock quantity cannot be negative") 
    Double stockQuantity
) {}