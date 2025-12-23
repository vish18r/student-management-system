package com.nextenti.StudentDetails.repository;

import com.nextenti.StudentDetails.entity.Student;//Entity mapped to DB table
import org.springframework.data.jpa.repository.JpaRepository;//Provides CRUD operations


//Interface Declaration
public interface StudentRepository extends JpaRepository<Student, Long> {
//Check Email Exists  and phone alredy autiomaticall create qury
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
}





//This repository extends JpaRepository to provide CRUD operations for Student entities and includes custom query methods for checking unique constraints like email and phone.