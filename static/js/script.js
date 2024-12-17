document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const typingIndicatorContainer = document.querySelector('.typing-indicator-container');
    let context = '';

    // Show typing indicator
    function showTypingIndicator() {
        typingIndicatorContainer.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        typingIndicatorContainer.style.display = 'none';
    }

    // Send message function
    async function sendMessage() {
        const message = userInput.value.trim();
        
        if (message === '') return;

        // Add user message to chat
        const userMessageEl = document.createElement('div');
        userMessageEl.classList.add('message', 'user-message');
        userMessageEl.textContent = message;
        chatMessages.appendChild(userMessageEl);

        // Show typing indicator
        showTypingIndicator();

        // Clear input
        userInput.value = '';

        try {
            // Call backend
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    context: context,
                    question: message
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const botResponse = await response.text();

            // Hide typing indicator
            hideTypingIndicator();

            // Add bot message to chat
            const botMessageEl = document.createElement('div');
            botMessageEl.classList.add('message', 'bot-message');
            botMessageEl.textContent = botResponse;
            chatMessages.appendChild(botMessageEl);

            // Update context
            context += `\nUser: ${message}\nAI: ${botResponse}`;

            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;

        } catch (error) {
            console.error('Error:', error);

            // Hide typing indicator
            hideTypingIndicator();

            // Show error message
            const errorMessageEl = document.createElement('div');
            errorMessageEl.classList.add('message', 'bot-message');
            errorMessageEl.textContent = 'Sorry, an error occurred. Please try again.';
            chatMessages.appendChild(errorMessageEl);
        }
    }

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);

    // Allow sending message with Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});