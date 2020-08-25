package com.feed_grabber.core.rabbit;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.file.dto.S3FileCreationDto;
import com.feed_grabber.core.rabbit.entityExample.MailType;
import com.feed_grabber.core.rabbit.entityExample.PostEntity;
import com.feed_grabber.core.request.RequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class Receiver {

    private RequestService requestService;

    @Autowired
    public Receiver(RequestService requestService) {
        this.requestService = requestService;
    }

    @RabbitListener(queues = "${rabbitmq.queue.response}")
    public void receive(PostEntity postEntity) {
        if (postEntity.getType() == MailType.REGISTER) {
            log.info(" [x] Received '{}'", postEntity);
        }
    }

    @RabbitListener(queues = "${rabbitmq.queue.report}")
    public void receive(S3FileCreationDto dto) throws NotFoundException {
        requestService.addExcelReport(dto);
    }
}
