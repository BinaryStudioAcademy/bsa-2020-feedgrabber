package com.feed_grabber.core.question.serializers;


import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import com.feed_grabber.core.question.QuestionType;
import com.feed_grabber.core.question.dto.QuestionUpdateDto;
import com.feed_grabber.core.question.exceptions.QuestionTypeNotExistsException;

import java.io.IOException;
import java.util.Optional;
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
        String payload = this.getDetails(node);
        String category = node.get("categoryTitle").asText();
        String text = node.get("name").asText();
        Integer index = this.getIndex(node);
        boolean isRequired = this.isRequired(node);
        var type = this.getType(node);

        return new QuestionUpdateDto(id, text, category, payload, index, type, isRequired);
    }

    private QuestionType getType(JsonNode node) {
        try {
            return QuestionType.valueOf(node.get("type").asText());
        } catch (IllegalArgumentException e) {
            throw new QuestionTypeNotExistsException ("This type of question does not exists");
        }
    }

    private Integer getIndex(JsonNode node) {
        return node.hasNonNull("index")
                ? node.get("index").asInt(Integer.MAX_VALUE)
                : Integer.MAX_VALUE;
    }

    private String getDetails(JsonNode node) {
        return node.hasNonNull("details")
                ? node.get("details").toString()
                : "";
    }

    private boolean isRequired(JsonNode node) {
        return node.hasNonNull("isRequired")
                && Boolean.parseBoolean(node.get("isRequired").toString());
    }
}
