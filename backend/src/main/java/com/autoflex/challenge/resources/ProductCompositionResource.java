package com.autoflex.challenge.resources;

import com.autoflex.challenge.models.ProductComposition;
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
    public Response addIngredient(ProductComposition composition) {
        composition.persist();
        return Response.status(Response.Status.CREATED).entity(composition).build();
    }

    @GET
    @Path("/product/{productId}")
    public List<ProductComposition> getByProduct(@PathParam("productId") Long productId) {
        return ProductComposition.list("product.id", productId);
    }
}