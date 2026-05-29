package com.swsai.dashboard.dto;

import com.swsai.dashboard.entity.DocumentStatus;

import java.time.LocalDateTime;

public record DocumentResponse(
        Long id,
        String fileName,
        Long fileSize,
        String fileType,
        LocalDateTime uploadDate,
        DocumentStatus status,
        String downloadUrl
) {
}
