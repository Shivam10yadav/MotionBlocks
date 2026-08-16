import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Paperclip, 
  Globe, 
  BrainCircuit, 
  Mic, 
  ArrowUp, 
  X, 
  FileText, 
  ChevronDown,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Compass,
  Code2,
  Lightbulb
} from 'lucide-react';
import { FiHexagon } from 'react-icons/fi';

export default function PromptInput() {
  const [prompt, setPrompt] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Gemini 2.5 Flash');
  const [attachments, setAttachments] = useState([]);
  
  // Full Card Chat State
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Auto-resize textarea height as content grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [prompt]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerMockResponse = (userPrompt, activeModel) => {
    setIsGenerating(true);
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: `Here is a quick response using **${activeModel}** for: "${userPrompt}"\n\n- Mode: ${isThinking ? 'Deep Thinking Enabled' : 'Standard'}\n- Web Search: ${isSearching ? 'Active' : 'Disabled'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsGenerating(false);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() && attachments.length === 0) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: prompt,
      attachments: [...attachments],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentPrompt = prompt;
    const currentModel = selectedModel;

    setPrompt('');
    setAttachments([]);

    triggerMockResponse(currentPrompt, currentModel);
  };

  const handleQuickPrompt = (text) => {
    setPrompt(text);
    textareaRef.current?.focus();
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const quickPrompts = [
    { icon: Code2, label: 'Write a React Hook', prompt: 'Write a custom React hook for handling local storage with state sync.' },
    { icon: Lightbulb, label: 'Brainstorm Ideas', prompt: 'Give me 5 unique micro-SaaS ideas using AI and WebSockets.' },
    { icon: Compass, label: 'Explain Concept', prompt: 'Explain the difference between client-side rendering and SSR simply.' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      {/* Full AI Card Wrapper */}
      <div className="flex flex-col h-[750px] bg-slate-50/60 backdrop-blur-2xl rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-300/40 overflow-hidden transition-all">
        
        {/* Card Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white/80 border-b border-slate-200/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20">
              <FiHexagon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                AI Workspace
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                  {selectedModel}
                </span>
              </h2>
              <p className="text-xs text-slate-500">Ask questions, generate code, or analyze files</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                title="Reset Conversation"
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>

        {/* Conversation Body Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.length === 0 ? (
            /* Welcome / Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center px-4 max-w-md mx-auto">
              <div className="p-4 rounded-3xl bg-blue-50 text-blue-600 mb-4 border border-blue-100/60">
                <Bot className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-1">What can I help with today?</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Select a quick starter below or type your prompt in the input box to start generating.
              </p>

              {/* Quick Prompt Cards */}
              <div className="w-full space-y-2">
                {quickPrompts.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuickPrompt(item.prompt)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200/70 hover:border-blue-300 hover:shadow-sm text-left transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium text-slate-700">{item.label}</span>
                      </div>
                      <ArrowUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 rotate-45 transition-transform" />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Message Thread */
            messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[80%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* Attachments inside message bubble if any */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {msg.attachments.map((file, fIdx) => (
                        <span key={fIdx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-200/70 text-slate-700 text-[11px] font-medium">
                          <FileText className="w-3 h-3 text-blue-600" />
                          {file.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bubble Content */}
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-xs shadow-md shadow-blue-500/10'
                        : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/80 shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Actions & Timestamp */}
                  <div className={`flex items-center gap-2 px-1 text-[10px] text-slate-400 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'assistant' && (
                      <button
                        onClick={() => copyToClipboard(msg.text, index)}
                        className="hover:text-slate-600 transition-colors"
                      >
                        {copiedIndex === index ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-2xl bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 font-medium text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))
          )}

          {/* Typing Indicator */}
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-slate-400 text-xs"
            >
              <div className="w-8 h-8 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1 bg-white px-4 py-3 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </motion.div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar Footer Container */}
        <div className="p-4 bg-white/60 border-t border-slate-200/60 backdrop-blur-md">
          <form 
            onSubmit={handleSubmit}
            className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/40 transition-all duration-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100/60"
          >
            {/* Attachment Badges Display */}
            <AnimatePresence>
              {attachments.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 px-4 pt-3 overflow-hidden"
                >
                  {attachments.map((file, idx) => (
                    <motion.div 
                      key={`${file.name}-${idx}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-500" />
                      <span className="max-w-[150px] truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(idx)}
                        className="p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Text Area Input */}
            <div className="px-4 pt-3 pb-2">
              <textarea
                ref={textareaRef}
                rows={2}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Ask anything or attach context..."
                className="w-full bg-transparent resize-none border-0 p-0 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-base leading-relaxed max-h-[200px]"
              />
            </div>

            {/* Bottom Toolbar & Action Bar */}
            <div className="flex items-center justify-between px-3 py-2.5 bg-slate-50/80 rounded-b-2xl border-t border-slate-100">
              
              {/* Left Side Tools */}
              <div className="flex items-center gap-1.5">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  multiple 
                />
                
                {/* File Attach Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach File"
                  className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
                >
                  <Paperclip className="w-4 h-4" />
                </motion.button>

                {/* Web Search Toggle */}
                <button
                  type="button"
                  onClick={() => setIsSearching(!isSearching)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isSearching
                      ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 border border-transparent'
                  }`}
                >
                  <Globe className={`w-3.5 h-3.5 ${isSearching ? 'text-blue-600' : 'text-slate-500'}`} />
                  Search
                </button>

                {/* Deep Think Toggle */}
                <button
                  type="button"
                  onClick={() => setIsThinking(!isThinking)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isThinking
                      ? 'bg-purple-50 text-purple-600 border border-purple-200 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 border border-transparent'
                  }`}
                >
                  <BrainCircuit className={`w-3.5 h-3.5 ${isThinking ? 'text-purple-600' : 'text-slate-500'}`} />
                  Think
                </button>
              </div>

              {/* Right Side Tools */}
              <div className="flex items-center gap-2">
                {/* Model Selector */}
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="appearance-none bg-transparent pl-2.5 pr-6 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 border-none focus:ring-0 cursor-pointer rounded-lg"
                  >
                    <option value="Gemini 2.5 Flash">Gemini 2.5 Flash</option>
                    <option value="GPT-4o">GPT-4o</option>
                    <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Voice Input Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setIsRecording(!isRecording)}
                  title="Voice Input"
                  className={`p-2 rounded-xl transition-colors ${
                    isRecording
                      ? 'bg-red-50 text-red-500 animate-pulse'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/60'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </motion.button>

                {/* Submit Button */}
                <motion.button
                  whileHover={prompt.trim() || attachments.length > 0 ? { scale: 1.05 } : {}}
                  whileTap={prompt.trim() || attachments.length > 0 ? { scale: 0.95 } : {}}
                  type="submit"
                  disabled={!prompt.trim() && attachments.length === 0}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    prompt.trim() || attachments.length > 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                </motion.button>
              </div>

            </div>
          </form>
        </div>

      </div>
    </div>
  );
}