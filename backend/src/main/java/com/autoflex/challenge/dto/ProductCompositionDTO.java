package com.autoflex.challenge.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProductCompositionDTO(
    @NotNull(message = "Product ID is required") 
    Long productId,
    
    @NotNull(message = "Raw Material ID is required") 
    Long rawMaterialId,
    
    @NotNull 
    @Positive(message = "Quantity must be greater than zero") 
    Double quantityNeeded
) {}