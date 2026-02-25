package com.autoflex.challenge.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record RawMaterialDTO(
    @NotBlank String name,
    @NotNull @PositiveOrZero Double stockQuantity
) {}