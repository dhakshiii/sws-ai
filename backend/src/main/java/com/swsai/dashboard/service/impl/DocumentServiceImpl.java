package com.swsai.dashboard.service.impl;

import com.swsai.dashboard.dto.DocumentResponse;
import com.swsai.dashboard.dto.UploadResponse;
import com.swsai.dashboard.entity.Document;
import com.swsai.dashboard.entity.DocumentStatus;
import com.swsai.dashboard.entity.NotificationType;
import com.swsai.dashboard.repository.DocumentRepository;
import com.swsai.dashboard.service.BulkUploadTrackerService;
import com.swsai.dashboard.service.DocumentService;
import com.swsai.dashboard.service.FileStorageService;
import com.swsai.dashboard.service.NotificationService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;
    private final FileStorageService fileStorageService;
    private final NotificationService notificationService;
    private final BulkUploadTrackerService bulkUploadTrackerService;

    public DocumentServiceImpl(
            DocumentRepository documentRepository,
            FileStorageService fileStorageService,
            NotificationService notificationService,
            BulkUploadTrackerService bulkUploadTrackerService
    ) {
        this.documentRepository = documentRepository;
        this.fileStorageService = fileStorageService;
        this.notificationService = notificationService;
        this.bulkUploadTrackerService = bulkUploadTrackerService;
    }

    @Override
    @Transactional
    public UploadResponse uploadDocument(MultipartFile file, String batchId, Integer batchTotal) {
        int resolvedBatchTotal = batchTotal == null ? 1 : batchTotal;

        validateFile(file);

        try {
            String storedFileName = fileStorageService.store(file);

            Document document = new Document();
            document.setFileName(file.getOriginalFilename());
            document.setStoredFileName(storedFileName);
            document.setFileSize(file.getSize());
            document.setFileType(resolveFileType(file));
            document.setStatus(DocumentStatus.COMPLETE);

            Document savedDocument = documentRepository.save(document);
            bulkUploadTrackerService.trackResult(batchId, resolvedBatchTotal, true);

            return new UploadResponse("Upload completed", mapToResponse(savedDocument));
        } catch (RuntimeException exception) {
            bulkUploadTrackerService.trackResult(batchId, resolvedBatchTotal, false);
            notificationService.createNotification(
                    "Upload failed for " + file.getOriginalFilename(),
                    NotificationType.ERROR
            );
            throw exception;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentResponse> getDocuments() {
        return documentRepository.findAllByOrderByUploadDateDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Resource loadAsResource(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Document not found"));
        return fileStorageService.loadAsResource(document.getStoredFileName());
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Please upload a PDF file");
        }

        String fileName = file.getOriginalFilename() == null ? "" : file.getOriginalFilename().toLowerCase(Locale.ROOT);
        boolean validMimeType = "application/pdf".equalsIgnoreCase(file.getContentType());
        boolean validExtension = fileName.endsWith(".pdf");
        if (!validMimeType && !validExtension) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only PDF files are allowed");
        }
    }

    private String resolveFileType(MultipartFile file) {
        if (file.getContentType() != null && !file.getContentType().isBlank()) {
            return file.getContentType();
        }
        return "application/pdf";
    }

    private DocumentResponse mapToResponse(Document document) {
        return new DocumentResponse(
                document.getId(),
                document.getFileName(),
                document.getFileSize(),
                document.getFileType(),
                document.getUploadDate(),
                document.getStatus(),
                "/api/documents/" + document.getId() + "/download"
        );
    }
}
