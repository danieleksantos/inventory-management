package com.autoflex.challenge.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class RawMaterial extends PanacheEntity {

    @NotBlank(message = "Name cannot be empty")
    public String name;

    @NotNull
    @Min(value = 0, message = "Stock quantity cannot be negative")
    public Double stockQuantity;
}