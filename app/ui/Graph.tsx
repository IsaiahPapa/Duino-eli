"use client";
import React from "react";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useArduinoContext } from "./ArduinoProvider";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph: React.FC = () => {
    const { data } = useArduinoContext(); // Assuming `data` is exposed from your context

    const chartData = {
        labels: data.map((_, index) => index),
        datasets: [
            {
                label: "Serial Data",
                data: data,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };
    return (
        <div className="relative flex flex-col items-center justify-center text-5xl bg-[#1e1e1e] rounded-[32px] w-full h-[275px] p-4">
            {/* <h2 className="text-4xl text-white">Graph Library</h2> */}
            {/* <div className="absolute bottom-4 shrink-0 self-center h-1.5 rounded-3xl bg-neutral-400 w-[146px] max-md:mt-10" /> */}
            <Line
                data={chartData}
                options={{
                    scales: {
                        x: {
                            type: "linear",
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    animations: {
                        tension: {
                            duration: 2000,
                            easing: "linear",
                            from: 1,
                            to: 0,
                            loop: true,
                        },
                    },
                }}
            />
        </div>
    );
};

export default Graph;
