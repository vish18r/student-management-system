package com.nextenti.StudentDetails.service;

import com.nextenti.StudentDetails.entity.Student;
import com.nextenti.StudentDetails.repository.StudentRepository;
import org.springframework.stereotype.Service;  //Marks business layer
import org.springframework.transaction.annotation.Transactional;//DB consistency	

import java.util.List;

@Service  // Marks this class as a service layer Contains rules & validations
public class StudentService {

	
	//Dependency Injection (Repository)
    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    // CREATE
    public Student save(Student student) {

        if (repo.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (repo.existsByPhone(student.getPhone())) {
            throw new RuntimeException("Mobile number already exists");
        }
//Save student
        return repo.save(student);
    }

    // READ ALL
    public List<Student> getAll() {
        return repo.findAll();
    }

    // READ BY ID (IMPORTANT FOR UPDATE PAGE)
    public Student getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    // UPDATE
    public Student update(Long id, Student student) {

        Student existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!existing.getEmail().equals(student.getEmail())
                && repo.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (!existing.getPhone().equals(student.getPhone())
                && repo.existsByPhone(student.getPhone())) {
            throw new RuntimeException("Mobile number already exists");
        }
//Update fields
        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setPhone(student.getPhone());
        existing.setDepartment(student.getDepartment());
//Save updated record
        return repo.save(existing);
    }

    //  DELETE (FIXES 400 ERROR)
    @Transactional
    public void delete(Long id) {
        Student student = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        repo.delete(student);
    }
}



//“This service layer contains the business logic for student management, including validation, duplicate checks, and transactional delete operations, while delegating database access to the repository