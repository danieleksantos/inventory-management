package com.autoflex.challenge.resources;

import com.autoflex.challenge.dto.ProductDTO;
import com.autoflex.challenge.models.Product;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @GET
    public List<Product> getAll() {
        return Product.listAll();
    }

    @POST
    @Transactional
    public Response create(ProductDTO dto) { 
    Product product = new Product();
    product.name = dto.name();  
    product.price = dto.price();
    
    product.persist();
    return Response.status(Response.Status.CREATED).entity(product).build();
}

    @PUT
    @Path("/{id}")
    @Transactional
    public Product update(@PathParam("id") Long id, Product product) {
        Product entity = Product.findById(id);
        if (entity == null) {
            throw new NotFoundException("Produto não encontrado");
        }
        entity.name = product.name;
        entity.price = product.price;
        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        Product entity = Product.findById(id);
        if (entity == null) {
            throw new NotFoundException();
        }
        entity.delete();
    }
}