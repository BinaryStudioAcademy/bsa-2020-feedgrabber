package com.feed_grabber.core.question.serializers;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.feed_grabber.core.question.QuestionType;
import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.exceptions.QuestionTypeNotExistsException;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

public class CustomDes extends StdDeserializer<QuestionCreateDto> {
    public CustomDes() {
        this(null);
    }

    public CustomDes(Class<?> vc) {
        super(vc);
    }

    @Override
    public QuestionCreateDto deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
        JsonNode node = jp.getCodec().readTree(jp);

        String category = node.get("categoryTitle").asText();
        String text = node.get("name").asText();
        var anketId = this.getQuestionnaireId(node);
        var payload = this.getDetails(node);
        var type = this.getType(node);
        var index = this.getIndex(node);

        return new QuestionCreateDto(text, category, type, anketId, payload, index);

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

    private Optional<UUID> getQuestionnaireId(JsonNode node) {
        Optional<UUID> anketId = Optional.empty();
        if (node.has("questionnaireId")) {
            anketId = Optional.of(UUID.fromString(node.get("questionnaireId").asText()));
        }
        return anketId;
    }
}
