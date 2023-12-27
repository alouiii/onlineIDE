package edu.tum.de.compiler.controller;

import edu.tum.de.compiler.model.SourceCode;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class MyCCompiler implements ICompiler {

    /**
     * Implementation of the compile method from the ICompiler interface.
     *
     * @param sourceCode The source code to be compiled.
     * @return The SourceCode object with compilation results.
     */
    @Override
    public SourceCode compile(SourceCode sourceCode) {
        try {
            // Prepare the compiler command
            Process process = getProcess();

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

            // Delete the generated .o file
            File outputFile = new File( "-.o");
            if (outputFile.exists()) {
                boolean deleted = outputFile.delete();
                if (!deleted) {
                    System.err.println("Failed to delete the .o file");
                }
            }

        } catch (IOException | InterruptedException e) {
            e.printStackTrace(); // Handle exceptions appropriately
            sourceCode.setStderr("Error during compilation: " + e.getMessage());
        }

        return sourceCode;
    }

    /**
     * Creates and returns a new Process instance for the GCC compiler with the specified options.
     *
     * @return The Process instance for the GCC compiler.
     * @throws IOException If an I/O error occurs while starting the process.
     */
    private static Process getProcess() throws IOException {
        // Specify the path to the GCC compiler executable
        String compilerCommand = "C:\\MinGW\\bin\\gcc.exe"; // Change this to the compiler path

        // Specify the compiler options
        String outputOption = "-c"; // Compile but do not link

        // Start the compiler process using ProcessBuilder
        ProcessBuilder processBuilder = new ProcessBuilder(Arrays.asList(
                compilerCommand,
                outputOption,
                "-x", "c", // Specify language as C
                "-" // Read from standard input
        ));

        // Return the newly created Process instance
        return processBuilder.start();
    }
}
