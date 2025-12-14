package com.sweetshop.backend.service;

import com.sweetshop.backend.model.Sweet;
import java.util.List;

public interface SweetService {
    List<Sweet> getAllSweets();

    Sweet getSweetById(Long id);

    Sweet addSweet(Sweet sweet);

    Sweet updateSweet(Long id, Sweet sweet);

    void deleteSweet(Long id);

    List<Sweet> searchSweets(String query);

    Sweet restockSweet(Long id, Integer quantity);
}
