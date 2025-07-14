// Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftEllipsisIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/logo.svg";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hello! I’m your Breast Cancer Assistant. Ask me anything about symptoms, treatment, or book an appointment.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [bookingState, setBookingState] = useState({
    step: 0,
    doctor: "",
    date: "",
    time: "",
  });

  const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const messagesEndRef = useRef(null);

  const availableDoctors = [
    "Dr. James Foster",
    "Dr. Rachel Kim",
    "Dr. David Martins",
    "Dr. Bruce Patel",
    "Dr. Hannah Schultz",
    "Dr. Lee Russo",
    "Dr. Kevin Bennett",
    "Dr. Michael Chan",
    "Dr. Priya Desai",
    "Dr. James Carter",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (customText = null) => {
    const messageText = customText || input.trim();
    if (!messageText) return;

    const userMsg = { from: "user", text: messageText };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    const lowerText = messageText.toLowerCase();

    // Appointment Flow
    if (lowerText.includes("book") || bookingState.step > 0) {
      if (bookingState.step === 0) {
        setBookingState({ step: 1, doctor: "", date: "", time: "" });
        setMessages((m) => [
          ...m,
          { from: "bot", text: "😊 Sure! Who is your preferred doctor?" },
          {
            from: "bot",
            text: "__doctors_list__",
          },
        ]);
        setIsTyping(false);
        return;
      }
      if (bookingState.step === 1) {
        setBookingState((prev) => ({
          ...prev,
          step: 2,
          doctor: messageText,
        }));
        setMessages((m) => [
          ...m,
          {
            from: "bot",
            text: "📅 Got it. What date works for you? (e.g. 2025-07-20)",
          },
        ]);
        setIsTyping(false);
        return;
      }
      if (bookingState.step === 2) {
        setBookingState((prev) => ({
          ...prev,
          step: 3,
          date: messageText,
        }));
        setMessages((m) => [
          ...m,
          {
            from: "bot",
            text: "⏰ Great. What time would you prefer? (e.g. 10:30 AM)",
          },
        ]);
        setIsTyping(false);
        return;
      }
      if (bookingState.step === 3) {
        const appointment = {
          doctor: bookingState.doctor,
          date: bookingState.date,
          time: messageText,
        };
        setMessages((m) => [
          ...m,
          {
            from: "bot",
            text: ` Your appointment with ${appointment.doctor} is booked for ${appointment.date} at ${appointment.time}. 💌\n\nWould you like help with anything else?`,
          },
        ]);
        setBookingState({ step: 0, doctor: "", date: "", time: "" });
        setIsTyping(false);
        return;
      }
    }

    // AI Response
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `You are a friendly, expert Breast Cancer Assistant. 
Your job is to educate and guide patients about:
- Breast cancer symptoms (lumps, swelling, pain, changes, etc.)
- Diagnosis methods (mammogram, biopsy, etc.)
- Treatments (surgery, chemotherapy, radiation, etc.)
- Prevention and emotional support

Answer clearly, gently, and informatively.`,
              },
              ...messages
                .filter((m) => m.text !== "__doctors_list__")
                .map((m) => ({
                  role: m.from === "user" ? "user" : "assistant",
                  content: m.text,
                })),
              { role: "user", content: messageText },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("🧠 OpenAI:", data);

      const reply =
        data.choices?.[0]?.message?.content?.trim() ||
        " I'm here for you. Could you kindly rephrase your question?";

      setMessages((m) => [...m, { from: "bot", text: reply }]);
    } catch (error) {
      console.error("❌ OpenAI error:", error);
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "⚠️ I'm having trouble connecting to my brain (AI). Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const renderBotMessage = (text) => {
    if (text === "__doctors_list__") {
      return (
        <div className="flex flex-wrap gap-2">
          {availableDoctors.map((doc) => (
            <button
              key={doc}
              onClick={() => sendMessage(doc)}
              className="bg-blue-100 text-sm text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
            >
              {doc}
            </button>
          ))}
        </div>
      );
    }
    return <span>{text}</span>;
  };

  return (
    <>
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-full shadow-lg text-white"
        >
          <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 w-full sm:w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center gap-2">
                <img src={Logo} alt="Logo" className="h-5 w-5" />
                <span className="font-semibold text-sm">Patient Assistant</span>
              </div>
              <button onClick={() => setOpen(false)}>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex gap-2 items-start max-w-[75%]">
                    {m.from === "bot" && (
                      <img src={Logo} className="h-4 w-4 mt-1" alt="bot" />
                    )}
                    <div
                      className={`px-4 py-2 rounded-xl text-sm ${
                        m.from === "user"
                          ? "bg-indigo-100 text-indigo-800 ml-auto"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      {renderBotMessage(m.text)}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="h-4 w-4 animate-pulse"
                  />
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex p-3 border-t gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-4 py-2 border rounded-xl focus:outline-none"
                placeholder="Ask about breast cancer..."
              />
              <button
                onClick={() => sendMessage()}
                className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700"
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
