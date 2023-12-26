package edu.tum.de.compiler.controller;

import edu.tum.de.compiler.model.SourceCode;

public interface ICompiler {
    SourceCode compile(SourceCode code);
}
