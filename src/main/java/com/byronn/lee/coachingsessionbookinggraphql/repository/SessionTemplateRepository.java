package com.byronn.lee.coachingsessionbookinggraphql.repository;

import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionTemplateRepository  extends JpaRepository<SessionTemplate, Long>  {
}
