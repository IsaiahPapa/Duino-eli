"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import init, { format as wasmFormat } from "@wasm-fmt/clang-format";
import { editor as MonacoEditor } from "monaco-editor";

interface EditorContextType {
    editor: MonacoEditor.IStandaloneCodeEditor | null;
    setEditor: (editor: MonacoEditor.IStandaloneCodeEditor | null) => void;
    formatCode: () => void;
    isWasmReady: boolean;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

interface EditorProviderProps {
    children: ReactNode;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
    const [editor, setEditor] = useState<MonacoEditor.IStandaloneCodeEditor | null>(null);
    const [isWasmReady, setIsWasmReady] = useState(false);

    useEffect(() => {
        init().then(() => setIsWasmReady(true));
    }, []);

    const formatCode = () => {
        if (editor && isWasmReady) {
            const unformattedCode = editor.getValue();
            const config = JSON.stringify({
                BasedOnStyle: "Google",
                IndentWidth: 4,
                ColumnLimit: 80,
            });
            const formattedCode = wasmFormat(unformattedCode, "arduino.cc", config);
            editor.setValue(formattedCode);
        }
    };

    const value = {
        editor,
        setEditor,
        formatCode,
        isWasmReady,
    };

    return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (context === undefined) {
        throw new Error("useEditorContext must be used within an EditorProvider");
    }
    return context;
};
