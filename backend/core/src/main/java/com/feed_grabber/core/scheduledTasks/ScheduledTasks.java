package com.feed_grabber.core.scheduledTasks;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.notification.UserNotificationService;
import com.feed_grabber.core.rabbit.Sender;
import com.feed_grabber.core.rabbit.entityExample.MailType;
import com.feed_grabber.core.response.ResponseRepository;
import com.feed_grabber.core.response.model.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class ScheduledTasks {
    private static final Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);
    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

    private final long MIN_TIME_TO_NOTIFY = 86_400_000;


    @Value("${client.host}")
    private String CLIENT_HOST;

    @Autowired
    private ResponseRepository responseRepository;

    @Autowired
    private UserNotificationService notificationService;

    @Autowired
    private Sender sender;

    @Scheduled(cron="0 0 0,12 * * *")
    public void scheduleRequestDeadlineCheck() throws NotFoundException {
        logger.info("Start checking deadlines. Time: {}", dateTimeFormatter.format(LocalDateTime.now()));

        var responses = responseRepository.findAllToAnswer();

        for (Response response : responses) {
            boolean notify = response.getRequest().getExpirationDate().getTime() - System.currentTimeMillis()
                    < MIN_TIME_TO_NOTIFY;
            if (notify) {
                notificationService.saveAndSendResponseNotification(response.getRequest(),
                        response.getUser(),
                        "Do not forget to answer the questionnaire");
                sender.sendToProcessor(
                        CLIENT_HOST + "/response/" + response.getRequest().getId().toString(),
                        response.getUser().getEmail(),
                        MailType.NOTIFY.toString());
            }
        }

        logger.info("End checking deadlines. Time: {}", dateTimeFormatter.format(LocalDateTime.now()));
    }


}