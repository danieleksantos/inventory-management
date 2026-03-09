package com.autoflex.challenge.services;

import com.autoflex.challenge.dto.ProductDTO;
import com.autoflex.challenge.models.Product;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import java.util.List;

@ApplicationScoped
public class ProductService {

    public List<Product> listAll() {
        return Product.listAll();
    }

    @Transactional
    public Product create(ProductDTO dto) {
        Product product = new Product();
        product.name = dto.name();
        product.price = dto.price();
        product.persist();
        return product;
    }

    @Transactional
    public Product update(Long id, Product updateData) {
        Product entity = Product.findById(id);
        if (entity == null) {
            throw new NotFoundException("Produto não encontrado");
        }
        entity.name = updateData.name;
        entity.price = updateData.price;
        return entity;
    }

    @Transactional
    public void delete(Long id) {
        Product entity = Product.findById(id);
        if (entity == null) {
            throw new NotFoundException("Produto não encontrado");
        }
        entity.delete();
    }
}