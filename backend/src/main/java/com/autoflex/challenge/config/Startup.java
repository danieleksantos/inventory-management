package com.autoflex.challenge.config;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.event.Observes;
import org.jboss.logging.Logger;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class Startup {
    private static final Logger LOGGER = Logger.getLogger(Startup.class);

    void onStart(@Observes StartupEvent ev) {               
        LOGGER.info("\n" +
            "----------------------------------------------------------\n" +
            "🚀 SMART INVENTORY SYSTEM IS RUNNING!\n" +
            "----------------------------------------------------------\n" +
            "🔗 LOCAL DASHBOARD: http://localhost\n" +
            "📚 API SWAGGER UI: http://localhost:8080/q/swagger-ui/\n" +
            "----------------------------------------------------------");
    }
}