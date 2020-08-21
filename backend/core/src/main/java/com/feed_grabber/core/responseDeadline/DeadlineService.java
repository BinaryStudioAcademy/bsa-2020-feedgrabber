package com.feed_grabber.core.responseDeadline;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.rabbit.Sender;
import com.feed_grabber.core.rabbit.entityExample.MailType;
import com.feed_grabber.core.request.RequestRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DeadlineService {

    private final RequestRepository requestRepository;
    private final Sender emailSender;

    public DeadlineService(RequestRepository requestRepository, Sender emailSender) {
        this.requestRepository = requestRepository;
        this.emailSender = emailSender;
    }

    public void sendAll() {
        requestRepository.findAll().stream()
                .flatMap(r ->
                        r.getResponses()
                                .stream()
                ).forEach(response -> {
            emailSender.sendToProcessor(
                    "Hi, "
                            + response.getUser().getUsername()
                            + " it`s almost deadline for http://feedgrabber.com.localhost:3000/response/"
                            + response.getRequest().getQuestionnaire().getId(),
                    response.getUser().getEmail(),
                    MailType.NOTIFY.toString());
        });
    }

    public void sendAllByOne(UUID id) throws NotFoundException {
        requestRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Request with id " + id + " not found"))
                .getResponses()
                .forEach(response ->
                        emailSender.sendToProcessor(
                                "Hi, "
                                        + response.getUser().getUsername()
                                        + " it`s almost deadline for http://feedgrabber.com.localhost:3000/response/"
                                        + response.getRequest().getQuestionnaire().getId(),
                                response.getUser().getEmail(),
                                MailType.NOTIFY.toString())
                );
    }


}


