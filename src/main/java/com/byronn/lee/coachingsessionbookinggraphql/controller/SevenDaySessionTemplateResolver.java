package com.byronn.lee.coachingsessionbookinggraphql.controller;

import com.byronn.lee.coachingsessionbookinggraphql.entity.SevenDaySessionTemplate;
import com.byronn.lee.coachingsessionbookinggraphql.service.SevenDaySessionTemplateService;
import org.springframework.graphql.data.method.annotation.QueryMapping;

import java.util.List;

public class SevenDaySessionTemplateResolver {

    public final SevenDaySessionTemplateService sevenDayTemplateService;

    private SevenDaySessionTemplateResolver( SevenDaySessionTemplateService sevenDayTemplateService){
        this.sevenDayTemplateService = sevenDayTemplateService;
    }

    @QueryMapping
    public List<SevenDaySessionTemplate> getAllSevenDaySessionTemplates(){
        return sevenDayTemplateService.getAllSevenDaySessionTemplates();
    }

}
