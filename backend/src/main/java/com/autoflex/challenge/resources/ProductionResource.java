    package com.autoflex.challenge.resources;

    import com.autoflex.challenge.services.ProductionService;
    import com.autoflex.challenge.dto.ProductionResponseDTO;
    import jakarta.inject.Inject;
    import jakarta.ws.rs.Path;
    import jakarta.ws.rs.Produces;
    import jakarta.ws.rs.core.MediaType;

    @Path("/production-suggestions")
    @Produces(MediaType.APPLICATION_JSON)
    public class ProductionResource implements ProductionAPI {

        @Inject
        ProductionService service;

        @Override
        public ProductionResponseDTO getSuggestions() {
            return service.calculateSuggestions();
        }
    }