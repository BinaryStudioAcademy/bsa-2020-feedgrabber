package com.feed_grabber.core.question;

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
        for (QuestionType type : QuestionType.values()) {
            if (type.value.equalsIgnoreCase(text)) {
                return type;
            }
        }
        return null;
    }
}
