const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggleIcon');

function toggleDarkLightMode(isDark) {
	nav.style.backgroundColor = isDark
		? 'rgb(186 185 187 / 50%)'
		: 'rgb(127 127 128/ 50%)';
	toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
	toggleIcon.children[1].classList.replace = isDark
		? ('fa-sun', 'fa-moon')
		: ('fa-moon', 'fa-sun');
	isDark ? imageMode('dark') : imageMode('light');
}

// Switch Theme Dynamically
function switchTheme(event) {
	if (event.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
		toggleDarkLightMode(true);
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
		toggleDarkLightMode(false);
	}
}

// Event Listener
toggleSwitch.addEventListener('change', switchTheme);

// Check Local Storage For Theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme);

	if (currentTheme === 'dark') {
		toggleSwitch.checked = true;
		toggleDarkLightMode(true);
	}
}
