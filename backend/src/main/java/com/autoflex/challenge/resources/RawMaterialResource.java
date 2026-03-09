package com.autoflex.challenge.resources;

import com.autoflex.challenge.dto.RawMaterialDTO;
import com.autoflex.challenge.models.RawMaterial;
import com.autoflex.challenge.services.RawMaterialService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import java.util.List;

@Path("/raw-materials") 
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Matéria-Prima", description = "Gerenciamento do estoque de insumos")
public class RawMaterialResource {

    @Inject
    RawMaterialService service;

    @GET
    @Operation(summary = "Listar estoque", description = "Retorna todas as matérias-primas e suas quantidades atuais")
    public List<RawMaterial> getAll() {
        return service.listAll();
    }

    @POST
    @Operation(summary = "Cadastrar insumo", description = "Adiciona um novo tipo de matéria-prima ao inventário")
    @APIResponse(responseCode = "201", description = "Insumo cadastrado com sucesso")
    @APIResponse(responseCode = "400", description = "Dados de entrada inválidos")
    public Response create(@Valid RawMaterialDTO dto) {
        RawMaterial material = service.create(dto);
        return Response.status(Response.Status.CREATED).entity(material).build();
    }

    @PUT
    @Path("/{id}")
    @Operation(summary = "Atualizar estoque", description = "Atualiza nome ou quantidade de um insumo específico")
    @APIResponse(responseCode = "200", description = "Estoque atualizado com sucesso")
    @APIResponse(responseCode = "404", description = "Insumo não encontrado para o ID fornecido")
    public RawMaterial update(@PathParam("id") Long id, @Valid RawMaterial material) { 
        return service.update(id, material);
    }

    @DELETE
    @Path("/{id}")
    @Operation(summary = "Remover insumo", description = "Remove um material do inventário permanentemente")
    @APIResponse(responseCode = "204", description = "Insumo removido com sucesso")
    @APIResponse(responseCode = "404", description = "Insumo não encontrado para o ID fornecido")
    public Response delete(@PathParam("id") Long id) {
        service.delete(id);
        return Response.noContent().build();
    }
}