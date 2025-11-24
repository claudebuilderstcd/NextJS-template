'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')

    // Add user message to chat
    const newMessages = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      // Call our API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      // Add Claude's response to chat
      setMessages([...newMessages, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Error:', error)
      setMessages([...newMessages, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure your API key is configured correctly.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Welcome Section */}
        <div className={styles.welcome}>
          <h1 className={styles.title}>🚀 Welcome to Your Claude Hackathon Starter!</h1>
          <p className={styles.subtitle}>
            Build AI-powered applications with <strong>Claude</strong> and <strong>Next.js</strong>
          </p>

          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>🎯 What can you build?</h3>
              <ul>
                <li><strong>Chatbots</strong> - Customer service, tutors, assistants</li>
                <li><strong>Content Generators</strong> - Blogs, stories, social posts</li>
                <li><strong>Data Analyzers</strong> - Summarize docs, extract insights</li>
                <li><strong>Creative Tools</strong> - Brainstorming, coding helpers</li>
              </ul>
            </div>

            <div className={styles.infoCard}>
              <h3>💡 Quick Start</h3>
              <ol>
                <li>Add your Claude API key to <code>.env.local</code></li>
                <li>Run <code>npm install</code></li>
                <li>Run <code>npm run dev</code></li>
                <li>Start chatting below!</li>
              </ol>
              <p className={styles.hint}>
                Check the <strong>README.md</strong> for detailed instructions
              </p>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className={styles.chatSection}>
          <h2 className={styles.chatTitle}>💬 Chat with Claude</h2>

          <div className={styles.chatBox}>
            {messages.length === 0 ? (
              <div className={styles.emptyState}>
                <p>👋 Start a conversation! Ask Claude anything...</p>
                <p className={styles.examples}>
                  Try: "Help me brainstorm app ideas" or "Explain how APIs work"
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${styles.message} ${
                    msg.role === 'user' ? styles.userMessage : styles.assistantMessage
                  }`}
                >
                  <div className={styles.messageLabel}>
                    {msg.role === 'user' ? '👤 You' : '🤖 Claude'}
                  </div>
                  <div className={styles.messageContent}>{msg.content}</div>
                </div>
              ))
            )}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                <div className={styles.messageLabel}>🤖 Claude</div>
                <div className={styles.messageContent}>
                  <div className={styles.typing}>Thinking...</div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.inputArea}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message... (Press Enter to send)"
              className={styles.input}
              rows={3}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className={styles.sendButton}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p>
            📚 Resources:{' '}
            <a href="https://docs.anthropic.com/" target="_blank" rel="noopener noreferrer">
              Claude Docs
            </a>{' '}
            |{' '}
            <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
              Next.js Docs
            </a>
          </p>
          <p>Made with ❤️ for hackathon participants</p>
        </div>
      </div>
    </main>
  )
}
