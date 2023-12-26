package edu.tum.de.compiler.controller;

import edu.tum.de.compiler.model.SourceCode;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class CCompiler implements ICompiler {

    /**
     * Implementation of the compile method from the ICompiler interface.
     *
     * @param sourceCode The source code to be compiled.
     * @return The SourceCode object with compilation results.
     */
    @Override
    public SourceCode compile(SourceCode sourceCode) {
        try {
            // Prepare the compiler command (replace with the actual path to GCC)
            String compilerCommand = "gcc";
            String outputOption = "-o";
            String outputFileName = "output";

            // Start the compiler process using ProcessBuilder
            ProcessBuilder processBuilder = new ProcessBuilder(Arrays.asList(
                    compilerCommand,
                    outputOption,
                    outputFileName,
                    "-x",
                    "c",
                    "-"
            ));

            Process process = processBuilder.start();

            // Write the code to the standard input of the compiler process
            try (OutputStream writer = process.getOutputStream()) {
                writer.write(sourceCode.getCode().getBytes(StandardCharsets.UTF_8));
            }

            // Wait for the process to complete
            int exitCode = process.waitFor();

            // Collect standard output and standard error streams
            String stdOutput = Utilities.readStream(process.getInputStream());
            String stdError = Utilities.readStream(process.getErrorStream());

            // Update the source code with compilation results
            sourceCode.setStdout(stdOutput);
            sourceCode.setStderr(stdError);
            sourceCode.setCompilable(exitCode == 0);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace(); // Handle exceptions appropriately
            sourceCode.setStderr("Error during compilation: " + e.getMessage());
        }

        return sourceCode;
    }
}
