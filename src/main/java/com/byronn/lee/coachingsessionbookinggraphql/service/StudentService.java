package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Student;
import com.byronn.lee.coachingsessionbookinggraphql.entity.StudentInput;
import com.byronn.lee.coachingsessionbookinggraphql.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentService {

     private final StudentRepository studentRepository;

     public StudentService(StudentRepository studentRepository){
         this.studentRepository = studentRepository;
     }

    @Transactional
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Transactional
    public Student addStudent(StudentInput studentInput){
        Student student = new Student();


        student.setFirstName(studentInput.getFirstName());
        student.setLastName(studentInput.getLastName());
        student.setPhoneNo(studentInput.getPhoneNo());
        student.setIsWaiverSigned(studentInput.getIsWaiverSigned());

        return studentRepository.save(student);
    }
}
