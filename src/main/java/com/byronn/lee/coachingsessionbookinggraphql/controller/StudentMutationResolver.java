package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Student;
import com.byronn.lee.coachingsessionbookinggraphql.entity.StudentInput;
import com.byronn.lee.coachingsessionbookinggraphql.service.StudentService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

/*
 * This controller operates on the Student service and facilitates Create, Update and Delete.
 * The Student service allows for the operations on the Student SQL table.
 * A Student is any entity that can book into Sessions that a Coach or Owner have created.
 */
@Controller
public class StudentMutationResolver {

    private final StudentService studentService;

    public StudentMutationResolver(StudentService studentService) {
        this.studentService = studentService;
    }

    /*
     * addStudent allows for the creation of new Students. It accepts StudentInput as an argument.
     * StudentInput models the Students entity without ID's (which are created in the databasing system).
     * It should return the Students that has been created.
     */
    @MutationMapping
    public Student addStudent(@Argument(name="studentInput") StudentInput studentInput){

        return studentService.addStudent(studentInput);
    }

}
