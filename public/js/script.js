// Suavidade
document.addEventListener("DOMContentLoaded", function () {
    // Captura todos os links do menu de navegação.
    const menuLinks = document.querySelectorAll(".menu-content a");

    // Para cada link do menu...
    menuLinks.forEach(function (link) {
        // Adiciona um evento que será acionado quando o link for clicado.
        link.addEventListener("click", function (e) {
            // Impede o comportamento padrão do link, que é levar para outra página.
            e.preventDefault();

            // Obtém o destino (a seção da página) para onde o link aponta.
            const targetId = this.getAttribute("href").substring(1);

            // Encontra a seção correspondente na página com base no destino.
            const targetSection = document.getElementById(targetId);

            // Se a seção existir, a página rolará suavemente até ela.
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });
});


// Messagem Success/Error
const form = document.getElementById('cadastrarEmpForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);

    fetch('/cadastro/empresa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(data)),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Se o cadastro for bem-sucedido, exibe uma mensagem de sucesso na div
                messageDiv.innerHTML = '<div class="success-message">Empresa cadastrada com sucesso! Agora cadastre os funcionários</div>';
            } else {
                // Se o cadastro não for bem-sucedido, exibe uma mensagem de erro na div
                messageDiv.innerHTML = '<div class="error-message">Erro ao cadastrar empresa</div>';
            }
            // Exibe a div de mensagens
            messageDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('Erro ao cadastrar empresa:', error);
            // Exibe uma mensagem de erro caso ocorra um erro na solicitação
            messageDiv.innerHTML = '<div class="error-message">Erro ao cadastrar empresa: Ocorreu um erro no servidor.</div>';
            // Exibe a div de mensagens
            messageDiv.style.display = 'block';
        });
});


// Variáveis para armazenar os campos de email e confirmar email
const emailInput = document.getElementById("email");
const confirmEmailInput = document.getElementById("confirm-email");
// Função para verificar se os campos "Email" e "Confirmar Email" são iguais
function validarEmails() {
    const email = emailInput.value;
    const confirmEmail = confirmEmailInput.value;

    if (email && confirmEmail) {
        if (email !== confirmEmail) {
            alert("Os campos de email e confirmar email não coincidem.");
            // Você pode limpar os campos ou tomar outra ação, se necessário
        }
    }
}
// Adicione ouvintes de evento para chamar a função após a entrada do usuário
emailInput.addEventListener("input", validarEmails);
confirmEmailInput.addEventListener("input", validarEmails);


// Variáveis para armazenar os campos de senha e confirmar senha
const senhaInput = document.getElementById("senha");
const confirmSenhaInput = document.getElementById("confirm-senha");
// Função para verificar se os campos "Senha" e "Confirmar Senha" são iguais
function validarSenhas() {
    const senha = senhaInput.value;
    const confirmSenha = confirmSenhaInput.value;

    if (senha && confirmSenha) {
        if (senha !== confirmSenha) {
            alert("Os campos de senha e confirmar senha não coincidem.");
            // Você pode limpar os campos ou tomar outra ação, se necessário
        }
    }
}
// Adicione ouvintes de evento para chamar a função após a entrada do usuário
senhaInput.addEventListener("input", validarSenhas);
confirmSenhaInput.addEventListener("input", validarSenhas);