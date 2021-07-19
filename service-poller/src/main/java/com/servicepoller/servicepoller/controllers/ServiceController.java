package com.servicepoller.servicepoller.controllers;

import com.servicepoller.servicepoller.models.ServiceModel;
import com.servicepoller.servicepoller.repositories.ServiceRepository;
import com.servicepoller.servicepoller.services.PollerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@CrossOrigin(originPatterns = "http://localhost:4200")
@RequestMapping("api/servicepoller")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private PollerService pollerServices;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<ServiceModel> findAllServices() {
        return serviceRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(ServiceModel::getName))
                .collect(Collectors.toList());
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ServiceModel create(@RequestBody ServiceModel service) {
        if (pollerServices.isValidURL(service.getUrl())) {
            return pollerServices.create(service.getName(), service.getUrl());
        } else {
            throw new IllegalArgumentException("Given URL: " + service.getUrl() + " is not valid.");
        }
    }

    @RequestMapping(value = "/{serviceId}", method = RequestMethod.DELETE)
    public void delete(@PathVariable String serviceId) {
        ServiceModel service = serviceRepository.findById(serviceId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No service with id " + serviceId + " was found."));
        serviceRepository.deleteById(serviceId);

    }

    @RequestMapping(value = "/{serviceId}", method = RequestMethod.GET)
    public ServiceModel updateConnection(@PathVariable String serviceId) {
        return pollerServices.updateConnection(serviceId);
    }

    @RequestMapping(value = "/{serviceId}/{name}", method = RequestMethod.PUT)
    public ServiceModel edit(@PathVariable String serviceId, @PathVariable String name, @RequestBody String url) {
        return pollerServices.edit(serviceId, name, url);
    }

}
