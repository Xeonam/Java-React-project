package com.xeonam.Backend.controller;

import com.xeonam.Backend.dto.FruitDto;
import com.xeonam.Backend.model.Fruit;
import com.xeonam.Backend.repository.FruitRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FruitController {
    private final ModelMapper modelMapper;

    private final FruitRepository fruitRepository;

    @Autowired
    public FruitController(ModelMapper modelMapper, FruitRepository fruitRepository) {
        this.modelMapper = modelMapper;
        this.fruitRepository = fruitRepository;
    }

    @PostMapping("/addfruit")
    public FruitDto newFruit(@RequestBody FruitDto newFruitDto) {
        Fruit newFruit = modelMapper.map(newFruitDto, Fruit.class);
        Fruit savedFruit = fruitRepository.save(newFruit);
        return modelMapper.map(savedFruit, FruitDto.class);
    }

}
