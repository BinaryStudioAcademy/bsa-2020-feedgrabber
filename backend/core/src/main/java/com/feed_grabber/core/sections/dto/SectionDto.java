package com.feed_grabber.core.sections.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SectionDto {
    @NotNull
    UUID id;

    @NotNull
    String title;

    String description;

    Integer from;

    Integer to;
}
