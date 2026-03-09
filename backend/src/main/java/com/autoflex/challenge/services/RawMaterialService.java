package com.autoflex.challenge.services;

import com.autoflex.challenge.dto.RawMaterialDTO;
import com.autoflex.challenge.models.RawMaterial;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import java.util.List;

@ApplicationScoped
public class RawMaterialService {

    public List<RawMaterial> listAll() {
        return RawMaterial.listAll();
    }

    @Transactional
    public RawMaterial create(RawMaterialDTO dto) {
        RawMaterial material = new RawMaterial();
        material.name = dto.name();
        material.stockQuantity = dto.stockQuantity();
        material.persist();
        return material;
    }

    @Transactional
    public RawMaterial update(Long id, RawMaterial updateData) {
        RawMaterial entity = RawMaterial.findById(id);
        if (entity == null) {
            throw new NotFoundException("Matéria-prima não encontrada");
        }
        entity.name = updateData.name;
        entity.stockQuantity = updateData.stockQuantity;
        return entity;
    }

    @Transactional
    public void delete(Long id) {
        RawMaterial entity = RawMaterial.findById(id);
        if (entity == null) {
            throw new NotFoundException();
        }
        entity.delete();
    }
}