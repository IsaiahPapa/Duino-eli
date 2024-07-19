import React from "react";
import OpenAIAssistant from "./openai-assistant";

const Chat: React.FC = () => {
    return (
        <section className="flex flex-col justify-end gap-4 p-4 mt-8 bg-neutral-800 rounded-[32px] max-md:max-w-full h-full overflow-y-auto">
            <OpenAIAssistant
                assistantId="asst_MHugVO4TsJwD8VXK1tyPTZTH"
                greeting="I am a helpful chat assistant. How can I help you?"
            />

        </section>
    );
};

export default Chat;
