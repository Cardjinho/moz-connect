async function sendMessageToAI(message) {
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
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        // Verificação extra
        if (!data.response) {
            throw new Error('Resposta da API inválida');
        }

        removeTyping(typingElement);
        addMessage(data.response, false);
        
    } catch (error) {
        removeTyping(typingElement);
        addMessage(`❌ Erro: ${error.message}`, false);
        console.error("Detalhes do erro:", error);
    }
}
