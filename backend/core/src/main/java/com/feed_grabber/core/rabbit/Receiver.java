package com.feed_grabber.core.rabbit;

import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.file.dto.S3FileCreationDto;
import com.feed_grabber.core.rabbit.entityExample.MailType;
import com.feed_grabber.core.rabbit.entityExample.PostEntity;
import com.feed_grabber.core.report.dto.FileReportsDto;
import com.feed_grabber.core.request.RequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class Receiver {

    @RabbitListener(queues = "${rabbitmq.queue.response}")
    public void receive(PostEntity postEntity) {
        if (postEntity.getType() == MailType.REGISTER) {
            log.info(" [x] Received '{}'", postEntity);
        }
    }

//    @RabbitListener(queues = "${rabbitmq.queue.report}")
//    public void receive(FileReportsDto dto) throws NotFoundException {
//        requestService.addFileReports(dto);
//        var userId = reportToUser.get(dto.getRequestId());
//        if (userId != null) {
//            requestService.sendReportsUrls(userId, dto);
//        }
//    }

//    @RabbitListener(queues = "${rabbitmq.queue.report.ppt}")
//    public void receivePPTReport(S3FileCreationDto dto) throws NotFoundException {
//        requestService.addPPTReport(dto);
//    }
}
