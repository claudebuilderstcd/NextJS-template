# 🚀 Claude Hackathon Starter Template

Welcome to your hackathon starter! This is a simple, beginner-friendly template to help you build AI-powered applications using **Claude** and **Streamlit**.

## 📋 What's Included?

- ✅ Simple chat interface with Claude AI
- ✅ Beginner-friendly code with comments
- ✅ Streamlit web interface (no frontend coding needed!)
- ✅ Easy setup - just 3 steps to get started

## 🎯 What Can You Build?

- **Chatbots** - Customer service, tutors, assistants
- **Content Generators** - Blogs, social media, stories
- **Data Analyzers** - Summarize documents, extract insights
- **Creative Tools** - Brainstorming, coding helpers
- **And much more!**

## 🚀 Quick Start

### Step 1: Use This Template

Click the "Use this template" button at the top of this page to create your own copy of this repository.

### Step 2: Clone and Install

```bash
# Clone your repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Add Your Claude API Key

1. **Get your API key:**
   - Go to [console.anthropic.com](https://console.anthropic.com/)
   - Sign up or log in
   - Navigate to "API Keys" section
   - Create a new API key

2. **Add it to your project:**
   ```bash
   # Copy the example secrets file
   cp .streamlit/secrets.toml.example .streamlit/secrets.toml
   ```

3. **Edit `.streamlit/secrets.toml`** and replace `your-api-key-here` with your actual API key:
   ```toml
   ANTHROPIC_API_KEY = "sk-ant-your-actual-key-here"
   ```

### Step 4: Run Your App!

```bash
streamlit run app.py
```

Your app will open in your browser at `http://localhost:8501` 🎉

## 🛠️ How to Customize for Your Project

The main file you'll edit is **`app.py`**. Here's what you can do:

### 1. Change the Welcome Message
Edit the welcome section (lines 20-40) to explain your unique project.

### 2. Modify the Chat Behavior
Change the `model` parameter or add a system message to customize how Claude responds:

```python
# In the messages.stream() call, add a system message:
messages=[
    {"role": "system", "content": "You are a helpful cooking assistant."},
    {"role": m["role"], "content": m["content"]} for m in st.session_state.messages
]
```

### 3. Add Custom Features
Some ideas to get you started:

**Add a text input for custom prompts:**
```python
user_context = st.text_input("Tell Claude about your project:")
```

**Add file upload:**
```python
uploaded_file = st.file_uploader("Upload a document")
```

**Add dropdown options:**
```python
mode = st.selectbox("Choose mode:", ["Chat", "Summarize", "Generate"])
```

### 4. Customize the UI
Use Streamlit components to add your own style:

```python
st.sidebar.image("your-logo.png")
st.markdown("### Your Custom Section")
col1, col2 = st.columns(2)
```

## 📚 Helpful Resources

- **Claude API Documentation:** [docs.anthropic.com](https://docs.anthropic.com/)
- **Streamlit Documentation:** [docs.streamlit.io](https://docs.streamlit.io/)
- **Streamlit Components Gallery:** [streamlit.io/components](https://streamlit.io/components)
- **Example Prompts:** [docs.anthropic.com/en/prompt-library](https://docs.anthropic.com/en/docs/prompt-engineering)

## 🐛 Troubleshooting

### "API key not configured" error
- Make sure you created `.streamlit/secrets.toml` (not `secrets.toml.example`)
- Check that your API key is correct and has quotes around it
- Restart the Streamlit app after adding the key

### "Module not found" error
- Run `pip install -r requirements.txt` again
- Make sure you're using Python 3.8 or higher

### App won't start
- Check if another app is using port 8501
- Try: `streamlit run app.py --server.port 8502`

### Rate limiting errors
- Claude API has rate limits on free tier
- Add delays between requests or upgrade your API plan

## 💡 Tips for Hackathon Success

1. **Start Simple** - Get the basic version working first, then add features
2. **Test Often** - Run your app frequently to catch errors early
3. **Read Error Messages** - They usually tell you exactly what's wrong
4. **Ask for Help** - Don't hesitate to ask mentors or teammates
5. **Have Fun!** - Experiment and be creative! 🎨

## 🎓 Learning More

### Understanding the Code

The app has three main parts:

1. **Setup (lines 1-15)** - Import libraries and configure the page
2. **Welcome Section (lines 17-43)** - Display information to users
3. **Chat Interface (lines 45-80)** - Handle the conversation with Claude

### Key Concepts

- **Session State** - Streamlit's way to remember data between interactions
- **Streaming** - Get Claude's response word-by-word (feels more natural)
- **Messages Format** - Claude expects messages as `{"role": "user", "content": "text"}`

## 📝 License

This template is free to use for your hackathon project. Build something amazing! 🚀

---

**Good luck with your hackathon! 🎉**

Need help? Check the resources above or ask your hackathon mentors.
