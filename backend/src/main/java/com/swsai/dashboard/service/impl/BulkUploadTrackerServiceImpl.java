package com.swsai.dashboard.service.impl;

import com.swsai.dashboard.entity.NotificationType;
import com.swsai.dashboard.service.BulkUploadTrackerService;
import com.swsai.dashboard.service.NotificationService;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class BulkUploadTrackerServiceImpl implements BulkUploadTrackerService {

    private final Map<String, BatchState> batchStates = new ConcurrentHashMap<>();
    private final NotificationService notificationService;

    public BulkUploadTrackerServiceImpl(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @Override
    public void trackResult(String batchId, int batchTotal, boolean success) {
        if (batchId == null || batchId.isBlank() || batchTotal <= 3) {
            return;
        }

        BatchState batchState = batchStates.computeIfAbsent(batchId, key -> new BatchState(batchTotal));
        synchronized (batchState) {
            batchState.processed++;
            if (success) {
                batchState.successful++;
            } else {
                batchState.failed++;
            }

            if (batchState.processed >= batchState.total && !batchState.notificationSent) {
                batchState.notificationSent = true;
                if (batchState.failed == 0) {
                    notificationService.createNotification(
                            batchState.successful + " files uploaded successfully",
                            NotificationType.SUCCESS
                    );
                } else {
                    notificationService.createNotification(
                            batchState.successful + " of " + batchState.total + " files uploaded successfully",
                            NotificationType.INFO
                    );
                }
                batchStates.remove(batchId);
            }
        }
    }

    private static final class BatchState {
        private final int total;
        private int processed;
        private int successful;
        private int failed;
        private boolean notificationSent;

        private BatchState(int total) {
            this.total = total;
        }
    }
}
