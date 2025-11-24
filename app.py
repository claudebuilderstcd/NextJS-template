"""
Simple Streamlit + Claude Hackathon Template
Perfect for beginners to build AI-powered applications!
"""

import streamlit as st
from anthropic import Anthropic

# Configure the page
st.set_page_config(
    page_title="Claude Hackathon Starter",
    page_icon="🚀",
    layout="wide"
)

# Welcome Section
st.title("🚀 Welcome to Your Claude Hackathon Starter!")
st.markdown("""
### 👋 Hello Hackathon Participant!

This is your starting point for building AI-powered applications with **Claude**, Anthropic's powerful AI assistant.

#### 🎯 What can you build?
- **Chatbots** - Customer service, educational tutors, creative writing assistants
- **Content Generators** - Blog posts, social media content, product descriptions
- **Data Analyzers** - Summarize documents, extract insights, answer questions
- **Creative Tools** - Story generators, brainstorming partners, coding helpers
- **And much more!** - The only limit is your imagination

#### 💡 Quick Start
1. Add your Claude API key in `.streamlit/secrets.toml` (see README.md)
2. Try the chat interface below
3. Modify the code to build your unique project!

---
""")

# Initialize the Anthropic client
try:
    client = Anthropic(api_key=st.secrets["ANTHROPIC_API_KEY"])
    api_key_configured = True
except Exception as e:
    api_key_configured = False
    st.error("⚠️ API key not configured. Please add your Claude API key to `.streamlit/secrets.toml`")
    st.info("📖 Check the README.md for instructions on how to get your API key!")

# Chat Interface (only show if API key is configured)
if api_key_configured:
    st.header("💬 Chat with Claude")
    st.markdown("Try asking Claude anything! This is a simple example to get you started.")

    # Initialize chat history in session state
    if "messages" not in st.session_state:
        st.session_state.messages = []

    # Display chat history
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    # Chat input
    if prompt := st.chat_input("Ask Claude anything..."):
        # Add user message to chat history
        st.session_state.messages.append({"role": "user", "content": prompt})

        # Display user message
        with st.chat_message("user"):
            st.markdown(prompt)

        # Get Claude's response
        with st.chat_message("assistant"):
            message_placeholder = st.empty()
            full_response = ""

            # Call Claude API with streaming
            with client.messages.stream(
                model="claude-3-5-sonnet-20241022",
                max_tokens=1024,
                messages=[{"role": m["role"], "content": m["content"]}
                         for m in st.session_state.messages]
            ) as stream:
                for text in stream.text_stream:
                    full_response += text
                    message_placeholder.markdown(full_response + "▌")

            message_placeholder.markdown(full_response)

        # Add assistant response to chat history
        st.session_state.messages.append({"role": "assistant", "content": full_response})

# Sidebar with helpful information
with st.sidebar:
    st.header("📚 Resources")
    st.markdown("""
    **Helpful Links:**
    - [Claude API Docs](https://docs.anthropic.com/)
    - [Streamlit Docs](https://docs.streamlit.io/)
    - [Get API Key](https://console.anthropic.com/)

    **Tips for Success:**
    - Start simple, then iterate
    - Test frequently
    - Ask for help when stuck
    - Have fun! 🎉
    """)

    if st.button("Clear Chat History"):
        st.session_state.messages = []
        st.rerun()

    st.markdown("---")
    st.markdown("Made with ❤️ for hackathon participants")
