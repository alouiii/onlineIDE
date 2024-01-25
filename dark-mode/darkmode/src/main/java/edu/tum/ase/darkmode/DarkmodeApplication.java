package edu.tum.ase.darkmode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.concurrent.TimeUnit;

@SpringBootApplication
@EnableEurekaClient
@RestController
public class DarkmodeApplication {
	private boolean isDarkModeEnabled = false;
	private long lastToggleTime = 0;
	private static final long COOLDOWN_TIME = TimeUnit.SECONDS.toMillis(3);


	public static void main(String[] args) {
		SpringApplication.run(DarkmodeApplication.class, args);
	}

	@RequestMapping(path = "/dark-mode/toggle", method = RequestMethod.GET)
	public void toggleDarkMode() {
		long currentTime = System.currentTimeMillis();

		// Check if the cool-down time has passed
		if (currentTime - lastToggleTime > COOLDOWN_TIME) {
			// Toggle the dark mode status
			isDarkModeEnabled = !isDarkModeEnabled;
			System.out.println("Dark mode toggled. Current status: " + (isDarkModeEnabled ? "enabled" : "disabled"));

			// Update the last toggle time
			lastToggleTime = currentTime;
		} else {
			System.out.println("Cooldown period. Dark mode not toggled.");
		}
	}

	@RequestMapping(path = "/dark-mode", method = RequestMethod.GET)
	public boolean getDarkModeStatus(){
		return isDarkModeEnabled;
	}
}
