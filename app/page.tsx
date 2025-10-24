'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

const TOOLS = [
  'Lover Art',
  'Base 44',
  'Bhendi AI',
  'Light PDF',
  'Vercept',
  'Prommpt AI'
]

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'Welcome! I\'m your AI scriptwriting assistant. Let\'s create an amazing script for your YouTube video about underrated tools! 🎬'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [script, setScript] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          currentScript: script
        }),
      })

      const data = await response.json()

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])

      if (data.script) {
        setScript(data.script)
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: 'Error connecting to AI. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const generateHook = async () => {
    setIsLoading(true)
    setMessages(prev => [...prev, {
      role: 'user',
      content: 'Generate a powerful hook for my video about underrated tools'
    }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            {
              role: 'user',
              content: 'Generate a catchy Hinglish hook for my YouTube video intro about these underrated tools: Lover Art, Base 44, Bhendi AI, Light PDF, Vercept, and Prommpt AI. Make it energetic and engaging!'
            }
          ],
          currentScript: script,
          action: 'generate_hook'
        }),
      })

      const data = await response.json()

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      setScript(data.script || script)
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: 'Error generating hook. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const generateFullScript = async () => {
    setIsLoading(true)
    setMessages(prev => [...prev, {
      role: 'user',
      content: 'Generate the complete script with all segments'
    }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            {
              role: 'user',
              content: 'Generate a complete YouTube script in Hinglish for a video about these underrated tools: Lover Art, Base 44, Bhendi AI, Light PDF, Vercept, and Prommpt AI. Include: 1) Catchy hook, 2) Brief intro, 3) One segment for each tool with description and benefits, 4) Conclusion with call-to-action. Keep it conversational and engaging!'
            }
          ],
          currentScript: script,
          action: 'generate_full_script'
        }),
      })

      const data = await response.json()

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      setScript(data.script || script)
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: 'Error generating script. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const refineScript = async () => {
    if (!script) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: 'Please generate a script first before refining!'
      }])
      return
    }

    setIsLoading(true)
    setMessages(prev => [...prev, {
      role: 'user',
      content: 'Refine and improve the current script'
    }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            {
              role: 'user',
              content: `Please refine and improve this script. Make it more engaging, fix any flow issues, and ensure it's perfect for a YouTube video in Hinglish:\n\n${script}`
            }
          ],
          currentScript: script,
          action: 'refine_script'
        }),
      })

      const data = await response.json()

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      setScript(data.script || script)
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: 'Error refining script. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const copyScript = () => {
    if (script) {
      navigator.clipboard.writeText(script)
      setMessages(prev => [...prev, {
        role: 'system',
        content: 'Script copied to clipboard! ✓'
      }])
    }
  }

  const downloadScript = () => {
    if (script) {
      const blob = new Blob([script], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'youtube-script.txt'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setMessages(prev => [...prev, {
        role: 'system',
        content: 'Script downloaded! ✓'
      }])
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🎬 YT Script Assistant</h1>
        <p>AI-Powered Scriptwriting for YouTube Videos</p>
      </header>

      <div className="main-content">
        <div className="chat-section">
          <h2 className="section-title">💬 Chat with AI</h2>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <span className="loading"></span> Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for script help, revisions, ideas..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              Send
            </button>
          </form>
        </div>

        <div className="script-section">
          <h2 className="section-title">📝 Your Script</h2>
          <div className={`script-output ${!script ? 'empty' : ''}`}>
            {script || 'Your generated script will appear here...'}
          </div>
          <div className="actions">
            <button onClick={generateHook} className="action-btn" disabled={isLoading}>
              🎯 Generate Hook
            </button>
            <button onClick={generateFullScript} className="action-btn" disabled={isLoading}>
              📄 Full Script
            </button>
            <button onClick={refineScript} className="action-btn secondary" disabled={isLoading || !script}>
              ✨ Refine
            </button>
            <button onClick={copyScript} className="action-btn success" disabled={!script}>
              📋 Copy
            </button>
            <button onClick={downloadScript} className="action-btn success" disabled={!script}>
              💾 Download
            </button>
          </div>
        </div>
      </div>

      <div className="tools-section">
        <h2 className="section-title">🛠️ Your Tools</h2>
        <div className="tools-grid">
          {TOOLS.map((tool, idx) => (
            <div key={idx} className="tool-card">
              {tool}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
