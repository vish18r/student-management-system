package com.nextenti.StudentDetails.controler;

import com.nextenti.StudentDetails.entity.Student;
import com.nextenti.StudentDetails.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class StudentController {
//Dependency Injection
    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping("/students")
    public Student add(@RequestBody Student student) {
        return service.save(student);
    }

    // READ ALL  READ All Students
    @GetMapping("/students")
    public List<Student> getAll() {
        return service.getAll();
    }

    // READ BY ID (FIX)
    @GetMapping("/students/{id}")
    public Student getById(@PathVariable Long id) {  //Spring extracts it using @PathVariable
        return service.getById(id);
    }

    // UPDATE
    @PutMapping("/students/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student student) {
        return service.update(id, student);
    }

    // DELETE
    @DeleteMapping("/students/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
