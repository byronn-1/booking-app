package com.byronn.lee.coachingsessionbookinggraphql.repository;

import com.byronn.lee.coachingsessionbookinggraphql.entity.SevenDaySessionTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SevenDaySessionTemplateRepository extends JpaRepository<SevenDaySessionTemplate, Long> {

}
