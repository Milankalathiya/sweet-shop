package com.sweetshop.backend.controller;

import com.sweetshop.backend.model.Order;
import com.sweetshop.backend.model.OrderItem;
import com.sweetshop.backend.model.Sweet;
import com.sweetshop.backend.model.User;
import com.sweetshop.backend.repository.OrderRepository;
import com.sweetshop.backend.repository.SweetRepository;
import com.sweetshop.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final SweetRepository sweetRepository;

    public OrderController(OrderRepository orderRepository, UserRepository userRepository,
            SweetRepository sweetRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.sweetRepository = sweetRepository;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(orderRepository.findByUserIdOrderByOrderDateDesc(user.getId()));
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> placeOrder(@RequestBody List<Map<String, Object>> items) {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Order order = new Order(user);

            for (Map<String, Object> itemData : items) {
                Long sweetId = ((Number) itemData.get("id")).longValue();
                Integer quantity = ((Number) itemData.get("quantity")).intValue();

                Sweet sweet = sweetRepository.findById(sweetId)
                        .orElseThrow(() -> new RuntimeException("Sweet not found: " + sweetId));

                if (sweet.getQuantity() < quantity) {
                    return ResponseEntity.badRequest()
                            .body(Map.of("error", "Insufficient stock for: " + sweet.getName()));
                }

                sweet.setQuantity(sweet.getQuantity() - quantity);
                sweetRepository.save(sweet);

                OrderItem orderItem = new OrderItem(sweet, quantity, sweet.getPrice().doubleValue());
                order.addItem(orderItem);
            }

            Order savedOrder = orderRepository.save(order);
            return ResponseEntity.ok(savedOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage() != null ? e.getMessage() : "Order placement failed"));
        }
    }
}
