"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ArduinoContextType {
    data: number[];
    clearData: () => void;
}

const ArduinoContext = createContext<ArduinoContextType | undefined>(undefined);

interface ArduinoProviderProps {
    children: ReactNode;
}

export const ArduinoProvider: React.FC<ArduinoProviderProps> = ({ children }) => {
    const [data, setData] = useState<number[]>([]);
    const maxDataPoints = 100;
    const frequency = 0.1;
    let x = 0; // Represents the time variable in the wave equation

    // Function to generate sine wave data
    const generateData = () => {
        x += frequency; // Increment x to move along the x-axis
        return Math.sin(x); // Generate sine wave data
    };

    // Function to simulate data stream
    useEffect(() => {
        const interval = setInterval(() => {
            setData((prevData) => {
                const newData = [...prevData, generateData()];
                return newData.length > maxDataPoints
                    ? newData.slice(newData.length - maxDataPoints)
                    : newData;
            });
        }, 100); // Simulate new data every 100 ms

        return () => clearInterval(interval);
    }, []);

    // Function to clear data
    const clearData = () => {
        setData([]);
        x = 0; // Reset the time variable
    };

    return <ArduinoContext.Provider value={{ data, clearData }}>{children}</ArduinoContext.Provider>;
};

// Custom hook to use the Arduino context
export const useArduinoContext = () => {
    const context = useContext(ArduinoContext);
    if (context === undefined) {
        throw new Error("useArduinoContext must be used within an ArduinoProvider");
    }
    return context;
};
