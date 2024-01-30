//package com.byronn.lee.coachingsessionbookinggraphql.service;
//
//import com.byronn.lee.coachingsessionbookinggraphql.entity.Student;
//import com.byronn.lee.coachingsessionbookinggraphql.entity.StudentInput;
//import com.byronn.lee.coachingsessionbookinggraphql.repository.StudentRepository;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.util.Arrays;
//import java.util.Collections;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.argThat;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//
//@ExtendWith(MockitoExtension.class)
//public class StudentServiceTest {
//
//    @Mock
//    StudentRepository studentRepository;
//
//    @InjectMocks
//    StudentService studentService;
//
//
//    @DisplayName("when there are no students in the repository, returns empty list")
//    @Test
//    public void testGetAllStudentsWhenNoStudentsPresent() {
//        // Arrange
//        when(studentRepository.findAll()).thenReturn(Collections.emptyList());
//
//        // Act
//        List<Student> students = studentService.getAllStudents();
//
//        // Assert
//        assertTrue(students.isEmpty(), "Expected an empty list of students");
//        verify(studentRepository).findAll();
//    }
//
//
//    @DisplayName("test should return a List of Students when Students are present in the List")
//    @Test
//    public void getAllStudents(){
//        //Arrange
//        Student student1 = new Student(); // Set properties if necessary
//        Student student2 = new Student(); // Set properties if necessary
//
//        student1.setFirstName("bill");
//        student1.setLastName("pots");
//        student1.setPhoneNo("01911919");
//        student1.setIsWaiverSigned(false);
//
//        student2.setFirstName("ben");
//        student2.setLastName("pots");
//        student2.setPhoneNo("01911919");
//        student2.setIsWaiverSigned(true);
//
//        List<Student> mockStudents = Arrays.asList(student1, student2);
//
//        when(studentRepository.findAll()).thenReturn(mockStudents);
//
//        // Act
//        List<Student> students = studentService.getAllStudents();
//
//        // Assert
//        assertEquals(2, students.size(), "Expected list size to be 2");
//        assertSame(mockStudents, students, "Expected returned list to be the same as the mock list");
//        verify(studentRepository).findAll();
//    }
//
//    @Test
//    public void testAddStudent() {
//        // Arrange
//        StudentInput studentInput = new StudentInput("John", "Doe", "1234567890", true);
//
//        Student expectedStudent = new Student();
//        expectedStudent.setFirstName("John");
//        expectedStudent.setLastName("Doe");
//        expectedStudent.setPhoneNo("1234567890");
//        expectedStudent.setIsWaiverSigned(true);
//
//        when(studentRepository.save(any(Student.class))).thenReturn(expectedStudent);
//
//        // Act
//        Student actualStudent = studentService.addStudent(studentInput);
//
//        // Assert
//        assertNotNull(actualStudent, "The saved student should not be null");
//        assertEquals(expectedStudent.getFirstName(), actualStudent.getFirstName(), "First names should match");
//        assertEquals(expectedStudent.getLastName(), actualStudent.getLastName(), "Last names should match");
//        assertEquals(expectedStudent.getPhoneNo(), actualStudent.getPhoneNo(), "Phone numbers should match");
//        assertEquals(expectedStudent.getIsWaiverSigned(), actualStudent.getIsWaiverSigned(), "Waiver signed status should match");
//
//        // Verify that the repository's save method was called with a student having the expected properties
//        verify(studentRepository).save(argThat(student ->
//                student.getFirstName().equals("John") &&
//                        student.getLastName().equals("Doe") &&
//                        student.getPhoneNo().equals("1234567890") &&
//                        student.getIsWaiverSigned()
//        ));
//    }
//
//}
