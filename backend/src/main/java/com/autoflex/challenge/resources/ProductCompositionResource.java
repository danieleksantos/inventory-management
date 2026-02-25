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

    @POST
    @Transactional
    public Response addIngredient(ProductCompositionDTO dto) {
        ProductComposition composition = new ProductComposition();
        
        Product product = Product.findById(dto.productId());
        RawMaterial material = RawMaterial.findById(dto.rawMaterialId());

        if (product == null || material == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                .entity("Product or Raw Material not found with the provided IDs").build();
        }

        composition.product = product;
        composition.rawMaterial = material;
        composition.quantityNeeded = dto.quantityNeeded();

        composition.persist();
        
        return Response.status(Response.Status.CREATED).entity(composition).build();
    }

    @GET
    @Path("/product/{productId}")
    public List<ProductComposition> getByProduct(@PathParam("productId") Long productId) {
        return ProductComposition.list("product.id", productId);
    }
}