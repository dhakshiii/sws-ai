package com.swsai.dashboard.repository;

import com.swsai.dashboard.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findAllByOrderByUploadDateDesc();
}
