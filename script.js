const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// ✅ SUA CHAVE DE API (OpenAI)
const API_KEY = "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";

// Adiciona mensagem ao chat
function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Mostra "Digitando..."
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot-message', 'typing');
    typingDiv.textContent = "Digitando";
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
}

// Remove "Digitando..."
function removeTyping(typingElement) {
    typingElement.remove();
}

// Envia mensagem para a OpenAI
async function sendMessageToAI(message) {
    const typingElement = showTyping();

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
                temperature: 0.7
            })
        });

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        removeTyping(typingElement);
        addMessage(aiResponse, false);
    } catch (error) {
        removeTyping(typingElement);
        addMessage("❌ Erro ao conectar com a IA", false);
        console.error("Erro:", error);
    }
}

// Evento de enviar mensagem
function handleSendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = "";
        sendMessageToAI(message);
    }
}

sendButton.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
});

// Mensagem inicial
setTimeout(() => {
    addMessage("Olá! Sou sua IA assistente. Como posso ajudar? 😊", false);
}, 1000);
