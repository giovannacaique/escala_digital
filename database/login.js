const loginForm = document.querySelector('loginForm');
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const response = await fetch('/login', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    if (response.ok) {
        alert(data.mensagem);
    } else {
        alert(data.mensagem);
    }
});