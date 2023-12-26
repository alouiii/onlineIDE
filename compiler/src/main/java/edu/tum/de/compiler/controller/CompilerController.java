package edu.tum.de.compiler.controller;
import edu.tum.de.compiler.model.SourceCode;
import edu.tum.de.compiler.service.CompilerService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/compiler")
public class CompilerController {

    private final CompilerService compilerService;

    @Autowired
    public CompilerController(CompilerService compilerService) {
        this.compilerService = compilerService;
    }

    @PostMapping("/compile")
    public SourceCode compile(@RequestParam String language, @RequestBody SourceCode sourceCode) {
        return compilerService.compile(sourceCode, language);
    }
}


