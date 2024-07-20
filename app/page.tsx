import React from "react";
import SerialMonitor from "./ui/SerialMonitor";
import MainEditor from "./ui/MainEditor";
import Graph from "./ui/Graph";
import Chat from "./ui/Chat";
import { EditorProvider } from "./ui/EditorProvider";
import { ArduinoProvider } from "./ui/ArduinoProvider";
import ArduinoConnect from "./ui/ArduinoConnect";

const ArduinoIDE: React.FC = () => {
    return (
        <div className="flex flex-col justify-center bg-neutral-900 w-screen h-screen">
            <div className="p-8 w-full h-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 h-full overflow-hidden">
                    <ArduinoProvider>
                        <EditorProvider>
                            <SerialMonitor />
                            <MainEditor />
                            <div className="flex flex-col w-[29%] max-md:w-full h-full gap-4">
                                <Graph />
                                <ArduinoConnect/>
                                <Chat />
                            </div>
                        </EditorProvider>
                    </ArduinoProvider>
                </div>
            </div>
        </div>
    );
};

export default ArduinoIDE;
