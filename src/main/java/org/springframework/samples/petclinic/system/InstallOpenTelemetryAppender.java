package org.springframework.samples.petclinic.system;

import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.instrumentation.logback.appender.v1_0.OpenTelemetryAppender;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

/**
 * Programmatically installs the OpenTelemetry Logback appender at startup.
 * This ensures that all logs emitted via SLF4J/Logback are forwarded through
 * the OpenTelemetry pipeline to the configured exporter (e.g., OTel Collector).
 */
@Component
public class InstallOpenTelemetryAppender implements InitializingBean {

    private final OpenTelemetry openTelemetry;

    /**
     * Constructor for dependency injection of OpenTelemetry instance.
     *
     * @param openTelemetry the OpenTelemetry instance managed by Spring Boot
     */
    public InstallOpenTelemetryAppender(OpenTelemetry openTelemetry) {
        this.openTelemetry = openTelemetry;
    }

    /**
     * Called by Spring after all dependencies are initialized.
     * Installs the OpenTelemetry Logback appender.
     */
    @Override
    public void afterPropertiesSet() {
        OpenTelemetryAppender.install(this.openTelemetry);
    }
}
