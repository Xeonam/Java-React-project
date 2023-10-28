package com.xeonam.Backend.controller;

import com.xeonam.Backend.dto.SupplierDto;
import com.xeonam.Backend.model.Supplier;
import com.xeonam.Backend.repository.SupplierRepository;
import com.xeonam.Backend.service.SupplierService;
import com.xeonam.Backend.service.SupplierServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;




@RestController
public class SupplierController {
    private final SupplierService supplierService;

    @Autowired
    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @PostMapping("/add-supplier")
    public SupplierDto newSupplier(@RequestBody SupplierDto newSupplierDto) {
        return supplierService.addService(newSupplierDto);
    }

    @GetMapping("/suppliers")
    public List<SupplierDto> getAllSuppliers(){
        return supplierService.getAllSuppliers();
    }

    @DeleteMapping("/delete-supplier/{id}")
    public ResponseEntity<String> deleteSupplier(@PathVariable Long id) {
        if (supplierService.deleteSupplier(id)) {
            return ResponseEntity.ok("Fruit deleted, id: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is no fruit with the id: " + id);
        }
    }

    @PutMapping("/edit-supplier/{id}")
    public ResponseEntity<String> editSupplier(@PathVariable Long id, @RequestBody SupplierDto editedSupplierDto) {
        if (supplierService.editSupplier(id, editedSupplierDto)) {
            return ResponseEntity.ok("Supplier edited, id: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Supplier not found with id: " + id);
        }
    }

}
