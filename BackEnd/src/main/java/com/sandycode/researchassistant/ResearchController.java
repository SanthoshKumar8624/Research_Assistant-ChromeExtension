package com.sandycode.researchassistant;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/research")
@CrossOrigin(origins = "*")//Allows all endpoints from frontend to access this controller
@AllArgsConstructor
public class ResearchController
{
    private ResearchService researchService;

    @PostMapping("/process")
    public ResponseEntity<String>processContent(@RequestBody ResearchRequest request)
    {
        String result = researchService.processContent(request);
        return ResponseEntity.ok(result);
    }
}

