package com.xeonam.Backend.service;

import com.xeonam.Backend.dto.FruitDto;
import com.xeonam.Backend.model.Fruit;

import java.util.List;

public interface FruitService {
    FruitDto addFruit(FruitDto newFruitDto);

    List<FruitDto> getAllFruits();

    boolean deleteFruit(Long id);

    boolean editFruit(Long id, Fruit editedFruit);
}
