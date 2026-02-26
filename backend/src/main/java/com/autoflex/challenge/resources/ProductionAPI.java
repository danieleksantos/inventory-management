package com.autoflex.challenge.resources;

import com.autoflex.challenge.dto.ProductionResponseDTO;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Tag(name = "Produção", description = "Gestão de sugestões de fabricação inteligente")
public interface ProductionAPI {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(
        summary = "Get suggestions fo production",
        description = "Analisa o estoque atual e sugere a produção priorizando produtos de maior valor, listando também o resíduo de matéria-prima."
    )
    ProductionResponseDTO getSuggestions();
}