package com.xeonam.Backend.controller;

import com.xeonam.Backend.dto.FruitDto;
import com.xeonam.Backend.model.Fruit;
import com.xeonam.Backend.repository.FruitRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/fruits")
    public List<FruitDto> getAllFruits() {
        List<Fruit> fruits = fruitRepository.findAll();
        List<FruitDto> fruitDTOs = fruits.stream()
                .map(fruit -> modelMapper.map(fruit, FruitDto.class))
                .collect(Collectors.toList());
        return fruitDTOs;
    }

}
