import { useState, useEffect, useRef } from "react";
import "../styles/advisoryBot.css";

function AdvisoryBot({ prediction }) {
  const messagesEndRef = useRef(null);
  
  const getCurrentTimeStr = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm AirSense AI.\nAsk me anything about air quality, health risks, masks, outdoor activities & more.",
      time: "10:30 AM"
    },
  ]);

  const [input, setInput] = useState("");

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAdvice = (question) => {
    if (!prediction) {
      return "Please calculate the AQI prediction first.";
    }

    const q = question.toLowerCase();
    const aqi = prediction.predicted_aqi;
    const cat = prediction.category || "Moderate";

    if (q.includes("mask")) {
      if (aqi > 150)
        return `Yes. Wearing an N95 mask is strongly recommended because the AQI is ${aqi.toFixed(0)} (${cat}).`;
      if (aqi > 100)
        return `A mask is recommended if you're outdoors for long periods because the AQI is ${aqi.toFixed(0)} (${cat}).`;
      return "A mask is generally not necessary. The air quality is currently safe.";
    }

    if (
      q.includes("outside") ||
      q.includes("go out") ||
      q.includes("outdoor")
    ) {
      if (aqi > 200)
        return `🚫 Avoid going outside unless absolutely necessary. The air is highly polluted (${cat}).`;
      if (aqi > 100)
        return `⚠️ Limit prolonged outdoor exposure. Sensitive groups should stay indoors if possible.`;
      return `🌳 It is safe to go outside. Enjoy the clean air today!`;
    }

    if (
      q.includes("exercise") ||
      q.includes("run") ||
      q.includes("jog")
    ) {
      if (aqi > 150)
        return `🏃 Avoid outdoor exercise today. Consider indoor alternatives instead.`;
      if (aqi > 80)
        return `🏃 Light exercise is okay, but avoid strenuous activities outside.`;
      return `✅ Outdoor exercise is completely safe. Have a great workout!`;
    }

    if (
      q.includes("children") ||
      q.includes("kids") ||
      q.includes("child") ||
      q.includes("safety")
    ) {
      if (aqi > 100)
        return `👶 Children and the elderly should limit outdoor activities today.`;
      return `👶 Children can safely play outside.`;
    }

    return prediction.health_advisory || "I'm here to help! Ask me about masks, outdoor safety, children safety, or exercise.";
  };

  const askQuestion = (question) => {
    if (!prediction) {
      alert("Please predict AQI first.");
      return;
    }

    const userMessage = {
      sender: "user",
      text: question,
      time: getCurrentTimeStr()
    };

    const botMessage = {
      sender: "bot",
      text: getAdvice(question),
      time: getCurrentTimeStr()
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    if (!prediction) {
      alert("Please predict AQI first.");
      return;
    }

    const userMessage = {
      sender: "user",
      text: input,
      time: getCurrentTimeStr()
    };

    const botMessage = {
      sender: "bot",
      text: getAdvice(input),
      time: getCurrentTimeStr()
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div id="bot-section" className="card bot-card">
      <div className="bot-header">
        <div className="bot-title-group">
          <div className="card-title-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="title-icon-svg">
              <rect x="3" y="11" width="18" height="10" rx="2"></rect>
              <circle cx="12" cy="5" r="2"></circle>
              <path d="M12 7v4"></path>
              <line x1="8" y1="16" x2="8" y2="16"></line>
              <line x1="16" y1="16" x2="16" y2="16"></line>
            </svg>
          </div>
          <h2>AirSense AI Assistant</h2>
        </div>
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span className="status-text">Online</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.sender}`}>
            {msg.sender === "bot" && (
              <div className="bot-msg-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="avatar-svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
            )}
            <div className="message-bubble-wrapper">
              <div className="message-bubble">
                {msg.text}
              </div>
              <div className="message-time">
                <span>{msg.time}</span>
                {msg.sender === "user" && (
                  <svg className="read-receipt" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    <path d="M10.354 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L3.5 10.293l6.146-6.147a.5.5 0 0 1 .708 0z"/>
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="quick-prompts-row">
        <button className="prompt-chip" onClick={() => askQuestion("Should I wear a mask?")}>
          <span>😷 Wear Mask?</span>
        </button>
        <button className="prompt-chip" onClick={() => askQuestion("Can I exercise today?")}>
          <span>🏃 Exercise</span>
        </button>
        <button className="prompt-chip" onClick={() => askQuestion("Is it safe to go outside?")}>
          <span>🌳 Outdoor Activities</span>
        </button>
        <button className="prompt-chip" onClick={() => askQuestion("Can children play outside?")}>
          <span>👶 Children Safety</span>
        </button>
      </div>

      {/* Send Input Bar */}
      <div className="chat-input-bar">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question..."
        />
        <button className="chat-send-btn" onClick={sendMessage}>
          <svg className="send-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default AdvisoryBot;