package com.autoflex.challenge.rest;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;

@QuarkusTest
public class InventoryApiIntegrationTest {


    @Test
    @DisplayName("RF001 - Deve realizar o ciclo completo de um Produto: Criar, Listar e Deletar")
    void shouldMaintainProductLifecycle() {
        String productJson = "{\"name\": \"Drone Pro\", \"price\": 15000.0}";
        
        Integer productId = given()
            .contentType(ContentType.JSON)
            .body(productJson)
        .when()
            .post("/products")
        .then()
            .statusCode(anyOf(is(200), is(201)))
            .body("name", is("Drone Pro"))
            .extract().path("id");

        given()
        .when()
            .get("/products")
        .then()
            .statusCode(200)
            .body("name", hasItem("Drone Pro"));

        given()
            .pathParam("id", productId)
        .when()
            .delete("/products/{id}")
        .then()
            .statusCode(204);
    }


    @Test
    @DisplayName("RF002 - Deve validar a persistência e busca de Matéria-Prima")
    void shouldPersistAndRetrieveRawMaterials() {
        String materialJson = "{\"name\": \"Lithium Battery\", \"stockQuantity\": 500.0}";

        given()
            .contentType(ContentType.JSON)
            .body(materialJson)
        .when()
            .post("/raw-materials")
        .then()
            .statusCode(anyOf(is(200), is(201)))
            .body("stockQuantity", is(500.0f));

        given()
        .when()
            .get("/raw-materials")
        .then()
            .statusCode(200)
            .body("name", hasItem("Lithium Battery"));
    }


    @Test
    @DisplayName("RF008 - Deve garantir que o endpoint de sugestões entrega o contrato JSON correto")
    void shouldValidateProductionSuggestionsJsonContract() {
        given()
        .when()
            .get("/production-suggestions")
        .then()
            .statusCode(200)
            .contentType(ContentType.JSON)
            .body("$", hasKey("suggestions"))
            .body("$", hasKey("remainders"))
            .body("suggestions", instanceOf(java.util.List.class))
            .body("remainders", instanceOf(java.util.List.class));
    }


    @Test
    @DisplayName("Erro - Deve retornar 404 ao tentar deletar um produto inexistente")
    void shouldReturn404WhenDeletingNonExistentProduct() {
        given()
        .when()
            .delete("/products/999999")
        .then()
            .statusCode(404);
    }
}