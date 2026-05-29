package com.swsai.dashboard.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private final File file = new File();
    private final Websocket websocket = new Websocket();

    public File getFile() {
        return file;
    }

    public Websocket getWebsocket() {
        return websocket;
    }

    public static class File {
        private String uploadDir = "uploads";

        public String getUploadDir() {
            return uploadDir;
        }

        public void setUploadDir(String uploadDir) {
            this.uploadDir = uploadDir;
        }
    }

    public static class Websocket {
        private String allowedOrigin = "http://localhost:5173";

        public String getAllowedOrigin() {
            return allowedOrigin;
        }

        public void setAllowedOrigin(String allowedOrigin) {
            this.allowedOrigin = allowedOrigin;
        }
    }
}
