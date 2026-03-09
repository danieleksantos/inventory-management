package com.autoflex.challenge.dto;

import org.eclipse.microprofile.openapi.annotations.media.Schema;
import java.math.BigDecimal;

@Schema(description = "Sugestão de fabricação baseada na disponibilidade de estoque e lucro")
public record ProductionSuggestionDTO(
    @Schema(description = "Nome do produto sugerido", defaultValue = "Luxury Sedan")
    String productName, 
    
    @Schema(description = "Quantidade máxima sugerida para produção", defaultValue = "2")
    int quantity, 
    
    @Schema(description = "Preço unitário do produto", defaultValue = "85000.00")
    BigDecimal unitPrice
) {}