import { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react'
import VaporwaveCard from './VaporwaveCard'
import VaporwaveButton from './VaporwaveButton'

interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickReplies = [
    "What's your most popular disposable?",
    "Do you have beginner-friendly devices?",
    "What are your store hours?",
    "Do you offer delivery?",
    "Tell me about your loyalty program"
  ]

  const botResponses: { [key: string]: string } = {
    "What's your most popular disposable?": "Our Elf Bar BC5000 is incredibly popular! It offers ~5000 puffs, amazing flavor variety, and consistent performance. Would you like to see our full disposable selection?",
    "Do you have beginner-friendly devices?": "Absolutely! I'd recommend starting with our Vaporesso XROS 3 or SMOK Nord 4. They're easy to use, refillable, and perfect for beginners. Want me to show you our starter kits?",
    "What are your store hours?": "We're open Monday-Saturday 10AM-9PM, Sunday 12PM-7PM. Plus, our online store is available 24/7 with same-day delivery in Norman!",
    "Do you offer delivery?": "Yes! Free same-day delivery in Norman for orders over $50, or $5 delivery fee. We also ship nationwide with tracking. Orders placed before 3PM get same-day delivery!",
    "Tell me about your loyalty program": "VaporLAX Rewards gives you points on every purchase, exclusive member pricing, birthday discounts, and early access to new products. Plus, you get 10% off your first order when you sign up!"
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      const welcomeMessage: ChatMessage = {
        id: '1',
        text: "Welcome to VaporLAX! I'm VAPOR-AI, your cybernetic vaping assistant. How can I help you explore our digital realm today? 🤖",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const response = botResponses[text] || "Thanks for your message! Our human agents will respond shortly. In the meantime, check out our FAQ section or browse our latest products!"
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickReply = (reply: string) => {
    sendMessage(reply)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="w-8 h-8 text-vapor-black" />
        </button>
        
        {/* Notification bubble */}
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-neon-pink rounded-full flex items-center justify-center text-vapor-black font-bold text-xs animate-bounce">
          1
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <VaporwaveCard 
        className={`w-80 sm:w-96 transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-96'
        }`}
        glow
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neon-cyan/30 bg-vapor-dark-gray/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-vapor-black" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-white text-sm">VAPOR-AI</h3>
              <p className="font-vt323 text-xs text-neon-cyan">Online • Ready to assist</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-400 hover:text-neon-cyan transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-neon-pink transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-64 bg-vapor-black/50">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-neon-cyan text-vapor-black'
                      : 'bg-vapor-dark-gray text-white border border-neon-pink/30'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === 'bot' ? (
                        <Bot className="w-4 h-4 text-neon-pink" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span className="font-vt323 text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="font-vt323 text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-vapor-dark-gray text-white border border-neon-pink/30 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-neon-pink" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-neon-pink rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-neon-cyan/30 bg-vapor-dark-gray/50">
                <p className="font-vt323 text-xs text-gray-400 mb-3">Quick questions:</p>
                <div className="space-y-2">
                  {quickReplies.slice(0, 3).map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="w-full text-left p-2 bg-vapor-black/50 hover:bg-neon-cyan/10 border border-neon-cyan/30 rounded text-gray-300 hover:text-neon-cyan font-vt323 text-xs transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-neon-cyan/30 bg-vapor-dark-gray/90">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage(inputText)
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-vapor-black/50 border border-neon-cyan/50 rounded text-white placeholder-gray-400 font-vt323 text-sm focus:outline-none focus:border-neon-pink transition-colors"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="w-10 h-10 bg-neon-cyan hover:bg-neon-pink text-vapor-black rounded flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        )}
      </VaporwaveCard>
    </div>
  )
}

export default LiveChatWidget