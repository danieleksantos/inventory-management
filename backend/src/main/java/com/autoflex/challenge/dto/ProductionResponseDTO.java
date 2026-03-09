package com.autoflex.challenge.dto;

import org.eclipse.microprofile.openapi.annotations.media.Schema;
import java.util.List;

@Schema(description = "Resposta completa contendo as sugestões de produção e o resíduo de materiais")
public record ProductionResponseDTO(
    @Schema(description = "Lista de produtos sugeridos para fabricação")
    List<ProductionSuggestionDTO> suggestions,
    
    @Schema(description = "Lista do que restará em estoque para cada matéria-prima")
    List<StockRemainderDTO> remainders
) {}