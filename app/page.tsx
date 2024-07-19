import React from "react";
import SerialMonitor from "./ui/SerialMonitor";
import MainEditor from "./ui/MainEditor";
import Graph from "./ui/Graph";
import Chat from "./ui/Chat";
import { EditorProvider } from "./ui/EditorProvider";

const ArduinoIDE: React.FC = () => {
    return (
        <div className="flex flex-col justify-center bg-white w-screen h-screen">
            <div className="p-8 w-full h-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 h-full overflow-hidden">
                    <EditorProvider>
                        <SerialMonitor />
                        <MainEditor />
                        <div className="flex flex-col w-[29%] max-md:w-full h-full">
                            <Graph />
                            <Chat />
                        </div>
                    </EditorProvider>
                </div>
            </div>
        </div>
    );
};

export default ArduinoIDE;
