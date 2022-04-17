var
	theme    = document.getElementById('theme'),
	game     = document.getElementById('game'),
	ngame    = document.getElementById('newgame'),
	_        = undefined;

theme.addEventListener('click', () => {
	let dtheme = document.getElementById('dark-theme')
	if(dtheme) {
		localStorage.removeItem('theme')
		dtheme.remove()
	} else {
		localStorage.setItem('theme', '1')
		document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend',
		`<style id="dark-theme">
			:root {
				--main-color: rgb(94, 73, 56);
			}
			#main {
				background-color: rgb(26, 18, 15);
			}
			#copyright {
				color: rgb(255, 255, 255);
			}
			.gg-bulb::after {
				border-left: 3px solid;
				width: 12px;
				height: 2px;
				bottom: 0px;
				left: 0px;
			}
			.gg-bulb::before {
				top: 10px;
				left: 2px;
				box-shadow: 0px 5px 0px -2px, 2px 0px 0px 0px inset, -2px 0px 0px 0px inset, 0px -4px 0px -2px inset;
			}
			.gg-bulb {
				border-width: 2px;
			}
		</style>`)
	}
})

localStorage.getItem('theme') ? theme.click() : _

ngame.addEventListener('click', () => {
	tmout()
})

document.addEventListener('keydown', e => {
	if(e.keyCode == 82) {
		tmout()
	}
})