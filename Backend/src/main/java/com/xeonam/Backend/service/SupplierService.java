package com.xeonam.Backend.service;


import com.xeonam.Backend.dto.SupplierDto;
import java.util.List;

public interface SupplierService {
    SupplierDto addService(SupplierDto newSupplierDto);

    List<SupplierDto> getAllSuppliers();

    boolean deleteSupplier(Long id);

    boolean editSupplier(Long id, SupplierDto editedSupplier);
}
