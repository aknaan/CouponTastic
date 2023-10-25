package com.example.Service.Login;
import com.example.Exceptions.IncorrectCredentialsException;
import com.example.Exceptions.LoginErrorException;
import com.example.Exceptions.NotFoundException;
import com.example.Enums.ClientType;
import com.example.Service.AdminService;
import com.example.Service.ClientService;
import com.example.Service.CompanyService;
import com.example.Service.CustomerService;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class LoginManager {

    private ApplicationContext ctx;

    public LoginManager(ApplicationContext ctx) {
        this.ctx = ctx;
    }

    /**checks client type and tries to log in with it and given email and password
     * @param email email of the requested user
     * @param password password of the requested user
     * @param clientType client type of the requested user (Administrator/Company/CUSTOMER)
     * @return a service of the requested Administrator/Company/CUSTOMER
     * @throws IncorrectCredentialsException incorrect email or password
     * @throws NotFoundException unknown client type
     */
    public ClientService Login(String email, String password, ClientType clientType)
            throws IncorrectCredentialsException, NotFoundException, LoginErrorException {
        switch (clientType) {
            case ADMIN -> {
                AdminService adminService = ctx.getBean(AdminService.class);
                if (email.equals("admin@admin.com") && password.equals("admin")) {
                    return adminService;
                } else
                    throw new LoginErrorException("Your email or password isn't valid");
            }
            case COMPANY -> {
                CompanyService companyService = ctx.getBean(CompanyService.class);
                if (companyService.login(email, password) > 0) {
                    return companyService;
                } else throw new IncorrectCredentialsException();
            }
            case CUSTOMER -> {
                CustomerService customerService = ctx.getBean(CustomerService.class);
                if (customerService.login(email, password) > 0) {
                    return customerService;
                } else throw new IncorrectCredentialsException();
            }
        }
        throw new NotFoundException("Unknown Client Type");
    }
}