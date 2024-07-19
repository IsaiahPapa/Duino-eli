import React from "react";

const Graph: React.FC = () => {
    return (
        <section className="flex flex-col grow justify-center self-stretch text-white max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col items-end pt-6 pr-7 pb-4 pl-20 text-5xl bg-neutral-800 rounded-[32px] max-md:px-5 max-md:max-w-full max-md:text-4xl">
                
                <h2 className="mt-16 max-md:mt-10 max-md:text-4xl">Graph Library</h2>
                <div className="shrink-0 self-center mt-24 h-1.5 rounded-3xl bg-neutral-400 w-[146px] max-md:mt-10" />
            </div>
        </section>
    );
};

export default Graph;
