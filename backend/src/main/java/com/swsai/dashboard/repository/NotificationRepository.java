package com.swsai.dashboard.repository;

import com.swsai.dashboard.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findAllByOrderByTimestampDesc();

    long countByReadStatusFalse();
}
