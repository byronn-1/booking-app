package com.byronn.lee.coachingsessionbookinggraphql.controller;
import com.byronn.lee.coachingsessionbookinggraphql.entity.Session;
import com.byronn.lee.coachingsessionbookinggraphql.entity.SevenDaySessionTemplate;
import com.byronn.lee.coachingsessionbookinggraphql.entity.SevenDaySessionTemplateInput;
import com.byronn.lee.coachingsessionbookinggraphql.service.SessionService;
import com.byronn.lee.coachingsessionbookinggraphql.service.SevenDaySessionTemplateService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/*
 * This controller operates on the  SevenDaySessionTemplate Service and facilitates Create, Update and Delete.
 * The SevenDaySessionTemplateService service allows for the operations on the SevenDaySessionTemplateService SQL table.
 * A SevenDaySessionTemplate is any entity that is an abstraction of a week collection of Sessions, that an Owner or Coach may use to prevent the repitition of creating Sessions.
 */
@Controller
public class SevenDaySessionTemplateMutationResolver {

    public final SevenDaySessionTemplateService sevenDayTemplateService;

    private SevenDaySessionTemplateMutationResolver( SevenDaySessionTemplateService sevenDayTemplateService){
        this.sevenDayTemplateService = sevenDayTemplateService;
    }


    @MutationMapping
    public List<Session> createSessionsFromId(@Argument(name="templateId") Long id, @Argument(name="weekStartDate") LocalDateTime weekStartDate){
        return sevenDayTemplateService.createSessionsFromId(id, weekStartDate);
    }


    @MutationMapping
    public SevenDaySessionTemplate createSevenDaySessionsTemplate(@Argument(name="sevenDaySessionTemplateInput") SevenDaySessionTemplateInput sevenDaySessionTemplateInput,@Argument(name="weekStartDate") LocalDateTime weekStartDate) {

        return sevenDayTemplateService.createSevenDaySessionsTemplate(sevenDaySessionTemplateInput, weekStartDate);
    }


    @MutationMapping
    public SevenDaySessionTemplate createSevenDaySessionTemplateWithoutSessions(
            @Argument(name="input") SevenDaySessionTemplateInput sevenDaySessionTemplateInput) {
        System.out.println(sevenDaySessionTemplateInput);
        return sevenDayTemplateService.createSevenDaySessionTemplateWithoutSessions(sevenDaySessionTemplateInput);
    }


    @MutationMapping
    public SevenDaySessionTemplate updateSevenDaySessionTemplate(
            @Argument(name="templateId") Long templateId,
            @Argument(name="sevenDaySessionTemplateInput") SevenDaySessionTemplateInput sevenDaySessionTemplateInput) {

        return sevenDayTemplateService.updateSevenDaySessionTemplate(templateId, sevenDaySessionTemplateInput);
    }

}
