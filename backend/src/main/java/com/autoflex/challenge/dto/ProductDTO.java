package com.autoflex.challenge.dto;

import org.eclipse.microprofile.openapi.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

@Schema(description = "Dados para cadastro de um novo produto")
public record ProductDTO(
    @Schema(description = "Nome do produto", defaultValue = "Luxury Sedan")
    @NotBlank(message = "Product name is required") 
    String name, 
    
    @Schema(description = "Preço de venda unitário", defaultValue = "85000.00")
    @NotNull 
    @Positive(message = "Price must be positive") 
    BigDecimal price
) {}