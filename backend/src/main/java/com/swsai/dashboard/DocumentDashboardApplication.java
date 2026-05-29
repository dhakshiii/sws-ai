package com.swsai.dashboard;

import com.swsai.dashboard.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class DocumentDashboardApplication {

    public static void main(String[] args) {
        SpringApplication.run(DocumentDashboardApplication.class, args);
    }
}
