package com.sweetshop.backend.repository;

import com.sweetshop.backend.model.Sweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SweetRepository extends JpaRepository<Sweet, Long>, JpaSpecificationExecutor<Sweet> {
}
