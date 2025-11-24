import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: Request) {
  try {
    // Get the messages from the request body
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured. Please add ANTHROPIC_API_KEY to your .env.local file.' },
        { status: 500 }
      )
    }

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: messages,
    })

    // Extract the text content from Claude's response
    const messageContent = response.content[0]
    const text = messageContent.type === 'text' ? messageContent.text : ''

    return NextResponse.json({ message: text })
  } catch (error: any) {
    console.error('Error calling Claude API:', error)

    return NextResponse.json(
      { error: error.message || 'Failed to get response from Claude' },
      { status: 500 }
    )
  }
}
