// Primeira parte:
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

const form = document.getElementById('cadastrarEmpForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);

    fetch('http://localhost:8080/cadastro/empresa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(data)),
    })
        .then(response => response.json())
        .then(data => {
            alert('Empresa cadastrada com sucesso!');
            // Você pode redirecionar o usuário para outra página ou fazer qualquer ação necessária aqui.
        })
        .catch(error => {
            console.error('Erro ao cadastrar empresa:', error);
        });
});