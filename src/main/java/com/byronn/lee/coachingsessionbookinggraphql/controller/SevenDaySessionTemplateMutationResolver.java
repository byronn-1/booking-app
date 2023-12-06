package com.byronn.lee.coachingsessionbookinggraphql.controller;
import com.byronn.lee.coachingsessionbookinggraphql.entity.SevenDaySessionTemplate;
import com.byronn.lee.coachingsessionbookinggraphql.entity.SevenDaySessionTemplateInput;
import com.byronn.lee.coachingsessionbookinggraphql.service.SevenDaySessionTemplateService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class SevenDaySessionTemplateMutationResolver {

    public final SevenDaySessionTemplateService sevenDayTemplateService;

    private SevenDaySessionTemplateMutationResolver( SevenDaySessionTemplateService sevenDayTemplateService){
        this.sevenDayTemplateService = sevenDayTemplateService;
    }
    @MutationMapping
    public SevenDaySessionTemplate createSevenDaySessionTemplate(@Argument(name="SevenDaySessionTemplate") SevenDaySessionTemplateInput sevenDaySessionTemplateInput) {

        return sevenDayTemplateService.createSevenDaySessionTemplate(sevenDaySessionTemplateInput);
    }
}
