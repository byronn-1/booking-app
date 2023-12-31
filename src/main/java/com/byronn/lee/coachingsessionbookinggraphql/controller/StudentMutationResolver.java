package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Student;
import com.byronn.lee.coachingsessionbookinggraphql.entity.StudentInput;
import com.byronn.lee.coachingsessionbookinggraphql.service.StudentService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class StudentMutationResolver {

    private final StudentService studentService;

    public StudentMutationResolver(StudentService studentService) {
        this.studentService = studentService;
    }

    @MutationMapping
    public Student addStudent(@Argument(name="studentInput") StudentInput studentInput){

        return studentService.addStudent(studentInput);
    }

}
