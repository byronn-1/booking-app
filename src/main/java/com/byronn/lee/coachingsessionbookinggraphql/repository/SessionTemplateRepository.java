package com.byronn.lee.coachingsessionbookinggraphql.repository;

import com.byronn.lee.coachingsessionbookinggraphql.entity.SessionTemplate;
import org.aspectj.weaver.loadtime.Options;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SessionTemplateRepository  extends JpaRepository<SessionTemplate, Long>  {
    List<SessionTemplate> findAllBySevenDaySessionTemplateId(Long sevenDaySessionTemplateId);
}
