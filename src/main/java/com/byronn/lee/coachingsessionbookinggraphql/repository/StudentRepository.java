package com.byronn.lee.coachingsessionbookinggraphql.repository;

import com.byronn.lee.coachingsessionbookinggraphql.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

}