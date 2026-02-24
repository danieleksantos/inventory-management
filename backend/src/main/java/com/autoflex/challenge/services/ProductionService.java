package com.autoflex.challenge.services;

import com.autoflex.challenge.models.*;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.*;
import java.util.stream.Collectors;
import java.math.BigDecimal;

@ApplicationScoped 
public class ProductionService {

    public List<ProductionSuggestionDTO> calculateSuggestions() {
        List<Product> products = Product.list("order by price desc");

        Map<Long, Double> virtualStock = RawMaterial.<RawMaterial>listAll().stream()
                .collect(Collectors.toMap(
                    rm -> rm.id,          
                    rm -> rm.stockQuantity 
                ));

        List<ProductComposition> allCompositions = ProductComposition.listAll();
        
        Map<Long, List<ProductComposition>> compositionsByProduct = allCompositions.stream()
                .collect(Collectors.groupingBy(c -> c.product.id));

        List<ProductionSuggestionDTO> suggestions = new ArrayList<>();

        for (Product product : products) {
            List<ProductComposition> components = compositionsByProduct.getOrDefault(product.id, new ArrayList<>());
            
            if (components.isEmpty()) continue; 

            int maxPossibleUnits = Integer.MAX_VALUE; 

            for (ProductComposition comp : components) {
                double stockAvailable = virtualStock.getOrDefault(comp.rawMaterial.id, 0.0);
                
                int unitsWithThisIngredient = (int) (stockAvailable / comp.quantityNeeded);
                
                maxPossibleUnits = Math.min(maxPossibleUnits, unitsWithThisIngredient);
            }

            if (maxPossibleUnits > 0) {
                suggestions.add(new ProductionSuggestionDTO(product.name, maxPossibleUnits, product.price));

                for (ProductComposition comp : components) {
                    double amountUsed = maxPossibleUnits * comp.quantityNeeded;
                    double currentStock = virtualStock.get(comp.rawMaterial.id);
                    virtualStock.put(comp.rawMaterial.id, currentStock - amountUsed);
                }
            }
        }
        
        return suggestions;
    }

    public record ProductionSuggestionDTO(
        String productName, 
        int quantity, 
        BigDecimal unitPrice
    ) {}
}