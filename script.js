document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');

  // Adiciona mensagem ao chat
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

  // Mostra "digitando..."
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

  // Envia mensagem para a API
  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    userInput.value = '';
    addMessage(message, true);
    
    const typingElement = showTyping();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.response) {
        throw new Error('Resposta inválida da API');
      }

      typingElement.remove();
      addMessage(data.response, false);
      
    } catch (error) {
      typingElement.remove();
      addMessage(`❌ ${error.message}`, false);
      console.error('Erro:', error);
    }
  }

  // Event listeners
  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Mensagem inicial
  setTimeout(() => {
    addMessage("Olá! Como posso te ajudar hoje?", false);
  }, 500);
});
