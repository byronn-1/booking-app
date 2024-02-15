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
    public List<Session> createSessionsWithClubIdFromTemplateId(@Argument(name="templateId") Long templateId, @Argument(name="weekStartDate") LocalDateTime weekStartDate, @Argument(name="clubId") Long clubId){
        return sevenDayTemplateService.createSessionsWithClubIdFromTemplateId(templateId,  weekStartDate, clubId);
    }
    @MutationMapping
    public SevenDaySessionTemplate createSevenDaySessionsTemplateFromClubId(@Argument(name="sevenDaySessionTemplateInput")SevenDaySessionTemplateInput sevenDaySessionTemplateInput, @Argument(name="clubId") Long clubId){
        return sevenDayTemplateService.createSevenDaySessionsTemplateFromClubId(sevenDaySessionTemplateInput,clubId);
    }

    @MutationMapping
    public SevenDaySessionTemplate createSevenDaySessionsTemplate(@Argument(name="sevenDaySessionTemplateInput") SevenDaySessionTemplateInput sevenDaySessionTemplateInput,@Argument(name="weekStartDate") LocalDateTime weekStartDate) {

        return sevenDayTemplateService.createSevenDaySessionsTemplate(sevenDaySessionTemplateInput, weekStartDate);
    }

/*
* createSevenDaySessionTemplateWithoutSessions operates on the sevenDayTemplateService it creates a block of SessionTemplates.
* This block of SessionTemplates are then intended to be applied to any given week so that a user can create actual Sessions for a given week.
* */
    @MutationMapping
    public SevenDaySessionTemplate createSevenDaySessionTemplateWithoutSessions(
            @Argument(name="input") SevenDaySessionTemplateInput sevenDaySessionTemplateInput,
            @Argument(name="clubId") Long clubId,
            @Argument(name="coachId") Long coachId ) {
        System.out.println(sevenDaySessionTemplateInput);
        return sevenDayTemplateService.createSevenDaySessionTemplateWithoutSessions(sevenDaySessionTemplateInput, clubId, coachId);
    }


    @MutationMapping
    public SevenDaySessionTemplate updateSevenDaySessionTemplate(
            @Argument(name="templateId") Long templateId,
            @Argument(name="sevenDaySessionTemplateInput") SevenDaySessionTemplateInput sevenDaySessionTemplateInput) {

        return sevenDayTemplateService.updateSevenDaySessionTemplate(templateId, sevenDaySessionTemplateInput);
    }

}
