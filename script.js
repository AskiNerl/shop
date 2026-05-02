const path = window.location.pathname;
const token = localStorage.getItem("token");

if (path.includes("index.html") || path.endsWith("/") || path.endsWith("/shop")) {
    if (!token) {
        window.location.href = "login.html";
    } else {
        const username = localStorage.getItem("username");
        document.getElementById("welcome").textContent = `Привет, ${username}! 👋`;
    }
}

const API = "https://github.com/AskiNerl/shop"; // сюда Railway ссылку

async function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Заполни все поля!");
        return;
    }

    const res = await fetch(`${API}/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (res.ok) {
        alert("Аккаунт создан! Теперь войди.");
        window.location.href = "login.html";
    } else {
        const data = await res.json();
        alert("Ошибка: " + JSON.stringify(data));
    }
}

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        window.location.href = "index.html";
    } else {
        alert("Неверный логин или пароль!");
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "login.html";
}

if (window.location.pathname.includes("index.html")) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!token) {
        window.location.href = "login.html";
    } else {
        document.getElementById("welcome").textContent = `Привет, ${username}! 👋`;
    }
}