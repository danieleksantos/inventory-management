package com.autoflex.challenge.resources;

import com.autoflex.challenge.dto.ProductDTO;
import com.autoflex.challenge.models.Product;
import com.autoflex.challenge.services.ProductService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Produtos", description = "Operações de cadastro e manutenção de produtos")
public class ProductResource {

    @Inject
    ProductService service;

    @GET
    @Operation(summary = "Listar todos os produtos", description = "Retorna uma lista de todos os itens cadastrados no catálogo")
    public List<Product> getAll() {
        return service.listAll();
    }

    @POST
    @Operation(summary = "Criar novo produto", description = "Cadastra um novo produto informando nome e preço")
    @APIResponse(responseCode = "201", description = "Produto criado com sucesso")
    @APIResponse(responseCode = "400", description = "Dados inválidos fornecidos no corpo da requisição")
    public Response create(@Valid ProductDTO dto) {
        Product product = service.create(dto);
        return Response.status(Response.Status.CREATED).entity(product).build();
    }

    @PUT
    @Path("/{id}")
    @Operation(summary = "Atualizar produto", description = "Modifica os dados de um produto existente através do ID")
    @APIResponse(responseCode = "200", description = "Produto atualizado com sucesso")
    @APIResponse(responseCode = "404", description = "Produto não encontrado para o ID fornecido")
    public Product update(@PathParam("id") Long id, @Valid Product product) { 
        return service.update(id, product);
    }

    @DELETE
    @Path("/{id}")
    @Operation(summary = "Remover produto", description = "Exclui um produto do catálogo permanentemente")
    @APIResponse(responseCode = "204", description = "Produto removido com sucesso")
    @APIResponse(responseCode = "404", description = "Produto não encontrado para o ID fornecido")
    public Response delete(@PathParam("id") Long id) {
        service.delete(id);
        return Response.noContent().build();
    }
}