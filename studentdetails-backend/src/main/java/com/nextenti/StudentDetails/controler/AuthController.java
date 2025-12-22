package com.nextenti.StudentDetails.controler;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
//This class will handle REST API requests
@RestController
@RequestMapping("/api/auth")//Base URL Mapping
@CrossOrigin("*")
public class AuthController {

    // SIGNUP (TEMP – returns firstName)
    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody Map<String, String> user) {
//Extract Data
        String firstName = user.get("firstName");
        String email = user.get("email");
        String password = user.get("password");
//Validation
        if (firstName == null || email == null || password == null) {
            throw new RuntimeException("Invalid signup data");
        }
//Signup Response
        return Map.of(
            "message", "Signup successful",
            "firstName", firstName
        );
    }

    //  LOGIN (ALWAYS RETURNS FIRST NAME)
    @PostMapping("/login") //Login Endpoint
   // Request Body
    public Map<String, String> login(@RequestBody Map<String, String> user) {
//Extract Email & Password
        String email = user.get("email");
        String password = user.get("password");

      //Generate First Name
        // vishalp5108@gmail.com → Vishal
        String firstName = email.split("@")[0];
        firstName = firstName.replaceAll("[^A-Za-z]", "");
//Login Response
        return Map.of(
            "token", "dummy-token",
            "email", email,
            "firstName", firstName
        );
    }
}
