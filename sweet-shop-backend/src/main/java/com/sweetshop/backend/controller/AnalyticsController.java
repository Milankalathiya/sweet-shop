package com.sweetshop.backend.controller;

import com.sweetshop.backend.model.Sweet;
import com.sweetshop.backend.repository.SweetRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final SweetRepository sweetRepository;

    public AnalyticsController(SweetRepository sweetRepository) {
        this.sweetRepository = sweetRepository;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        Map<String, Object> analytics = new HashMap<>();

        List<Sweet> allSweets = sweetRepository.findAll();
        long totalSweets = allSweets.size();
        long lowStockCount = allSweets.stream().filter(s -> s.getQuantity() < 10).count();

        analytics.put("totalSweets", totalSweets);
        analytics.put("lowStockCount", lowStockCount);
        analytics.put("sales", "Simulated Sales Data"); // Placeholder for real sales tracking

        return ResponseEntity.ok(analytics);
    }
}
