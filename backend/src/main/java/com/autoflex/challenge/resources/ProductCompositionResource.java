package com.autoflex.challenge.resources;

import com.autoflex.challenge.dto.ProductCompositionDTO;
import com.autoflex.challenge.models.ProductComposition;
import com.autoflex.challenge.services.ProductCompositionService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import java.util.List;

@Path("/product-compositions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Composição", description = "Vínculo entre produtos e seus componentes necessários para produção")
public class ProductCompositionResource {

    @Inject
    ProductCompositionService service;

    @GET
    @Operation(summary = "Ver todas as composições de produtos", description = "Lista todas as composições de produtos existentes")
    public List<ProductComposition> getAll() {
        return service.listAll();
    }

    @POST
    @Operation(summary = "Vincular componente", description = "Define quanto de um material é necessário para produzir um produto. Se já existir, atualiza a quantidade.")
    @APIResponse(responseCode = "200", description = "Vínculo criado ou atualizado com sucesso")
    @APIResponse(responseCode = "400", description = "Dados inválidos ou IDs inexistentes")
    public Response addOrUpdate(@Valid ProductCompositionDTO dto) { 
        ProductComposition composition = service.addOrUpdateIngredient(dto);
        return Response.ok(composition).build();
    }

    @DELETE
    @Path("/{id}")
    @Operation(summary = "Remover componente", description = "Retira um material da composição de um produto")
    @APIResponse(responseCode = "204", description = "Vínculo removido com sucesso")
    @APIResponse(responseCode = "404", description = "Composição não encontrada para o ID fornecido")
    public Response delete(@PathParam("id") Long id) {
        service.delete(id);
        return Response.noContent().build();
    }

    @GET
    @Path("/product/{productId}")
    @Operation(summary = "Composição por produto", description = "Lista apenas os componentes necessários para um produto específico")
    @APIResponse(responseCode = "200", description = "Lista de componentes retornada")
    public List<ProductComposition> getByProduct(@PathParam("productId") Long productId) {
        return service.listByProduct(productId);
    }
}