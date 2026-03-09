package com.autoflex.challenge.config;

import jakarta.ws.rs.core.Application;
import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Contact;
import org.eclipse.microprofile.openapi.annotations.info.Info;
import org.eclipse.microprofile.openapi.annotations.info.License;

@OpenAPIDefinition(
    info = @Info(
        title = "Smart Inventory Management API",
        version = "1.0.0",
        description = "API para gestão de inventário e otimização de produção industrial. " +
                      "Inclui algoritmo para sugestão de fabricação baseada em margem de lucro e disponibilidade de insumos.",
        contact = @Contact(
            name = "Daniele K. Santos - Desenvolvedora FullStack",
            email = "danimistron@gmail.com"),
        license = @License(
            name = "Apache 2.0",
            url = "https://www.apache.org/licenses/LICENSE-2.0.html")
    )
)
public class OpenApiConfig extends Application {
}