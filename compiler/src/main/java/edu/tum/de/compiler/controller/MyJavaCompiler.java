package edu.tum.de.compiler.controller;

import edu.tum.de.compiler.model.SourceCode;

import javax.tools.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * MyJavaCompiler class implements the ICompiler interface.
 */
public class MyJavaCompiler implements ICompiler {

    /**
     * Implementation of the compile method from the ICompiler interface.
     *
     * @param sourceCode The source code to be compiled.
     * @return The SourceCode object with compilation results.
     */
    @Override
    public SourceCode compile(SourceCode sourceCode) {
        try {
            // Get the system Java compiler
            JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
            if (compiler == null) {
                // If the compiler is not found, set an error message
                sourceCode.setStderr("Java Compiler not found");
                return sourceCode;
            }

            // Create an instance of DiagnosticCollector to collect compilation diagnostics
            DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<>();

            // Create a new in-memory Java source file
            JavaFileObject javaFileObject = new StringJavaFileObject(sourceCode.getFileName(), sourceCode.getCode());

            // Create a new in-memory Java class file for compilation result
            JavaFileObject classFileObject = new ByteJavaFileObject(sourceCode.getFileName(), JavaFileObject.Kind.CLASS);

            // Prepare a compilation task
            JavaCompiler.CompilationTask task = compiler.getTask(
                    null,
                    null,
                    diagnostics,
                    null,
                    null,
                    Arrays.asList(javaFileObject)
            );

            // Perform the compilation
            boolean success = task.call();

            // Collect compilation diagnostics
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            try (ByteArrayOutputStream stderrStream = new ByteArrayOutputStream()) {
                diagnostics.getDiagnostics().forEach(diagnostic -> {
                    try {
                        // Write compilation errors to the stream
                        stderrStream.write(("Error on line " + diagnostic.getLineNumber() + ": " + diagnostic.getMessage(null) + "\n").getBytes(StandardCharsets.UTF_8));
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                });
                baos.write(stderrStream.toByteArray());
            } catch (IOException e) {
                e.printStackTrace();
            }

            // Update the source code with compilation results
            sourceCode.setStdout(success ? "Compilation successful" : "");
            sourceCode.setStderr(baos.toString());
            sourceCode.setCompilable(success);

        } catch (Exception e) {
            // Handle exceptions appropriately and set an error message
            e.printStackTrace();
            sourceCode.setStderr("Error during compilation: " + e.getMessage());
        }

        return sourceCode;
    }

    /**
     * StringJavaFileObject is a SimpleJavaFileObject implementation for in-memory Java source files.
     */
    private static class StringJavaFileObject extends SimpleJavaFileObject {
        final String code;
        final String fileName;

        StringJavaFileObject(String name, String code) {
            super(URI.create("string:///" + name.replace('.', '/') + Kind.SOURCE.extension), Kind.SOURCE);
            this.code = code;
            this.fileName = name + ".java"; // Update the file name
        }

        @Override
        public CharSequence getCharContent(boolean ignoreEncodingErrors) {
            return code;
        }

        @Override
        public String getName() {
            return fileName;
        }
    }

    /**
     * ByteJavaFileObject is a SimpleJavaFileObject implementation for in-memory Java class files.
     */
    private static class ByteJavaFileObject extends SimpleJavaFileObject {
        private final ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        ByteJavaFileObject(String name, Kind kind) {
            super(URI.create("byte:///" + name.replace('.', '/') + kind.extension), kind);
        }

        @Override
        public OutputStream openOutputStream() throws IOException {
            return outputStream;
        }

        public byte[] getBytes() {
            return outputStream.toByteArray();
        }
    }
}