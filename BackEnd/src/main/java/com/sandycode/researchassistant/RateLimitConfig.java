//This creates a token bucket.
//
//        Behavior:
//
//        10 tokens → available
//        Each request → consumes 1 token
//        After 10 → blocked
//        Reset after 1 minute
package com.sandycode.researchassistant;
import io.github.bucket4j.*;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class RateLimitConfig {

    private final Bucket bucket;

    public RateLimitConfig() {

        Bandwidth limit = Bandwidth.simple(10, Duration.ofMinutes(1));

        this.bucket = Bucket.builder()
                .addLimit(limit)
                .build();
    }

    public boolean tryConsume() {
        return bucket.tryConsume(1);
    }
}