package com.autoflex.challenge.resources;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/hello")
@Tag(name = "Status", description = "Verificação de saúde do sistema")
public class GreetingResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Operation(summary = "Ping", description = "Endpoint leve para acordar o servidor no Render")
    public String hello() {
        return "Hello from Quarkus! System is awake.";
    }
}