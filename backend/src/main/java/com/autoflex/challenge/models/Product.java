package com.autoflex.challenge.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

@Entity
public class Product extends PanacheEntity {
    @Schema(readOnly = true)
    public Long id;

    @NotBlank(message = "Product name is required")
    public String name;

    @NotNull
    @Positive(message = "Price must be positive")
    public BigDecimal price;
}