package com.swsai.dashboard.service;

import com.swsai.dashboard.dto.DocumentResponse;
import com.swsai.dashboard.dto.UploadResponse;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DocumentService {

    UploadResponse uploadDocument(MultipartFile file, String batchId, Integer batchTotal);

    List<DocumentResponse> getDocuments();

    Resource loadAsResource(Long id);
}
