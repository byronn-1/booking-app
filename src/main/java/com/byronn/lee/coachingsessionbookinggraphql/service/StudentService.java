package com.byronn.lee.coachingsessionbookinggraphql.service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Student;
import com.byronn.lee.coachingsessionbookinggraphql.entity.StudentInput;
import com.byronn.lee.coachingsessionbookinggraphql.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentService {
    private static final Logger logger = LoggerFactory.getLogger(StudentService.class);
     private final StudentRepository studentRepository;

     public StudentService(StudentRepository studentRepository){
         this.studentRepository = studentRepository;
     }

    @Transactional
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Transactional
    public Student addStudent(@org.jetbrains.annotations.NotNull StudentInput studentInput){
        Student student = new Student();
        student.setFirstName(studentInput.getFirstName());
        student.setLastName(studentInput.getLastName());
        student.setPhoneNo(studentInput.getPhoneNo());
        student.setIsWaiverSigned(studentInput.getIsWaiverSigned());

        student = studentRepository.save(student);
        logger.info("Saved student ID: {}", student.getId());

        // Refetch the student to initialize lazy-loaded collections
        Student refetchedStudent = studentRepository.findById(student.getId()).orElse(null);

        logger.info("Refetched Student: {}", refetchedStudent);
        return refetchedStudent;
    }
}
