package com.autoflex.challenge.rest;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;

/**
 * Testes de Integração para a API de Inventário.
 * Valida o contrato das rotas, persistência no banco e deleção em cascata.
 */
@QuarkusTest
public class InventoryApiIntegrationTest {

    // --- TESTES DE PRODUTOS ---

    @Test
    @DisplayName("RF001 - Deve realizar o ciclo completo de um Produto: Criar, Listar e Deletar")
    void shouldMaintainProductLifecycle() {
        // ARRANGE: Dados do novo produto
        String productJson = "{\"name\": \"Drone Pro\", \"price\": 15000.0}";
        
        // ACT & ASSERT: 1. Criar o produto e extrair o ID
        Integer productId = given()
            .contentType(ContentType.JSON)
            .body(productJson)
        .when()
            .post("/products")
        .then()
            .statusCode(anyOf(is(200), is(201)))
            .body("name", is("Drone Pro"))
            .extract().path("id");

        // ACT & ASSERT: 2. Listar e verificar se o produto está presente
        given()
        .when()
            .get("/products")
        .then()
            .statusCode(200)
            .body("name", hasItem("Drone Pro"));

        // ACT & ASSERT: 3. Deletar e validar status 204 (Cascata implícita)
        given()
            .pathParam("id", productId)
        .when()
            .delete("/products/{id}")
        .then()
            .statusCode(204);
    }

    // --- TESTES DE MATÉRIA-PRIMA ---

    @Test
    @DisplayName("RF002 - Deve validar a persistência e busca de Matéria-Prima")
    void shouldPersistAndRetrieveRawMaterials() {
        // ARRANGE
        String materialJson = "{\"name\": \"Lithium Battery\", \"stockQuantity\": 500.0}";

        // ACT: Criar matéria-prima
        given()
            .contentType(ContentType.JSON)
            .body(materialJson)
        .when()
            .post("/raw-materials")
        .then()
            .statusCode(anyOf(is(200), is(201)))
            .body("stockQuantity", is(500.0f));

        // ASSERT: Verificar listagem
        given()
        .when()
            .get("/raw-materials")
        .then()
            .statusCode(200)
            .body("name", hasItem("Lithium Battery"));
    }

    // --- TESTES DE PRODUÇÃO E CÁLCULO ---

    @Test
    @DisplayName("RF008 - Deve garantir que o endpoint de sugestões entrega o contrato JSON correto")
    void shouldValidateProductionSuggestionsJsonContract() {
        // ACT & ASSERT
        given()
        .when()
            .get("/production-suggestions")
        .then()
            .statusCode(200)
            .contentType(ContentType.JSON)
            // Valida se o DTO (Record) mapeia para as chaves esperadas no JSON
            .body("$", hasKey("suggestions"))
            .body("$", hasKey("remainders"))
            .body("suggestions", instanceOf(java.util.List.class))
            .body("remainders", instanceOf(java.util.List.class));
    }

    // --- TESTES DE ERRO (BORDAS) ---

    @Test
    @DisplayName("Erro - Deve retornar 404 ao tentar deletar um produto inexistente")
    void shouldReturn404WhenDeletingNonExistentProduct() {
        // ACT & ASSERT
        given()
        .when()
            .delete("/products/999999")
        .then()
            .statusCode(404);
    }
}