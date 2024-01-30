package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.SevenDaySessionTemplate;
import com.byronn.lee.coachingsessionbookinggraphql.service.SevenDaySessionTemplateService;
import org.springframework.data.jpa.repository.Query;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

/*
 * This Controller operates on the SevenDaySessionTemplate service and facilitates the reading of SevenDaySessionTemplate listings in the SevenDaySessionTemplate SQL table.
 */
@Controller
public class SevenDaySessionTemplateResolver {

    public final SevenDaySessionTemplateService sevenDayTemplateService;

    private SevenDaySessionTemplateResolver( SevenDaySessionTemplateService sevenDayTemplateService){
        this.sevenDayTemplateService = sevenDayTemplateService;
    }

    /*
     * getAllSevenDaySessionTemplates accepts no parameters and returns the entire collection of SevenDaySessionTemplate in the SevenDaySessionTemplate SQL table.
     */
    @QueryMapping
    public List<SevenDaySessionTemplate> getAllSevenDaySessionTemplates(){
        return sevenDayTemplateService.getAllSevenDaySessionTemplates();
    }

    @QueryMapping
    public List<SevenDaySessionTemplate> getSevenDaySessionTemplatesWithClubId(@Argument(name ="clubId") Long clubId){
        return sevenDayTemplateService.getSevenDaySessionTemplatesWithClubId(clubId);
    }
}
