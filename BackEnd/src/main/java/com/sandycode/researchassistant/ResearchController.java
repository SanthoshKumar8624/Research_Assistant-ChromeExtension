package com.sandycode.researchassistant;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/research")
@CrossOrigin(origins = "*")//Allows all endpoints from frontend to access this controller
@AllArgsConstructor
public class ResearchController {

    private ResearchService researchService;
    private RateLimitConfig rateLimitConfig;

    @GetMapping("/")
    public String home() {
        return "Research Assistant API is running successfully ;)";
    }

    @PostMapping("/process")
    public ResponseEntity<String> processContent(@RequestBody ResearchRequest request) {

        if (!rateLimitConfig.tryConsume()) {
            return ResponseEntity
                    .status(429)
                    .body("Too many requests. Please wait a moment.");
        }

        String result = researchService.processContent(request);

        return ResponseEntity.ok(result);
    }
}

