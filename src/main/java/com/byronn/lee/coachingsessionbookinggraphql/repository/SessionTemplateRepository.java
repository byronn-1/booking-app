package com.byronn.lee.coachingsessionbookinggraphql.repository;

import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionTemplateRepository  extends JpaRepository<SessionTemplate, Long>  {
    List<SessionTemplate> findBySevenDayTemplateId(Long sevenDayTemplateId);
}
