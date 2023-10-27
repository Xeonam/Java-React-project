package com.xeonam.Backend.controller;

import com.xeonam.Backend.dto.SupplierDto;
import com.xeonam.Backend.model.Supplier;
import com.xeonam.Backend.repository.SupplierRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class SupplierController {
    private final ModelMapper modelMapper;
    private final SupplierRepository supplierRepository;

    @Autowired
    public SupplierController(ModelMapper modelMapper, SupplierRepository supplierRepository) {
        this.modelMapper = modelMapper;
        this.supplierRepository = supplierRepository;
    }

    @PostMapping("/addsupplier")
    public SupplierDto newSupplier(@RequestBody SupplierDto newSupplierDto) {
        Supplier newSupplier = modelMapper.map(newSupplierDto, Supplier.class);
        Supplier savedSupplier = supplierRepository.save(newSupplier);
        return modelMapper.map(savedSupplier, SupplierDto.class);
    }

    @GetMapping("/suppliers")
    public List<SupplierDto> getAllSuppliers(){
        List<Supplier> suppliers = supplierRepository.findAll();
        List<SupplierDto> supplierDtos = suppliers.stream()
                .map(supplier -> modelMapper.map(supplier, SupplierDto.class))
                .collect(Collectors.toList());
        return supplierDtos;
    }

    @DeleteMapping("/deletesupplier/{id}")
    public ResponseEntity<String> deleteSupplier(@PathVariable Long id) {
        if (supplierRepository.existsById(id)) {
            supplierRepository.deleteById(id);
            return ResponseEntity.ok("Supplier deleted, id:  " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is no supplier with the id: " + id);}
    }

    @PutMapping("/editsupplier/{id}")
    public ResponseEntity<String> editSupplier(@PathVariable Long id, @RequestBody SupplierDto editedSupplierDto) {
        Optional<Supplier> optionalSupplier = supplierRepository.findById(id);

        if (optionalSupplier.isPresent()) {
            Supplier existingSupplier = optionalSupplier.get();

            existingSupplier.setName(editedSupplierDto.getName());
            existingSupplier.setAddress(editedSupplierDto.getAddress());
            supplierRepository.save(existingSupplier);

            return ResponseEntity.ok("Szállító szerkesztve az azonosító alapján: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("A megadott azonosítóval szállító nem található: " + id);
        }
    }

}
