package com.swsai.dashboard.service;

public interface BulkUploadTrackerService {

    void trackResult(String batchId, int batchTotal, boolean success);
}
