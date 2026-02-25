package com.autoflex.challenge.services;

import com.autoflex.challenge.models.*;
import com.autoflex.challenge.dto.*;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
public class ProductionService {

    public ProductionResponseDTO calculateSuggestions() {
        
        List<RawMaterial> allMaterials = RawMaterial.listAll();
        
        List<Product> products = Product.list("order by price desc");

        List<ProductComposition> allCompositions = ProductComposition.listAll();

        Map<Long, Double> virtualStock = allMaterials.stream()
                .collect(Collectors.toMap(rm -> rm.id, rm -> rm.stockQuantity));

        Map<Long, List<ProductComposition>> compositionsByProduct = allCompositions.stream()
                .collect(Collectors.groupingBy(c -> c.product.id));

        List<ProductionSuggestionDTO> suggestions = new ArrayList<>();

        for (Product product : products) {
            List<ProductComposition> components = compositionsByProduct.getOrDefault(product.id, List.of());
            
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
                    virtualStock.put(comp.rawMaterial.id, virtualStock.get(comp.rawMaterial.id) - amountUsed);
                }
            }
        }

        List<StockRemainderDTO> remainders = allMaterials.stream()
                .map(rm -> new StockRemainderDTO(
                    rm.name, 
                    virtualStock.getOrDefault(rm.id, 0.0)
                ))
                .collect(Collectors.toList());

        return new ProductionResponseDTO(suggestions, remainders);
    }
   
}