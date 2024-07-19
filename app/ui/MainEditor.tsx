"use client";
import React, { useEffect, useRef, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import init, { format } from "@wasm-fmt/clang-format";
import { useEditorContext } from "./EditorProvider";

const OnLoadCode = `/*
  Blink

  Turns an LED on for one second, then off for one second, repeatedly.
*/

// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
  delay(1000);                      // wait for a second
  digitalWrite(LED_BUILTIN, LOW);   // turn the LED off by making the voltage LOW
  delay(1000);                      // wait for a second
}
`;

interface EditorButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const EditorButton: React.FC<EditorButtonProps> = ({ children, ...props }) => (
    <button className="justify-center px-4 py-2 rounded-lg bg-neutral-700" {...props}>
        {children}
    </button>
);

const MainEditor: React.FC = () => {
    const { formatCode, editor, setEditor } = useEditorContext();

    return (
        <main className="flex flex-col w-[56%] max-md:w-full">
            <div className="flex flex-col grow justify-center self-stretch w-full text-white bg-[#1e1e1e] rounded-[16px] h-full overflow-hidden">
                <div className="flex relative flex-col w-full h-full">
                    <div className="flex relative gap-2.5 p-2.5 text-base whitespace-nowrap max-md:flex-wrap max-md:pl-5 self-end">
                        <EditorButton onClick={() => {}}>Compile</EditorButton>
                        <EditorButton onClick={() => {}}>Upload</EditorButton>
                        <EditorButton onClick={() => {
                            console.log(editor?.getValue())
                        }}>test</EditorButton>
                        <EditorButton
                            onClick={() => {
                                formatCode();
                            }}
                        >
                            Format
                        </EditorButton>
                    </div>
                    <Editor
                        onMount={(editor, monaco) => {
                            setEditor(editor);
                            // setMonaco(monaco);
                        }}
                        defaultValue={OnLoadCode}
                        defaultLanguage="cpp"
                        theme="vs-dark"
                    />
                </div>
            </div>
        </main>
    );
};

export default MainEditor;
