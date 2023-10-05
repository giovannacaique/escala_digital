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