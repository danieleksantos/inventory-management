package com.autoflex.challenge.services;

import static org.junit.jupiter.api.Assertions.*;
import java.math.BigDecimal;
import java.util.List;
import org.junit.jupiter.api.Test;
import com.autoflex.challenge.dto.ProductionResponseDTO;
import com.autoflex.challenge.models.*;
import io.quarkus.panache.mock.PanacheMock;
import io.quarkus.test.junit.QuarkusTest;

/**
 * Testes de Unidade para o ProductionService.
 */
@QuarkusTest
public class ProductionServiceTest {

    private void setupMocks(List<RawMaterial> materials, List<Product> products, List<ProductComposition> compositions) {
        PanacheMock.mock(RawMaterial.class);
        PanacheMock.mock(Product.class);
        PanacheMock.mock(ProductComposition.class);

        PanacheMock.doReturn(materials).when(RawMaterial.class);
        RawMaterial.listAll();

        PanacheMock.doReturn(products).when(Product.class);
        Product.list("order by price desc");

        PanacheMock.doReturn(compositions).when(ProductComposition.class);
        ProductComposition.listAll();
    }

    private RawMaterial createMaterial(Long id, String name, Double qty) {
        RawMaterial m = new RawMaterial(); m.id = id; m.name = name; m.stockQuantity = qty;
        return m;
    }

    private Product createProduct(Long id, String name, double price) {
        Product p = new Product(); p.id = id; p.name = name; p.price = BigDecimal.valueOf(price);
        return p;
    }

    private ProductComposition createComp(Product p, RawMaterial m, Double qty) {
        ProductComposition c = new ProductComposition(); c.product = p; c.rawMaterial = m; c.quantityNeeded = qty;
        return c;
    }

    // --- CENÁRIOS DE TESTE ---

    @Test
    void shouldPrioritizeHighValueProductWhenStockIsAvailable() {
        // ARRANGE: Cenário com produto caro e barato disputando o mesmo material
        RawMaterial steel = createMaterial(1L, "Industrial Steel", 100.0);
        Product car = createProduct(1L, "Luxury Sedan", 85000.0);
        Product bike = createProduct(2L, "Mountain Bike", 2500.0);

        setupMocks(
            List.of(steel),
            List.of(car, bike),
            List.of(createComp(car, steel, 80.0), createComp(bike, steel, 10.0))
        );

        // ACT: Execução da lógica de sugestão
        ProductionResponseDTO result = new ProductionService().calculateSuggestions();

        // ASSERT: O Sedan (caro) deve ser produzido primeiro
        assertEquals("Luxury Sedan", result.suggestions().get(0).productName());
        assertEquals(1, result.suggestions().get(0).quantity());
        // Sobra 20 de aço, permitindo 2 bikes
        assertEquals(2, result.suggestions().get(1).quantity());
    }

    @Test
    void shouldSkipProductWhenCriticalMaterialIsMissing() {
        // ARRANGE: Robô é rentável, mas o chip essencial está zerado
        RawMaterial steel = createMaterial(1L, "Steel", 100.0);
        RawMaterial chip = createMaterial(2L, "Microchip", 0.0);

        Product robot = createProduct(1L, "High-Tech Robot", 150000.0);
        Product tool = createProduct(2L, "Basic Tool", 1000.0);

        setupMocks(
            List.of(steel, chip),
            List.of(robot, tool),
            List.of(createComp(robot, chip, 1.0), createComp(tool, steel, 10.0))
        );

        // ACT
        ProductionResponseDTO result = new ProductionService().calculateSuggestions();

        // ASSERT: Robô deve ser ignorado e a ferramenta deve ser produzida normalmente
        assertTrue(result.suggestions().stream().noneMatch(s -> s.productName().equals("High-Tech Robot")));
        assertEquals("Basic Tool", result.suggestions().get(0).productName());
        assertEquals(10, result.suggestions().get(0).quantity());
    }

    @Test
    void shouldCalculateCorrectQuantityBasedOnMaterialBottleneck() {
        // ARRANGE: Produto precisa de 2 materiais; o que tiver menos estoque define o limite
        RawMaterial motor = createMaterial(1L, "Motor", 10.0);
        RawMaterial wheel = createMaterial(2L, "Wheel", 8.0);

        Product kart = createProduct(1L, "Go-Kart", 12000.0);

        setupMocks(
            List.of(motor, wheel),
            List.of(kart),
            List.of(createComp(kart, motor, 1.0), createComp(kart, wheel, 4.0))
        );

        // ACT
        ProductionResponseDTO result = new ProductionService().calculateSuggestions();

        // ASSERT: Deve sugerir apenas 2 unidades devido às rodas
        assertEquals(2, result.suggestions().get(0).quantity());
        assertEquals(8.0, result.remainders().stream()
            .filter(r -> r.materialName().equals("Motor")).findFirst().get().remainingQuantity());
    }

    @Test
    void shouldReturnEmptySuggestionsWhenAllStockIsZero() {
        // ARRANGE: Sem insumos no sistema
        RawMaterial wood = createMaterial(1L, "Wood", 0.0);
        Product table = createProduct(1L, "Dining Table", 500.0);

        setupMocks(List.of(wood), List.of(table), List.of(createComp(table, wood, 10.0)));

        // ACT
        ProductionResponseDTO result = new ProductionService().calculateSuggestions();

        // ASSERT
        assertTrue(result.suggestions().isEmpty(), "Não deve haver sugestões para estoque zero");
    }

    @Test
    void shouldIgnoreProductsWithoutCompositionDefined() {
        // ARRANGE: Produto cadastrado mas sem "receita" vinculada
        RawMaterial iron = createMaterial(1L, "Iron", 50.0);
        Product mysteryBox = createProduct(1L, "Mystery Box", 99.0);

        setupMocks(List.of(iron), List.of(mysteryBox), List.of());

        // ACT
        ProductionResponseDTO result = new ProductionService().calculateSuggestions();

        // ASSERT: Ignora produtos sem regras de composição
        assertTrue(result.suggestions().isEmpty());
    }
}