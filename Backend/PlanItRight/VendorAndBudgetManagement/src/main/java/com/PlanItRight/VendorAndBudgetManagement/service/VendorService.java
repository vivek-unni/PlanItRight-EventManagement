package com.PlanItRight.VendorAndBudgetManagement.service;

import com.PlanItRight.VendorAndBudgetManagement.model.Vendor;
import com.PlanItRight.VendorAndBudgetManagement.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;


    public Vendor addVendor(Vendor vendor) {
        vendor.setStatus("active");
        return vendorRepository.save(vendor);
    }


    public Vendor updateVendor(Long vendorId, Vendor updatedVendor) {
        if (vendorRepository.existsById(vendorId)) {
            updatedVendor.setId(vendorId);
            return vendorRepository.save(updatedVendor);
        }
        return null;
    }

    public void deactivateVendor(Long vendorId) {
        Optional<Vendor> vendorOptional = vendorRepository.findById(vendorId);
        vendorOptional.ifPresent(vendor -> {
            vendor.setStatus("inactive");
            vendorRepository.save(vendor);
        });
    }


    public Optional<Vendor> getVendorById(Long vendorId) {
        return vendorRepository.findById(vendorId);
    }


    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }
}

