package com.autoflex.challenge.services;

import static org.junit.jupiter.api.Assertions.*;
import java.math.BigDecimal;
import java.util.List;

import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import com.autoflex.challenge.dto.ProductionResponseDTO;
import com.autoflex.challenge.models.*;

import io.quarkus.panache.mock.PanacheMock;
import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
public class ProductionServiceTest {

    @Inject
    ProductionService productionService;

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
        RawMaterial m = new RawMaterial(); 
        m.id = id; m.name = name; m.stockQuantity = qty;
        return m;
    }

    private Product createProduct(Long id, String name, double price) {
        Product p = new Product(); 
        p.id = id; p.name = name; p.price = BigDecimal.valueOf(price);
        return p;
    }

    private ProductComposition createComp(Product p, RawMaterial m, Double qty) {
        ProductComposition c = new ProductComposition(); 
        c.product = p; c.rawMaterial = m; c.quantityNeeded = qty;
        return c;
    }

    @Test
    void shouldPrioritizeHighValueProductWhenStockIsAvailable() {
        RawMaterial steel = createMaterial(1L, "Industrial Steel", 100.0);
        Product car = createProduct(1L, "Luxury Sedan", 85000.0);
        Product bike = createProduct(2L, "Mountain Bike", 2500.0);

        setupMocks(
            List.of(steel),
            List.of(car, bike),
            List.of(createComp(car, steel, 80.0), createComp(bike, steel, 10.0))
        );

        ProductionResponseDTO result = productionService.calculateSuggestions();

        assertEquals("Luxury Sedan", result.suggestions().get(0).productName());
        assertEquals(1, result.suggestions().get(0).quantity());
        assertEquals(2, result.suggestions().get(1).quantity());
    }

    @Test
    void shouldSkipProductWhenCriticalMaterialIsMissing() {
        RawMaterial steel = createMaterial(1L, "Steel", 100.0);
        RawMaterial chip = createMaterial(2L, "Microchip", 0.0);
        Product robot = createProduct(1L, "High-Tech Robot", 150000.0);
        Product tool = createProduct(2L, "Basic Tool", 1000.0);

        setupMocks(
            List.of(steel, chip),
            List.of(robot, tool),
            List.of(createComp(robot, chip, 1.0), createComp(tool, steel, 10.0))
        );

        ProductionResponseDTO result = productionService.calculateSuggestions();

        assertTrue(result.suggestions().stream().noneMatch(s -> s.productName().equals("High-Tech Robot")));
        assertEquals("Basic Tool", result.suggestions().get(0).productName());
    }

    @Test
    void shouldCalculateCorrectQuantityBasedOnMaterialBottleneck() {
        RawMaterial motor = createMaterial(1L, "Motor", 10.0);
        RawMaterial wheel = createMaterial(2L, "Wheel", 8.0);
        Product kart = createProduct(1L, "Go-Kart", 12000.0);

        setupMocks(
            List.of(motor, wheel),
            List.of(kart),
            List.of(createComp(kart, motor, 1.0), createComp(kart, wheel, 4.0))
        );

        ProductionResponseDTO result = productionService.calculateSuggestions();

        assertEquals(2, result.suggestions().get(0).quantity());
    }

    @Test
    void shouldReturnEmptySuggestionsWhenAllStockIsZero() {
        RawMaterial wood = createMaterial(1L, "Wood", 0.0);
        Product table = createProduct(1L, "Dining Table", 500.0);
        setupMocks(List.of(wood), List.of(table), List.of(createComp(table, wood, 10.0)));

        ProductionResponseDTO result = productionService.calculateSuggestions();
        assertTrue(result.suggestions().isEmpty());
    }

    @Test
    void shouldIgnoreProductsWithoutCompositionDefined() {
        RawMaterial iron = createMaterial(1L, "Iron", 50.0);
        Product mysteryBox = createProduct(1L, "Mystery Box", 99.0);
        setupMocks(List.of(iron), List.of(mysteryBox), List.of());

        ProductionResponseDTO result = productionService.calculateSuggestions();
        assertTrue(result.suggestions().isEmpty());
    }
}