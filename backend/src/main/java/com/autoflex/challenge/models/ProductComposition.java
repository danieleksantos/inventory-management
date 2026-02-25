package com.autoflex.challenge.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

@Entity
public class ProductComposition extends PanacheEntity {

    @Schema(hidden = true) 
    public Long id;

    @ManyToOne
    @NotNull
    public Product product;

    @ManyToOne
    @NotNull
    public RawMaterial rawMaterial;

    @NotNull
    @Positive(message = "Quantity must be greater than zero")
    public Double quantityNeeded;
}