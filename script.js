// Configuração da API (agora via endpoint do Vercel)
const API_ENDPOINT = '/api/chat';  // Isso apontará para sua função serverless

// Elementos do DOM
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Histórico de conversa (opcional)
let conversationHistory = [];

// Função para adicionar mensagens ao chat
function addMessage(content, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.innerHTML = `
        <div class="avatar">${isUser ? '👤' : '🤖'}</div>
        <div class="content">${content}</div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para mostrar "digitando..."
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing';
    typingDiv.innerHTML = `
        <div class="avatar">🤖</div>
        <div class="content">Digitando<span class="dots">...</span></div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
}

// Função principal para enviar mensagens
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = '';
    
    const typingElement = showTyping();

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                // history: conversationHistory // (opcional para contexto)
            })
        });

        const data = await response.json();
        addMessage(data.response, false);
        
        // Atualiza histórico (opcional)
        conversationHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: data.response }
        );
        
    } catch (error) {
        addMessage('⚠️ Erro ao conectar com a IA. Tente novamente.', false);
        console.error('Erro:', error);
    } finally {
        typingElement.remove();
    }
}

// Event Listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Mensagem inicial (opcional)
window.addEventListener('DOMContentLoaded', () => {
    addMessage("Olá! Sou seu assistente de IA. Como posso ajudar?", false);
});
