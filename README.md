# 🚀 Claude + Next.js Hackathon Starter Template

Welcome to your hackathon starter! This is a simple, beginner-friendly template to help you build AI-powered applications using **Claude** and **Next.js**.

Perfect for 1-day hackathons and beginners! 🎉

## 📋 What's Included?

- ✅ Simple chat interface with Claude AI
- ✅ Next.js 14 with App Router
- ✅ TypeScript for better code quality
- ✅ Beautiful, responsive UI (works on mobile!)
- ✅ API route for secure Claude integration
- ✅ Easy setup - just 3 steps to get started

## 🎯 What Can You Build?

- **Chatbots** - Customer service, educational tutors, personal assistants
- **Content Generators** - Blog posts, social media content, product descriptions
- **Data Analyzers** - Summarize documents, extract insights, answer questions
- **Creative Tools** - Story generators, brainstorming partners, coding helpers
- **Study Assistants** - Explain concepts, generate quizzes, provide feedback
- **And much more!** - The only limit is your imagination

## 🚀 Quick Start

### Step 1: Use This Template

Click the **"Use this template"** button at the top of this page to create your own copy of this repository.

### Step 2: Clone and Install

```bash
# Clone your repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME

# Install dependencies
npm install
```

### Step 3: Add Your Claude API Key

1. **Get your API key:**
   - Go to [console.anthropic.com](https://console.anthropic.com/)
   - Sign up or log in (you may get free credits!)
   - Navigate to "API Keys" section
   - Click "Create Key" and copy it

2. **Add it to your project:**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   ```

3. **Edit `.env.local`** and replace `your-api-key-here` with your actual API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
   ```

### Step 4: Run Your App!

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the welcome page! 🎉

Try chatting with Claude to make sure everything works.

## 🛠️ How to Customize for Your Project

### File Structure

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts       # API endpoint for Claude (modify this!)
│   ├── page.tsx               # Main homepage (modify this!)
│   ├── page.module.css        # Styling
│   ├── layout.tsx             # App layout
│   └── globals.css            # Global styles
├── .env.local                 # Your API key (create this!)
└── package.json               # Dependencies
```

### 1. Customize the Homepage

Edit **`app/page.tsx`** to change the welcome message, add features, or completely redesign the interface.

**Example - Add a system prompt:**
```typescript
const sendMessage = async () => {
  // ... existing code ...

  // Add a system message to customize Claude's behavior
  const messagesWithSystem = [
    { role: 'user', content: 'You are a helpful cooking assistant who gives recipe ideas.' },
    ...newMessages
  ]

  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages: messagesWithSystem }),
  })
}
```

### 2. Customize Claude's Behavior

Edit **`app/api/chat/route.ts`** to change how Claude responds.

**Change the model:**
```typescript
const response = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',  // Fast and smart
  // or 'claude-3-opus-20240229'  // Most capable
  // or 'claude-3-haiku-20240307'  // Fastest and cheapest
  max_tokens: 1024,
  messages: messages,
})
```

**Add a system prompt for all conversations:**
```typescript
const response = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  system: 'You are a helpful assistant that always responds in a friendly, encouraging tone.',
  messages: messages,
})
```

### 3. Add New Features

Here are some ideas to extend your app:

#### Add File Upload
```typescript
// In app/page.tsx
const [file, setFile] = useState<File | null>(null)

<input
  type="file"
  onChange={(e) => setFile(e.target.files?.[0] || null)}
/>
```

#### Add Dropdown Options
```typescript
const [mode, setMode] = useState('chat')

<select value={mode} onChange={(e) => setMode(e.target.value)}>
  <option value="chat">Chat</option>
  <option value="summarize">Summarize</option>
  <option value="creative">Creative Writing</option>
</select>
```

#### Add Copy Button for Responses
```typescript
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  alert('Copied!')
}

<button onClick={() => copyToClipboard(msg.content)}>
  Copy
</button>
```

### 4. Styling

- **Quick color changes:** Edit the colors in `app/page.module.css`
- **Add your logo:** Put an image in the `public/` folder and use `<img src="/logo.png" />`
- **Use a CSS framework:** Install Tailwind CSS or another framework if you prefer

## 📚 Helpful Resources

### Documentation
- **Claude API Docs:** [docs.anthropic.com](https://docs.anthropic.com/)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **React Docs:** [react.dev](https://react.dev)
- **TypeScript Handbook:** [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)

### Claude Prompt Engineering
- **Prompt Library:** [docs.anthropic.com/en/prompt-library](https://docs.anthropic.com/en/prompt-library/library)
- **Prompt Engineering Guide:** [docs.anthropic.com/en/docs/build-with-claude/prompt-engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)

### Next.js Features to Explore
- **Server Actions:** Handle forms easily
- **Streaming:** Show Claude's response word-by-word
- **Route Handlers:** Create more API endpoints
- **Middleware:** Add authentication

## 🐛 Troubleshooting

### "API key not configured" error
- Make sure you created `.env.local` (not `.env.example`)
- Check that your API key is correct and starts with `sk-ant-`
- Restart the dev server after adding the key (`Ctrl+C` then `npm run dev` again)

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Make sure you're using Node.js 18 or higher (`node --version`)

### Port already in use
- Another app is using port 3000
- Run: `npm run dev -- -p 3001` to use a different port
- Or kill the process using port 3000

### Rate limiting errors
- Claude API has rate limits (especially on free tier)
- Add delays between requests
- Reduce `max_tokens` in the API call
- Consider upgrading your API plan for higher limits

### Build errors
- Check that all files are saved
- Make sure there are no TypeScript errors
- Try: `rm -rf .next` then `npm run dev`

## 💡 Tips for Hackathon Success

1. **Start Simple** - Get the basic version working first, then add features incrementally
2. **Test Frequently** - Run your app after each change to catch errors early
3. **Use Console Logs** - Add `console.log()` to debug issues
4. **Read Error Messages** - They usually tell you exactly what's wrong
5. **Ask for Help** - Don't hesitate to ask mentors, teammates, or Claude itself!
6. **Commit Often** - Use git to save your progress regularly
7. **Have Fun!** - Experiment, be creative, and enjoy the process! 🎨

## 🎓 Understanding the Code

### How It Works

1. **User Interface (app/page.tsx)**
   - User types a message and clicks "Send"
   - Message is added to the chat history
   - A POST request is sent to `/api/chat`

2. **API Route (app/api/chat/route.ts)**
   - Receives the messages
   - Calls Claude API with your API key
   - Returns Claude's response

3. **Display Response**
   - The response is added to the chat history
   - User can continue the conversation

### Key Concepts

- **API Routes** - Server-side code that runs on your backend (keeps API key secret!)
- **Client Components** - Interactive UI components (use `'use client'` at the top)
- **Environment Variables** - Secret values stored in `.env.local` (never commit these!)
- **TypeScript** - Adds type checking to prevent errors

## 🚢 Deploying Your App

When your project is ready to share:

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add your `ANTHROPIC_API_KEY` in the environment variables section
6. Click "Deploy"

Your app will be live in minutes! 🎉

### Other Options
- **Netlify:** Similar to Vercel, great for Next.js
- **Railway:** Easy deployment with database support
- **AWS/Google Cloud:** More complex but scalable

## 📝 License

This template is free to use for your hackathon project. Build something amazing! 🚀

## 🤝 Contributing

Found a bug or have a suggestion? Feel free to open an issue or submit a pull request!

---

**Good luck with your hackathon! 🎉**

Need help? Check the resources above, ask your mentors, or use Claude itself to help you code!

**Remember:** The best project is one that works and solves a real problem. Start simple and iterate!
