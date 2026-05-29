package com.swsai.dashboard.dto;

import com.swsai.dashboard.entity.NotificationType;

import java.time.LocalDateTime;

public record NotificationResponse(
        Long id,
        String message,
        NotificationType type,
        LocalDateTime timestamp,
        boolean readStatus
) {
}
