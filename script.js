// Substitua com o seu nome de usuário da Twitch
const twitchUsername = "seu_nome_de_usuario_da_twitch";
const channel = "#" + twitchUsername;

// Configuração do cliente TMI.js para se conectar ao chat da Twitch
const client = new tmi.Client({
    channels: [twitchUsername],
});

// Conecta ao cliente TMI.js
client.connect().catch(console.error);

// Função para adicionar mensagens ao chatbox
function addMessage(username, messageText) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    // Criando a estrutura de nome de usuário e mensagem
    const userElement = document.createElement('span');
    userElement.textContent = username;
    
    const messageContent = document.createElement('p');
    messageContent.textContent = messageText;

    // Adicionando as partes no elemento da mensagem
    messageElement.appendChild(userElement);
    messageElement.appendChild(messageContent);

    // Adicionando a mensagem no chat
    document.getElementById('messages').appendChild(messageElement);

    // Fazendo o scroll para o final do chat
    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Definindo o tempo para remover a mensagem após 120 segundos (120000ms)
    setTimeout(() => {
        messageElement.remove();
    }, 120000); // 120 segundos = 120000 milissegundos
}

// Evento para receber mensagens do chat da Twitch
client.on('message', (channel, tags, message, self) => {
    if (self) return; // Ignora as mensagens do próprio bot

    // Adiciona a mensagem no chatbox
    addMessage(tags.username, message);
});
