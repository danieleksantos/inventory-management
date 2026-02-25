package com.autoflex.challenge.dto;

import java.util.List;

public record ProductionResponseDTO(
    List<ProductionSuggestionDTO> suggestions,
    List<StockRemainderDTO> remainders
) {}