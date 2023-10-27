package com.xeonam.Backend.service;

import com.xeonam.Backend.dto.SupplierDto;
import com.xeonam.Backend.model.Supplier;
import com.xeonam.Backend.repository.SupplierRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SupplierServiceImpl implements SupplierService{

    private final ModelMapper modelMapper;
    private final SupplierRepository supplierRepository;

    @Autowired
    public SupplierServiceImpl(ModelMapper modelMapper, SupplierRepository supplierRepository) {
        this.modelMapper = modelMapper;
        this.supplierRepository = supplierRepository;
    }
    @Override
    public SupplierDto addService(SupplierDto newSupplierDto) {
        Supplier newSupplier = modelMapper.map(newSupplierDto, Supplier.class);
        Supplier savedSupplier = supplierRepository.save(newSupplier);
        return modelMapper.map(savedSupplier, SupplierDto.class);
    }

    @Override
    public List<SupplierDto> getAllSuppliers() {
        List<Supplier> suppliers = supplierRepository.findAll();
        List<SupplierDto> supplierDtos = suppliers.stream()
                .map(supplier -> modelMapper.map(supplier, SupplierDto.class))
                .collect(Collectors.toList());
        return supplierDtos;
    }

    @Override
    public boolean deleteSupplier(Long id) {
        if (supplierRepository.existsById(id)) {
            supplierRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean editSupplier(Long id, SupplierDto editedSupplier) {
        Optional<Supplier> optionalSupplier = supplierRepository.findById(id);

        if (optionalSupplier.isPresent()) {
            Supplier existingSupplier = optionalSupplier.get();
            existingSupplier.setName(editedSupplier.getName());
            existingSupplier.setAddress(editedSupplier.getAddress());

            supplierRepository.save(existingSupplier);

            return true;
        }
        return false;
    }
}
