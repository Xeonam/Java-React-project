package com.xeonam.Backend.controller;

import com.xeonam.Backend.dto.FruitDto;
import com.xeonam.Backend.model.Fruit;
import com.xeonam.Backend.service.FruitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class FruitController {
    private final FruitService fruitService;

    @Autowired
    public FruitController(FruitService fruitService) {
        this.fruitService = fruitService;
    }

    @PostMapping("/add-fruit")
    public FruitDto newFruit(@RequestBody FruitDto newFruitDto) {
        return fruitService.addFruit(newFruitDto);
    }

    @GetMapping("/fruits")
    public List<FruitDto> getAllFruits() {
        return fruitService.getAllFruits();
    }

    @DeleteMapping("/delete-fruit/{id}")
    public ResponseEntity<String> deleteFruit(@PathVariable Long id) {
        if (fruitService.deleteFruit(id)) {
            return ResponseEntity.ok("Fruit deleted, id: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is no fruit with the id: " + id);
        }
    }

    @PutMapping("/edit-fruit/{id}")
    public ResponseEntity<String> editFruit(@PathVariable Long id, @RequestBody Fruit editedFruit) {
        if (fruitService.editFruit(id, editedFruit)) {
            return ResponseEntity.ok("Fruit edited, id: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Fruit not found with id: " + id);
        }
    }
}
