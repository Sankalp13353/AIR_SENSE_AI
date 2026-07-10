import { useState, useEffect, useRef } from "react";
import { chatWithAI } from "../api/predictionService";
import "../styles/advisoryBot.css";

function AdvisoryBot({ prediction }) {
  const messagesEndRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const getCurrentTimeStr = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "👋 Hi! I'm AirSense AI, your personal air quality assistant.\n\nI can help you understand health risks and recommendations based on current AQI. Try asking:\n\n• 😷 *Should I wear a mask today?*\n• 🏃 *Can I go for a jog outside?*\n• 👶 *Is it safe for children to play in the park?*\n• 👵 *What precautions should elderly people take?*",
      time: getCurrentTimeStr(),
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ===========================
  // GROQ AI
  // ===========================

  const getAIResponse = async (question) => {
    if (!prediction) {
      return "Please predict AQI first.";
    }

    try {
      const response = await chatWithAI({
        city: prediction.city,
        aqi: prediction.predicted_aqi,
        category: prediction.category,
        health_advisory: prediction.health_advisory,
        question,
      });

      return response.answer;
    } catch (error) {
      console.error(error);
      return "⚠️ Unable to connect to AirSense AI.";
    }
  };

  // ===========================
  // ASK QUESTION
  // ===========================

  const askQuestion = async (question) => {
    if (!prediction) {
      alert("Please predict AQI first.");
      return;
    }

    const userMessage = {
      sender: "user",
      text: question,
      time: getCurrentTimeStr(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const aiReply = await getAIResponse(question);

    setLoading(false);

    const botMessage = {
      sender: "bot",
      text: aiReply,
      time: getCurrentTimeStr(),
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  // ===========================
  // ONBOARDING HANDLER
  // ===========================

  const handleOnboardingQuestion = async (question) => {
    setShowTooltip(false);
    setIsOpen(true);
    setTimeout(() => {
      askQuestion(question);
    }, 450); // wait for card slide in animation
  };

  // ===========================
  // SEND MESSAGE
  // ===========================

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!prediction) {
      alert("Please predict AQI first.");
      return;
    }

    const question = input;
    setInput("");
    await askQuestion(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <>
        {showTooltip && (
          <div className="bot-onboarding-tooltip">
            <button
              className="close-tooltip-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              title="Dismiss helper"
            >
              &times;
            </button>
            <div className="tooltip-header">
              🤖 <span>Ask AirSense AI!</span>
            </div>
            <p className="tooltip-text">
              Interpret today's AQI and ask health advisories, exercise safety, and mask recommendations. Click to ask:
            </p>
            <div className="tooltip-sample-questions">
              <button onClick={() => handleOnboardingQuestion("Should I wear a mask today?")}>
                😷 Wear a mask today?
              </button>
              <button onClick={() => handleOnboardingQuestion("Is outdoor exercise safe?")}>
                🏃 Outdoor exercise safe?
              </button>
            </div>
          </div>
        )}
        <button
          className="bot-toggle-btn"
          onClick={() => {
            setIsOpen(true);
            setShowTooltip(false);
          }}
          title="Open AirSense AI Assistant"
        >
          <span className="bot-notification-dot"></span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <circle cx="12" cy="5" r="2"></circle>
            <path d="M12 7v4"></path>
            <line x1="8" y1="16" x2="8" y2="16"></line>
            <line x1="16" y1="16" x2="16" y2="16"></line>
          </svg>
        </button>
      </>
    );
  }

  return (
    <>
      <div id="bot-section" className="card bot-card bot-popup-card">
        <div className="bot-header">
          <div className="bot-title-group">
            <div className="card-title-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="title-icon-svg"
              >
                <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                <circle cx="12" cy="5" r="2"></circle>
                <path d="M12 7v4"></path>
                <line x1="8" y1="16" x2="8" y2="16"></line>
                <line x1="16" y1="16" x2="16" y2="16"></line>
              </svg>
            </div>

            <h2>AirSense AI Assistant</h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-text">
                {loading ? "Thinking..." : "Online"}
              </span>
            </div>
            <button
              className="close-bot-btn"
              onClick={() => setIsOpen(false)}
              title="Close Assistant"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-light)",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "16px", height: "16px" }}
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-row ${msg.sender}`}
            >
              {msg.sender === "bot" && (
                <div className="bot-msg-avatar">
                  🤖
                </div>
              )}

              <div className="message-bubble-wrapper">
                <div className="message-bubble">
                  {msg.text}
                </div>

                <div className="message-time">
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message-row bot">
              <div className="bot-msg-avatar">
                🤖
              </div>

              <div className="message-bubble-wrapper">
                <div className="message-bubble">
                  AirSense AI is thinking...
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        {/* Quick Prompt Buttons */}
        <div className="quick-prompts-row">
          <button
            className="prompt-chip"
            onClick={() => askQuestion("Should I wear a mask?")}
          >
            😷 Wear Mask?
          </button>

          <button
            className="prompt-chip"
            onClick={() => askQuestion("Can I exercise today?")}
          >
            🏃 Exercise
          </button>

          <button
            className="prompt-chip"
            onClick={() =>
              askQuestion("Is it safe to go outside today?")
            }
          >
            🌳 Outdoor Activities
          </button>

          <button
            className="prompt-chip"
            onClick={() =>
              askQuestion("Can children play outside?")
            }
          >
            👶 Children Safety
          </button>
        </div>

        {/* Chat Input */}
        <div className="chat-input-bar">
          <input
            type="text"
            value={input}
            placeholder="Ask anything about today's air quality..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button
            className="chat-send-btn"
            onClick={sendMessage}
            disabled={loading}
          >
            <svg
              className="send-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line
                x1="22"
                y1="2"
                x2="11"
                y2="13"
              ></line>

              <polygon
                points="22 2 15 22 11 13 2 9 22 2"
              ></polygon>
            </svg>
          </button>
        </div>
      </div>

      <button
        className="bot-toggle-btn active"
        onClick={() => setIsOpen(false)}
        title="Close AirSense AI Assistant"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </>
  );
}

export default AdvisoryBot;