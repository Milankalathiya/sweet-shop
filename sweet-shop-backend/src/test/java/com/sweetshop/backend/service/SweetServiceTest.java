package com.sweetshop.backend.service;

import com.sweetshop.backend.model.Sweet;
import com.sweetshop.backend.repository.SweetRepository;
import com.sweetshop.backend.service.impl.SweetServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SweetServiceTest {

    @Mock
    private SweetRepository sweetRepository;

    @InjectMocks
    private SweetServiceImpl sweetService;

    @Test
    void getAllSweets_ShouldReturnList() {
        Sweet s1 = new Sweet(1L, "Ladoo", "Traditional", BigDecimal.valueOf(10), 100, "Yummy", null);
        Sweet s2 = new Sweet(2L, "Barfi", "Milk", BigDecimal.valueOf(15), 50, "Tasty", null);

        when(sweetRepository.findAll()).thenReturn(Arrays.asList(s1, s2));

        List<Sweet> sweets = sweetService.getAllSweets();

        assertEquals(2, sweets.size());
        verify(sweetRepository, times(1)).findAll();
    }

    @Test
    void addSweet_ShouldSaveSweet() {
        Sweet s1 = new Sweet(null, "Ladoo", "Traditional", BigDecimal.valueOf(10), 100, "Yummy", null);
        Sweet saved = new Sweet(1L, "Ladoo", "Traditional", BigDecimal.valueOf(10), 100, "Yummy", null);

        when(sweetRepository.save(any(Sweet.class))).thenReturn(saved);

        Sweet result = sweetService.addSweet(s1);

        assertNotNull(result.getId());
        assertEquals("Ladoo", result.getName());
    }
}
