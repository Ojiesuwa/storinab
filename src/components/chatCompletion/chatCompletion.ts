type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ChatResponse = {
  choices: { message: ChatMessage }[];
};

const fetchChatCompletion = (
  userString: string,
  systemString: string
): Promise<ChatMessage> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`, // Ensure your API key is set in environment variables
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: systemString,
              },
              {
                role: "user",
                content: userString,
              },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 1,
            max_completion_tokens: 1024,
            top_p: 1,
            stream: false,
            response_format: {
              type: "json_object",
            },
            stop: null,
          }),
        }
      );

      const data: ChatResponse = await response.json();
      const choice =
        data.choices && data.choices.length > 0
          ? data.choices[0].message
          : { role: "assistant", content: "" };
      resolve(JSON.parse(choice.content));
    } catch (error) {
      reject(error);
    }
  });
};

export default fetchChatCompletion;
