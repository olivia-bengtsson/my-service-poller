package com.servicepoller.servicepoller.services;

import com.servicepoller.servicepoller.models.ServiceModel;
import com.servicepoller.servicepoller.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;


@Service
public class PollerService {

    @Autowired
    private ServiceRepository serviceRepository;
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss - dd MMMMM yyyy");

    public ServiceModel create(String name, String url) {
        ServiceModel service = new ServiceModel();
        service.setName(name);
        service.setUrl(url);
        service.setStatus(getStatus(url));
        service.setStatusDate(dateFormat.format(new Date()));
        service.setCreationDate(dateFormat.format(new Date()));
        serviceRepository.save(service);
        return service;
    }

    public String getStatus(String url) {
        String result = "";
        String status = "";

        try {
            URL serviceURL = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) serviceURL.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(3000);
            connection.setReadTimeout(3000);
            connection.connect();

            int code = connection.getResponseCode();
            if (code == 200 || code == 204) {
                result = "-> OK <-\t" + "Code: " + code;
                status = "OK";

            } else {
                result = "-> FAIL <-\t" + "Code: " + code;
                status = "FAIL";
            }
        } catch (SocketTimeoutException e) {
            result = "-> Red <-\t" + "Timeout - Exception: " + e.getMessage();
            status = "FAIL";
        } catch (Exception e) {
            result = "-> Red <-\t" + "Wrong domain - Exception: " + e.getMessage();
            status = "FAIL";
        }
        System.out.println(url + "\t\tStatus: " + result);
        return status;
    }

    public ServiceModel edit(String serviceId, String name, String url) {
        ServiceModel service = serviceRepository.findById(serviceId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Was not able to find the service with id: " + serviceId));
        service.setName(name);
        service.setUrl(url);
        service.setEditDate(dateFormat.format(new Date()));
        serviceRepository.save(service);
        return service;
    }

    public ServiceModel updateConnection(String serviceId) {
        ServiceModel service = serviceRepository.findById(serviceId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Couldn't update. Was not able to find the service with id: " + serviceId));
        String status = getStatus(service.getUrl());
        service.setStatus(status);
        service.setStatusDate(dateFormat.format(new Date()));
        serviceRepository.save(service);
        return service;

    }

    public boolean isValidURL(String urlString) {
        try {
            URL url = new URL(urlString);
            url.toURI();
            return true;

        } catch (Exception exception) {
            return false;
        }
    }
}
