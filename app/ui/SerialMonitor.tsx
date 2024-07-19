import React from "react";

interface ButtonProps {
    text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => (
    <div className="justify-center px-4 py-2 rounded-lg bg-neutral-700">{text}</div>
);

const SerialMonitor: React.FC = () => {
    const numbers = [
        327.18, 314.65, 312.58, 261.88, 202.75, 149.87, 111.8, 82.85, 60.37, 45.32, 31.8, 22.23, 16.23, 12.48,
        8.82, 6.15, 4.57, 2.7, 1.77, 1.25, 0.85, 0.43, -0.02, -0.55, -0.8, -0.8, -1.02, -1.53, -1.83, -2.23,
        -2.7, -2.57, -2.38, -2.62, -2.63, -2.53, -2.48, -2.28, -2.0, -3.6, -3.47, -1.65, 0.08, 2.52, 7.68,
        10.48, 11.3, 10.75, 8.17,
    ];

    return (
        <aside className="flex flex-col w-[15%] max-md:w-full">
            <div className="flex flex-col grow self-stretch mx-auto w-full text-white bg-neutral-800 rounded-[16px] max-md:px-5 max-md:mt-10 h-full">
                <div className="flex gap-2.5 justify-between text-base whitespace-nowrap p-2.5">
                    <Button text="Clear" />
                    <Button text="Copy" />
                </div>
                <div className="text-3xl overflow-y-auto px-8">
                    {numbers.map((number, index) => (
                        <React.Fragment key={index}>
                            {number}
                            <br />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default SerialMonitor;
