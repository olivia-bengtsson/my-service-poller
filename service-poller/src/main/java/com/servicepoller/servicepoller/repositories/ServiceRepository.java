package com.servicepoller.servicepoller.repositories;

import com.servicepoller.servicepoller.models.ServiceModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends MongoRepository<ServiceModel, String> {

}

