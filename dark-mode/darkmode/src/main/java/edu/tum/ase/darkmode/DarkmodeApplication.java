package edu.tum.ase.darkmode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
public class DarkmodeApplication {

	private boolean isDarkModeOn = false;
    private long lastToggleTime = System.currentTimeMillis();
    private static final long COOLDOWN_TIME = 3000;

	public static void main(String[] args) {
		SpringApplication.run(DarkmodeApplication.class, args);
	}

	@RequestMapping(path = "/dark-mode/toggle", method = RequestMethod.GET)
	public void toggleDarkMode() {
        long currentTime = System.currentTimeMillis();
        if (currentTime - lastToggleTime >= COOLDOWN_TIME) {
            isDarkModeOn = !isDarkModeOn;
            lastToggleTime = currentTime;
            System.out.println("Toggled dark mode. Current status: " + isDarkModeOn);
        } else {
            System.out.println("Cooldown active. Cannot toggle dark mode.");
        }
    }

	@RequestMapping(path = "/dark-mode", method = RequestMethod.GET)
    public boolean getDarkModeStatus() {
        return isDarkModeOn;
    }

}
