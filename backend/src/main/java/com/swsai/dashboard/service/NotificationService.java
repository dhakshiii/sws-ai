package com.swsai.dashboard.service;

import com.swsai.dashboard.dto.NotificationResponse;
import com.swsai.dashboard.entity.NotificationType;

import java.util.List;

public interface NotificationService {

    NotificationResponse createNotification(String message, NotificationType type);

    List<NotificationResponse> getNotifications();

    NotificationResponse markAsRead(Long id);

    void markAllAsRead();

    long getUnreadCount();
}
