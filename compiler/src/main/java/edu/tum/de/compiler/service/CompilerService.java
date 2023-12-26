package edu.tum.de.compiler.service;

import edu.tum.de.compiler.controller.CCompiler;
import edu.tum.de.compiler.controller.ICompiler;
import edu.tum.de.compiler.controller.MyJavaCompiler;
import edu.tum.de.compiler.model.SourceCode;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CompilerService {
    private final Map<String, ICompiler> compilers;

    public CompilerService() {
        compilers = new HashMap<>();
        // Register available compilers
        registerCompiler("java", new MyJavaCompiler());
        registerCompiler("c", new CCompiler());
        // Add more compilers as needed
    }

    public void registerCompiler(String language, ICompiler compiler) {
        compilers.put(language, compiler);
    }

    public SourceCode compile(SourceCode sourceCode, String language) {
        ICompiler compiler = compilers.get(language.toLowerCase());
        if (compiler == null) {
            throw new IllegalArgumentException("Compiler not found for language: " + language);
        }

        sourceCode = compiler.compile(sourceCode);

        return sourceCode;
    }

    public static void main(String[] args) {
        CompilerService compilerService = new CompilerService();
        SourceCode sourceCodeJava = new SourceCode("HelloWorld", "public class HelloWorld { public static void main(String[] args) { System.out.println(\"Hello, World!\"); }}");
        SourceCode sourceCodeC = new SourceCode("my_c_file","#include <stdio.h>\nint main() { printf(\"Hello, World!\\n\"); return 0; }");

        // Compile Java code
        SourceCode compiledCodeJava = compilerService.compile(sourceCodeJava, "java");
        System.out.println("Java Compilation Result: \n" + compiledCodeJava.toString());

        // Compile C code
        SourceCode compiledCodeC = compilerService.compile(sourceCodeC, "c");
        System.out.println("C Compilation Result:\n " + compiledCodeC.toString());
    }
}


