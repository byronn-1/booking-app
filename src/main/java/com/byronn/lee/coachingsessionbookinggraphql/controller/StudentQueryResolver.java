package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Student;
import com.byronn.lee.coachingsessionbookinggraphql.service.StudentService;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

/*
 * This Controller operates on the Student service and facilitates the reading of Student listings in the Club SQL table.
 */
@Controller
public class StudentQueryResolver {
    private StudentService studentService;

    public StudentQueryResolver (StudentService studentService){
       this.studentService = studentService;
    }

    /*
     * getAllStudents accepts no parameters and returns the entire collection of Students in the Students SQL table.
     */
    @QueryMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }
}
