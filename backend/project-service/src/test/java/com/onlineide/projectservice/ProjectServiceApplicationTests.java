package com.onlineide.projectservice;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class ProjectServiceApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
    public void testDummy() {

        // Given
        int x = 1;
        
        // Then
        assertEquals(x, 1);
    }

}
