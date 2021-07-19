package com.servicepoller.servicepoller.services;

import com.servicepoller.servicepoller.models.ServiceModel;
import com.servicepoller.servicepoller.repositories.ServiceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@EnableScheduling
public class ConnectionConfigService {

    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    PollerService pollerServices;

    private static final Logger log = LoggerFactory.getLogger(ConnectionConfigService.class);
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss - dd MMMMM yyyy");

    // This method is scheduled to execute 1 time per minute
    @Scheduled(cron="1 * * * * *")
    public void periodicallyUpdateController() {
        List<ServiceModel> services = new ArrayList<>(serviceRepository.findAll());
        for (ServiceModel service : services) {
            String status = pollerServices.getStatus(service.getUrl());
            service.setStatus(status);
            service.setStatusDate(dateFormat.format(new Date()));
            serviceRepository.save(service);
        }
        log.info("Current Time      = {}", dateFormat.format(new Date()));
    }
}