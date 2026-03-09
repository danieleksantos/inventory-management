package com.autoflex.challenge.services;

import com.autoflex.challenge.dto.ProductCompositionDTO;
import com.autoflex.challenge.models.Product;
import com.autoflex.challenge.models.ProductComposition;
import com.autoflex.challenge.models.RawMaterial;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;
import java.util.List;

@ApplicationScoped
public class ProductCompositionService {

    public List<ProductComposition> listAll() {
        return ProductComposition.listAll();
    }

    public List<ProductComposition> listByProduct(Long productId) {
        return ProductComposition.list("product.id", productId);
    }

    @Transactional
    public ProductComposition addOrUpdateIngredient(ProductCompositionDTO dto) {
        ProductComposition existing = ProductComposition.find(
            "product.id = ?1 and rawMaterial.id = ?2", 
            dto.productId(), 
            dto.rawMaterialId()
        ).firstResult();

        if (existing != null) {
            existing.quantityNeeded = dto.quantityNeeded();
            return existing;
        }

        Product product = Product.findById(dto.productId());
        RawMaterial material = RawMaterial.findById(dto.rawMaterialId());

        if (product == null || material == null) {
            throw new BadRequestException("Produto ou Matéria-Prima não encontrados");
        }

        ProductComposition composition = new ProductComposition();
        composition.product = product;
        composition.rawMaterial = material;
        composition.quantityNeeded = dto.quantityNeeded();
        composition.persist();
        
        return composition;
    }

    @Transactional
    public void delete(Long id) {
        if (!ProductComposition.deleteById(id)) {
            throw new NotFoundException("Composição não encontrada");
        }
    }
}