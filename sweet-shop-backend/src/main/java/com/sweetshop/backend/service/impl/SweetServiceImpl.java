package com.sweetshop.backend.service.impl;

import com.sweetshop.backend.model.Sweet;
import com.sweetshop.backend.repository.SweetRepository;
import com.sweetshop.backend.service.SweetService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SweetServiceImpl implements SweetService {

    private final SweetRepository sweetRepository;
    private final com.sweetshop.backend.repository.OrderRepository orderRepository;
    private final com.sweetshop.backend.repository.UserRepository userRepository;

    public SweetServiceImpl(SweetRepository sweetRepository,
            com.sweetshop.backend.repository.OrderRepository orderRepository,
            com.sweetshop.backend.repository.UserRepository userRepository) {
        this.sweetRepository = sweetRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Sweet> getAllSweets() {
        return sweetRepository.findAll();
    }

    @Override
    public Sweet getSweetById(Long id) {
        return sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));
    }

    @Override
    public Sweet addSweet(Sweet sweet) {
        return sweetRepository.save(sweet);
    }

    @Override
    public Sweet updateSweet(Long id, Sweet sweet) {
        Sweet existingSweet = getSweetById(id);
        existingSweet.setName(sweet.getName());
        existingSweet.setCategory(sweet.getCategory());
        existingSweet.setPrice(sweet.getPrice());
        existingSweet.setQuantity(sweet.getQuantity());
        existingSweet.setDescription(sweet.getDescription());
        existingSweet.setImageUrl(sweet.getImageUrl());
        return sweetRepository.save(existingSweet);
    }

    @Override
    public void deleteSweet(Long id) {
        sweetRepository.deleteById(id);
    }

    @Override
    public List<Sweet> searchSweets(String query) {
        String lowerQuery = query.toLowerCase();
        return sweetRepository.findAll().stream()
                .filter(s -> s.getName().toLowerCase().contains(lowerQuery) ||
                        s.getCategory().toLowerCase().contains(lowerQuery))
                .toList();
    }

    @Override
    public Sweet restockSweet(Long id, Integer quantity) {
        Sweet sweet = getSweetById(id);
        sweet.setQuantity(sweet.getQuantity() + quantity);
        return sweetRepository.save(sweet);
    }
}
