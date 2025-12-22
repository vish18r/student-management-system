package com.nextenti.StudentDetails.exception;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
//Makes this class global
@RestControllerAdvice
public class GlobalExceptionHandler {
//Without this, you would need try-catch in every controller
	
	
	//Catches all RuntimeExceptions
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handle(RuntimeException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", ex.getMessage()));
    }
}






//This class provides centralized exception handling for all controllers, converting runtime errors into clean JSON responses with appropriate HTTP status codes.

