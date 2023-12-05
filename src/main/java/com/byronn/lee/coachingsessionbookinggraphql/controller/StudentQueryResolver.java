package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Student;
import com.byronn.lee.coachingsessionbookinggraphql.service.StudentService;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class StudentQueryResolver {
    private StudentService studentService;

    public StudentQueryResolver (StudentService studentService){
       this.studentService = studentService;
    }

    @QueryMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }
}
