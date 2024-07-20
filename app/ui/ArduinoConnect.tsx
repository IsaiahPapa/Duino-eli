"use client";
import React, { useState, useEffect } from "react";
import { useArduinoContext } from "./ArduinoProvider";

const ArduinoConnect: React.FC = () => {
    const { connectArduino, disconnectArduino, port } = useArduinoContext();

    return (
        <div className="relative flex flex-col items-center text-white justify-center bg-[#1e1e1e] rounded-[32px] w-full p-4">
            {port ? <div>Arduino Connected!</div> : <>No Arduino Connected</>}
            <button onClick={connectArduino} disabled={!!port}>
                Connect Port
            </button>
            <button onClick={disconnectArduino} disabled={!port}>
                Disconnect
            </button>
        </div>
    );
};

export default ArduinoConnect;
