package com.xeonam.Backend.service;

import com.xeonam.Backend.dto.FruitDto;
import com.xeonam.Backend.model.Fruit;
import com.xeonam.Backend.repository.FruitRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class FruitServiceImpl implements FruitService{

    private final ModelMapper modelMapper;
    private final FruitRepository fruitRepository;

    @Autowired
    public FruitServiceImpl(ModelMapper modelMapper, FruitRepository fruitRepository) {
        this.modelMapper = modelMapper;
        this.fruitRepository = fruitRepository;
    }
    @Override
    public FruitDto addFruit(FruitDto newFruitDto) {
        Fruit newFruit = modelMapper.map(newFruitDto, Fruit.class);
        Fruit savedFruit = fruitRepository.save(newFruit);
        return modelMapper.map(savedFruit, FruitDto.class);
    }

    @Override
    public List<FruitDto> getAllFruits() {
        List<Fruit> fruits = fruitRepository.findAll();
        List<FruitDto> fruitDTOs = fruits.stream()
                .map(fruit -> modelMapper.map(fruit, FruitDto.class))
                .collect(Collectors.toList());
        return fruitDTOs;
    }

    @Override
    public boolean deleteFruit(Long id) {
        if (fruitRepository.existsById(id)) {
            fruitRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean editFruit(Long id, Fruit editedFruit) {
        Optional<Fruit> optionalFruit = fruitRepository.findById(id);

        if (optionalFruit.isPresent()) {
            Fruit existingFruit = optionalFruit.get();
            existingFruit.setName(editedFruit.getName());
            existingFruit.setPrice(editedFruit.getPrice());
            existingFruit.setSupplier(editedFruit.getSupplier());

            fruitRepository.save(existingFruit);
            return true;
        }
        return false;
    }

    @Override
    public Optional<FruitDto> getFruitById(Long id) {
        Optional<Fruit> optionalFruit = fruitRepository.findById(id);

        if (optionalFruit.isPresent()) {
            FruitDto fruitDto = modelMapper.map(optionalFruit.get(), FruitDto.class);
            return Optional.of(fruitDto);
        } else {
            return Optional.empty();
        }
    }
}
