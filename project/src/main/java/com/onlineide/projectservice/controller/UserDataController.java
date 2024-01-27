import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.onlineide.projectservice.service.OAuthService;
import org.springframework.web.bind.annotation.RequestBody;


import java.security.Principal;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class UserDataController {

    @Autowired
    private OAuthService oAuthService;

    @GetMapping("/user")
    public Principal user(Principal principal) {
        return principal;
    }

    @PostMapping("/exchange-code")
    public ResponseEntity<?> exchangeCodeForToken(@RequestBody String code) {
        String jwt = oAuthService.exchangeCodeForToken(code);
        return ResponseEntity.ok(jwt);
    }
}
