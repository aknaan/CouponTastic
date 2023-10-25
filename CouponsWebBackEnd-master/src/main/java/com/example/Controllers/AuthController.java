package com.example.Controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.Beans.*;
import com.example.Enums.ClientType;
import com.example.Exceptions.IncorrectCredentialsException;
import com.example.Exceptions.LoginErrorException;
import com.example.Exceptions.NotFoundException;
import com.example.Service.AdminService;
import com.example.Service.ClientService;
import com.example.Service.CompanyService;
import com.example.Service.CustomerService;
import com.example.Service.Login.LoginManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping(path = "/auth")
public class AuthController {
    private final LoginManager loginManager;
    @Autowired
    private Map<String, Session> sessionPack;
    @Autowired
    private AdminService adminService;

    public AuthController(LoginManager loginManager) {
        this.loginManager = loginManager;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody Credentials credentials){
        try{
            ClientService service = loginManager.Login(credentials.getEmail(), credentials.getPassword(), credentials.getType());

            String token = switch (credentials.getType()) {
                case ADMIN -> createToken(new Admin());
                case COMPANY -> createToken(((CompanyService) service).getCompanyDetail());
                case CUSTOMER -> createToken(((CustomerService) service).getCustomerDetail());
            };
            sessionPack.put(token, new Session(service, token));
            return ResponseEntity.ok(token);
        } catch (IncorrectCredentialsException | NotFoundException | LoginErrorException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Credentials");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Sorry, something went wrong, please try again");
        }
    }

    @PostMapping(path = "/register")
    public ResponseEntity<String> register(@RequestBody Customer customer){
        try{
            adminService.addCustomer(customer);
            ClientService service = loginManager.Login(customer.getEmail(), customer.getPassword(), ClientType.CUSTOMER);
            String token = createToken(((CustomerService) service).getCustomerDetail());
            sessionPack.put(token, new Session(service, token));
            return ResponseEntity.ok(token);
        } catch (IncorrectCredentialsException | NotFoundException | LoginErrorException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Credentials");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Sorry, something went wrong, please try again");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody String token) {
        try {
            sessionPack.remove(token);
            return ResponseEntity.ok("Logging out");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sorry, something went wrong, please try again");
        }
    }

    private String createToken(Client client){
        if(client instanceof Company company) {
            return JWT.create()
                    .withIssuer("CouponTastic")
                    .withIssuedAt(new Date())
                    .withClaim("id", company.getId())
                    .withClaim("name", company.getName())
                    .withClaim("email", company.getEmail())
                    .withClaim("type", "COMPANY")
                    .sign(Algorithm.HMAC256("top-secret"));
        }
        else if (client instanceof Customer customer) {
            return JWT.create()
                    .withIssuer("CouponTastic")
                    .withIssuedAt(new Date())
                    .withClaim("id", customer.getId())
                    .withClaim("firstName", customer.getFirstName())
                    .withClaim("lastName", customer.getLastName())
                    .withClaim("email", customer.getEmail())
                    .withClaim("type", "CUSTOMER")
                    .sign(Algorithm.HMAC256("top-secret"));
        }
        else
            return JWT.create()
                    .withIssuer("CouponTastic")
                    .withIssuedAt(new Date())
                    .withClaim("email", "admin@admin.com")
                    .withClaim("type", "ADMIN")
                    .sign(Algorithm.HMAC256("top-secret"));
    }
}