package com.feed_grabber.core.question.serializers;


import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.feed_grabber.core.question.QuestionType;
import com.feed_grabber.core.question.dto.QuestionUpdateDto;
import com.feed_grabber.core.question.dto.QuestionUpsertDto;
import com.feed_grabber.core.question.exceptions.QuestionTypeNotExistsException;

import java.io.IOException;
import java.util.UUID;

public class QuestionUpsertDes extends StdDeserializer<QuestionUpsertDto> {
    public QuestionUpsertDes() {
        this(null);
    }

    public QuestionUpsertDes(Class<?> vc) {
        super(vc);
    }

    @Override
    public QuestionUpsertDto deserialize(JsonParser jp, DeserializationContext ctxt)
            throws IOException {
        JsonNode node = jp.getCodec().readTree(jp);
        var id = this.getId(node);
        String payload = node.get("details").toString();
        String category = node.get("categoryTitle").asText();
        String text = node.get("name").asText();
        Integer index = this.getIndex(node);
        var type = this.getType(node);

        if (id == null && type == null) {
            throw new QuestionTypeNotExistsException("Does not allow empty type and id");
        }

        return new QuestionUpsertDto(id, text, category, payload, index, type);
    }

    private Integer getIndex(JsonNode node) {
        return node.hasNonNull("index")
                ? node.get("index").asInt(Integer.MAX_VALUE)
                : Integer.MAX_VALUE;
    }

    private QuestionType getType(JsonNode node) {
        try {
            return QuestionType.valueOf(node.get("type").asText());
        } catch (IllegalArgumentException e) {
            throw new QuestionTypeNotExistsException ("This type of question does not exists");
        }
    }

    private UUID getId(JsonNode node) {
        return node.hasNonNull("id")
                ? UUID.fromString((node.get("id")).asText())
                : null;
    }
}
