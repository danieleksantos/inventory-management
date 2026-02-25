package com.autoflex.challenge.dto;

import java.math.BigDecimal;

public record ProductionSuggestionDTO(String productName, int quantity, BigDecimal unitPrice) {}