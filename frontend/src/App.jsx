import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  const API_URL =
    import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);

    setMessage("");

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            messages:
              updatedMessages,
          }),
        }
      );

      const data =
        await response.json();

      const assistantMessage = {
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Unable to connect to server.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Assistant</h1>

      <div
        className="chat-container"
        ref={chatRef}
      >
        {messages.map(
          (msg, index) => (
            <div
              key={index}
              className={msg.role}
            >
              <ReactMarkdown
                remarkPlugins={[
                  remarkGfm,
                ]}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          )
        )}

        {loading && (
          <div className="assistant">
            Thinking...
          </div>
        )}
      </div>

      <div className="input-container">
        <textarea
          value={message}
          placeholder="Ask anything..."
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;