package edu.tum.de.compiler.model;

public class SourceCode {
    private String code;
    private String fileName;
    private String stdout;
    private String stderr;
    private boolean compilable = false;

    public SourceCode(String fileName, String code) {
        this.fileName = fileName;
        this.code = code;
    }

    @Override
    public String toString() {
        return "SourceCode{" +
                "code='" + code + '\'' +
                ", fileName='" + fileName + '\'' +
                ", stdout='" + stdout + '\'' +
                ", stderr='" + stderr + '\'' +
                ", compilable=" + compilable +
                '}';
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getStdout() {
        return stdout;
    }

    public void setStdout(String stdout) {
        this.stdout = stdout;
    }

    public String getStderr() {
        return stderr;
    }

    public void setStderr(String stderr) {
        this.stderr = stderr;
    }

    public boolean isCompilable() {
        return compilable;
    }

    public void setCompilable(boolean compilable) {
        this.compilable = compilable;
    }
}
