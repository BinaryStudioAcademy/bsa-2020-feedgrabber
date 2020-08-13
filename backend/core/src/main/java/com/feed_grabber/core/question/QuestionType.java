package com.feed_grabber.core.question;

import com.feed_grabber.core.question.exceptions.QuestionTypeNotExistsException;

import java.util.Optional;
import java.util.stream.Stream;

public enum QuestionType {
    FREE_TEXT("free_text"),
    RADIO("radio"),
    SCALE("scale"),
    CHECKBOX("checkbox"),
    MULTI_CHOICE("multi_choice"),
    DATE("date");


    private String value;

    QuestionType(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    public static QuestionType fromString(String text) {
        return Stream.of(QuestionType.values())
                .filter(type -> type.value.equalsIgnoreCase(text))
                .findFirst()
                .orElseThrow(() -> new QuestionTypeNotExistsException("This type of question does not exists " + text));
    }

    @Override
    public String toString() {
        return value;
    }
}
