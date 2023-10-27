package com.xeonam.Backend.controller;

import com.xeonam.Backend.dto.FruitDto;
import com.xeonam.Backend.model.Fruit;
import com.xeonam.Backend.repository.FruitRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
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

    @DeleteMapping("/deletefruit/{id}")
    public ResponseEntity<String> deleteFruit(@PathVariable Long id) {
        if (fruitRepository.existsById(id)) {
            fruitRepository.deleteById(id);
            return ResponseEntity.ok("Fruit deleted, id:  " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is no fruit with the id: " + id);
        }
    }

    @PutMapping("/editfruit/{id}")
    public ResponseEntity<String> editFruit(@PathVariable Long id, @RequestBody Fruit editedFruit) {
        Optional<Fruit> optionalSupplier = fruitRepository.findById(id);

        if (optionalSupplier.isPresent()) {
            Fruit existingFruit = optionalSupplier.get();


            existingFruit.setName(editedFruit.getName());
            existingFruit.setPrice(editedFruit.getPrice());
            existingFruit.setSupplier(editedFruit.getSupplier());

            fruitRepository.save(existingFruit);

            return ResponseEntity.ok("Szállító szerkesztve az azonosító alapján: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("A megadott azonosítóval szállító nem található: " + id);
        }
    }
}
