package com.autoflex.challenge.resources;

import com.autoflex.challenge.services.ProductionService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/production-suggestions") // Mantemos aqui para o Quarkus não se perder
@Produces(MediaType.APPLICATION_JSON) // Garante o JSON
public class ProductionResource implements ProductionAPI {

    @Inject
    ProductionService service;

    @Override
    public ProductionService.ProductionResponseDTO getSuggestions() {
        return service.calculateSuggestions();
    }
}