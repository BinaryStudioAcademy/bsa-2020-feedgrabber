package com.feed_grabber.core.user;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.response.AppResponse;
import com.feed_grabber.core.response.DataList;
import com.feed_grabber.core.user.dto.ResetPassDto;
import com.feed_grabber.core.user.dto.UserDetailsResponseDTO;
import com.feed_grabber.core.user.dto.UserInfoToResetPassDto;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;



@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "Get details from one user",
    notes = "You should not to provide an id, it will be got from token service")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<UserDetailsResponseDTO> getUserDetails() {
        var id = TokenService.getUserId();
        return new AppResponse<>(userService.getUserDetails(id).orElseThrow());
    }

    @ApiOperation(value = "Send an email to reset password")
    @PostMapping("/email/reset")
    public void sendEmailToResetPass(@RequestBody UserInfoToResetPassDto dto) {
        System.out.println(dto);
        // TODO: Send email
    }

    @ApiOperation(value = "Reset password")
    @PostMapping("/reset")
    public void resetPassword(@RequestBody ResetPassDto dto) {
        System.out.println("dto = " + dto);
    }


    @GetMapping("/all")
    public AppResponse<DataList<UserDetailsResponseDTO>> getUsersByCompanyId (
            @RequestParam Integer page,
            @RequestParam Integer size
    ) {
        var companyId = TokenService.getCompanyId();
        return new AppResponse<>(
                new DataList<>(
                        userService.getAllByCompanyId(companyId, page, size),
                        userService.getCountByCompanyId(companyId),
                        page,
                        size
                ));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("{id}/removeCompany")
    public void removeUserFromCompany (@PathVariable UUID id) {
        userService.removeCompany(id);
    }

}
