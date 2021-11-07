const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.getElementById('logInForm');
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');
let userLogin = false;

const login = (user) => {
	buttonAuth.style.display = 'none';
	buttonOut.style.display = 'flex';
	userName.style.display = 'flex';

	userName.textContent = user.login;
	modalAuth.style.display = 'none';

	userLogin = true;
}
const logout = () => {
	buttonAuth.style.display = 'flex';
	buttonOut.style.display = 'none';
	userName.style.display = 'none';

	userName.textContent = '';

	localStorage.removeItem('user');

	userLogin = false;
	window.location.href = '/';
}

buttonAuth.addEventListener('click', () => {
	modalAuth.style.display = 'flex';
});

closeAuth.addEventListener('click', () => {
	modalAuth.style.display = 'none';
});

buttonOut.addEventListener('click', () => {
	logout();
});

logInForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const user = {
		login: inputLogin.value,
		password: inputPassword.value,
	}

	localStorage.setItem('user', JSON.stringify(user));

	if (user.login !== '') {
		login(user);
	} else {
		alert('Логин не указан');
	}
})

if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).login !== '') {
	login(JSON.parse(localStorage.getItem('user')));
}
