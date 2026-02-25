package com.autoflex.challenge.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public record ProductDTO(
    @NotBlank(message = "Product name is required") 
    String name, 
    
    @NotNull 
    @Positive(message = "Price must be positive") 
    BigDecimal price
) {}