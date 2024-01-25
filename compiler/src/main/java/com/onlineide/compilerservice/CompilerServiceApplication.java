package com.onlineide.compilerservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEurekaClient
public class CompilerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CompilerServiceApplication.class, args);
	}

}
