package com.autoflex.challenge.resources;

import com.autoflex.challenge.dto.ProductCompositionDTO;
import com.autoflex.challenge.models.Product;
import com.autoflex.challenge.models.ProductComposition;
import com.autoflex.challenge.models.RawMaterial;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/product-compositions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductCompositionResource {

    @GET
    public List<ProductComposition> getAll() {
        return ProductComposition.listAll();
    }


    @POST
    @Transactional
    public Response addOrUpdateIngredient(ProductCompositionDTO dto) {
        ProductComposition existing = ProductComposition.find(
            "product.id = ?1 and rawMaterial.id = ?2", 
            dto.productId(), 
            dto.rawMaterialId()
        ).firstResult();

        if (existing != null) {
            existing.quantityNeeded = dto.quantityNeeded();
            return Response.ok(existing).build();
        }

        Product product = Product.findById(dto.productId());
        RawMaterial material = RawMaterial.findById(dto.rawMaterialId());

        if (product == null || material == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                .entity("Produto ou Matéria-Prima não encontrados")
                .build();
        }

        ProductComposition composition = new ProductComposition();
        composition.product = product;
        composition.rawMaterial = material;
        composition.quantityNeeded = dto.quantityNeeded();

        composition.persist();
        
        return Response.status(Response.Status.CREATED).entity(composition).build();
    }


    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = ProductComposition.deleteById(id);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build();
    }

    @GET
    @Path("/product/{productId}")
    public List<ProductComposition> getByProduct(@PathParam("productId") Long productId) {
        return ProductComposition.list("product.id", productId);
    }
}