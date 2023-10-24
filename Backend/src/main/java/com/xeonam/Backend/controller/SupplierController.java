package com.xeonam.Backend.controller;

import com.xeonam.Backend.dto.SupplierDto;
import com.xeonam.Backend.model.Supplier;
import com.xeonam.Backend.repository.SupplierRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
