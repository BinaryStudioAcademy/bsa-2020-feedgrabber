package com.feed_grabber.core.question.serializers;


import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import com.feed_grabber.core.question.dto.QuestionUpdateDto;

import java.io.IOException;
import java.util.UUID;

public class QuestionUpdateDes extends StdDeserializer<QuestionUpdateDto> {
    public QuestionUpdateDes() {
        this(null);
    }

    public QuestionUpdateDes(Class<?> vc) {
        super(vc);
    }

    @Override
    public QuestionUpdateDto deserialize(JsonParser jp, DeserializationContext ctxt)
            throws IOException {
        JsonNode node = jp.getCodec().readTree(jp);
        var id = UUID.fromString((node.get("id")).asText());
        String payload = node.get("details").toString();
        String category = node.get("categoryTitle").asText();
        String text = node.get("name").asText();
        Integer index = node.hasNonNull("index")
                ? node.get("index").asInt(Integer.MAX_VALUE)
                : Integer.MAX_VALUE;

        return new QuestionUpdateDto(id, text, category, payload, index);
    }
}
