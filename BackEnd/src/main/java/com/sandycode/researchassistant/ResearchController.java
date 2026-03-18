package com.sandycode.researchassistant;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/research")
@CrossOrigin(origins = "chrome-extension://ekjbogdopclpngafjlihedmnhjekonem")// Allow requests from the Chrome extension before it was *
@AllArgsConstructor
public class ResearchController {

    private ResearchService researchService;
    private RateLimitConfig rateLimitConfig;

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

