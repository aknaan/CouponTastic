package com.example.Service;

import com.example.Exceptions.IncorrectCredentialsException;
import com.example.Repository.CouponRepository;
import com.example.Repository.CompanyRepository;
import com.example.Repository.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public abstract class ClientService {

    protected CustomerRepository customerRepo;

    protected CompanyRepository companyRepo;

    protected CouponRepository couponRepo;

    public ClientService(CustomerRepository customerRepo, CompanyRepository companyRepo, CouponRepository couponRepo) {
        this.customerRepo = customerRepo;
        this.companyRepo = companyRepo;
        this.couponRepo = couponRepo;
    }

    public ClientService() {}

    public abstract int login(String email, String password) throws IncorrectCredentialsException;
}