package com.byronn.lee.coachingsessionbookinggraphql.service;

import com.byronn.lee.coachingsessionbookinggraphql.entity.*;
import com.byronn.lee.coachingsessionbookinggraphql.repository.SevenDaySessionTemplateRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class SevenDaySessionTemplateServiceIntegrationTest {

    @Autowired
    private SevenDaySessionTemplateService sevenDaySessionTemplateService;

    @Autowired
    private SevenDaySessionTemplateRepository sevenDaySessionTemplateRepository;

    @Test
    void createSevenDaySessionsTemplate_IntegrationTest() {
        // Arrange
        SevenDaySessionTemplateInput input = new SevenDaySessionTemplateInput(null, "Test Template", "Test Coach", Arrays.asList(
                new SessionTemplateInput("Yoga", "Park", LocalDateTime.now(), null),
                new SessionTemplateInput("Gym", "Sports Center", LocalDateTime.now(), null)
        ));

        // Act
        SevenDaySessionTemplate createdTemplate = sevenDaySessionTemplateService.createSevenDaySessionsTemplate(input);

        // Assert
        assertNotNull(createdTemplate.getId());
        assertEquals("Test Template", createdTemplate.getTemplateName());
        assertEquals("Test Coach", createdTemplate.getCoach());

        // Verify the associated session templates were created
        List<SessionTemplate> sessionTemplates = createdTemplate.getSessionTemplates();
        assertNotNull(sessionTemplates);
        assertEquals(2, sessionTemplates.size());

    }
}
