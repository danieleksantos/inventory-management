package com.autoflex.challenge.resources;

import com.autoflex.challenge.services.ProductionService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/production-suggestions")
@Produces(MediaType.APPLICATION_JSON)
public class ProductionResource {

    @Inject
    ProductionService service;

    @GET
    public ProductionService.ProductionResponseDTO getSuggestions() {
        return service.calculateSuggestions();
    }
}