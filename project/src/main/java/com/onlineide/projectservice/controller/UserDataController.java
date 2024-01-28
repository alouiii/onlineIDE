import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.onlineide.projectservice.service.OAuthService;
import org.springframework.web.bind.annotation.RequestBody;


import java.security.Principal;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/api")
public class UserDataController {

    @Autowired
    private OAuthService oAuthService;

    @GetMapping("/user")
    public Principal user(Principal principal) {
        return principal;
    }

    @PostMapping("/exchange-code")
    public ResponseEntity<?> exchangeCodeForToken(@RequestBody TokenExchangeRequest request) {
        String jwt = oAuthService.exchangeCodeForToken(request.getCode(), request.getState());
        return ResponseEntity.ok(jwt);
    }
}
