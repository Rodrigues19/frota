package com.seuprojeto.frota.controller;

import com.seuprojeto.frota.dto.DashboardDTO;
import com.seuprojeto.frota.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/dashboard")
    public DashboardDTO obterDashboard() {
        return dashboardService.obterDashboard();
    }
}