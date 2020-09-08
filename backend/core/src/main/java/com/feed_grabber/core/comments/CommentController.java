package com.feed_grabber.core.comments;

import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.apiContract.DataList;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.comments.dto.CommentCreationDto;
import com.feed_grabber.core.comments.dto.CommentDto;
import com.feed_grabber.core.comments.dto.CommentUpdateDto;
import com.feed_grabber.core.comments.exceptions.CommentNotFoundException;
import com.feed_grabber.core.news.exceptions.NewsNotFoundException;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @ApiOperation("Get all comments by news id")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public AppResponse<List<CommentDto>> getAllByNews(@RequestParam(defaultValue = "0") Integer page,
                                                          @RequestParam(defaultValue = "0") Integer size,
                                                          @RequestParam UUID newsId) {
        return new AppResponse<>(commentService.getAllByNewsId(newsId));
    }

    @ApiOperation("Create new comment")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public AppResponse<CommentDto> create(@RequestBody CommentCreationDto commentCreationDto) throws NewsNotFoundException, UserNotFoundException {
        commentCreationDto.setUserId(TokenService.getUserId());
        return new AppResponse<>(commentService.create(commentCreationDto));
    }

    @ApiOperation("Update comment")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping
    public AppResponse<CommentDto> update(@RequestBody CommentUpdateDto commentUpdateDto) throws CommentNotFoundException {
        return new AppResponse<>(commentService.update(commentUpdateDto));
    }

    @ApiOperation("Delete comment")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        commentService.delete(id);
    }
}
