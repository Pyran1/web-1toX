_     = undefined,
state = 0,
tmout = () => {
	if(state == 1) return
	state = 1
	localStorage.getItem('level') ? level = localStorage.getItem('level') : level = 1
	localStorage.getItem('best') ? document.getElementById('best').innerHTML = localStorage.getItem('best') : _

	document.getElementById('level').innerText = level

	var t = 1000, game = document.getElementById('game')
	game.innerHTML = '<div id="loading" class="message"><h1>3</h1></div>'
	setTimeout(() => {
		game.innerHTML = '<div id="loading" class="message"><h1>2</h1></div>'
		setTimeout(() => {
			game.innerHTML = '<div id="loading" class="message"><h1>1</h1></div>'
			setTimeout(() => {
				state = 0
				setTimeout(() => {
					game.innerHTML = '<span class="num-position"></span>'
					a()
				}, 1)
			}, t)
		}, t)
	}, t)
},
a = () => {
	var
		i          = 0,
		currentNum = 2,
		genNum     = 4,
		timeout    = 1500,
		settings   = document.getElementById('settings'),
		set        = 1,
		scoreNum   = 1,
		score      = document.getElementById('score'),
		best       = document.getElementById('best');

	if(set == 0) return
	set = 0
	settings.addEventListener('click', () => {
		set = 0
		game.innerHTML = `<div id="message" class="message">
				<h1>Settings</h1>
				<div class="left">
					<b>Difficulty Level:</b>
					<form>
						<input id="diflvl" value="${localStorage.getItem('level') ? localStorage.getItem('level') : 1}" type="number" min="1" max="6">
					</form>
				</div><br>
				<button class="confirm">OK</button>
				</div>
			`
		document.querySelector('#diflvl').addEventListener('change', () => localStorage.setItem('level', document.getElementById('diflvl').value))
		document.querySelector('.confirm').addEventListener('click', () => set = 1 && window.history.go(0))
	})

	for(let i = 0; i < 24; i++) {
		document.getElementById('game').insertAdjacentHTML('beforeend', document.querySelector('.num-position').outerHTML)
	}

	document.querySelectorAll('.num-position').forEach((e) => {
		e.setAttribute('id', `id${i}`)
		i++
	})

	level == 2 ? genNum = 5 : _
	level == 3 ? genNum = 6 : _
	level == 4 ? genNum = 7 : _
	level == 5 ? genNum = 8 : _
	level == 6 ? genNum = 9 : _

	for(let i = 0; i < genNum; i++) {
		let a = document.getElementById(`id${Math.floor(Math.random() * 25)}`)
		var b = () => {
			if(!a.children[0]) {
				a.insertAdjacentHTML('beforeend', `<ins>${i+1}</ins>`)
				a.classList.add('clickable')
				return
			}
			a = document.getElementById(`id${Math.floor(Math.random() * 25)}`)
			b()
		}
		b()
	}

	document.querySelectorAll('.clickable').forEach((e) => {
		e.classList.add('unclickable')
		e.classList.add('load')
	})

	document.querySelectorAll('ins').forEach((e) => {
		setTimeout(function() {
			e.style.opacity = '0'
		}, timeout)
	})

	document.querySelectorAll('.clickable').forEach((e) => {
		e.addEventListener('mouseup', () => {
			if(+(e.children[0].innerText) < currentNum) {
				e.classList.add('active')
				e.children[0].style.opacity = '1'
				currentNum++
				scoreNum++
				score.innerHTML = +(score.innerHTML)+scoreNum
				if(+(score.innerHTML) > +(best.innerHTML)) best.innerHTML = score.innerHTML
				if(document.querySelectorAll('.clickable').length == document.querySelectorAll('.active').length) {
					setTimeout(() => {
						set = 0
						game.innerHTML = '<div id="success" class="message"><h1>✔</h1></div>'
						setTimeout(() => {
							set = 1
							if(+(score.innerHTML) > +(best.innerHTML)) best.innerHTML = score.innerHTML
							localStorage.setItem('best', best.innerHTML)
							tmout()
						}, timeout)
					}, genNum*3)
				}
			} else {
				set = 0
				e.classList.add('wrong')
				document.querySelectorAll('.clickable').forEach((e) => {
					e.classList.add('unclickable')
				})
				document.querySelectorAll('ins').forEach((e) => {
					e.style.opacity = '1'
				})
				setTimeout(() => {
					document.getElementById('game').insertAdjacentHTML('afterbegin', `<div id="gameover" class="message">
					<h1>Game Over</h1>
					<input type="button" value="Try Again" id="tryagain" class="confirm">
					</div>
					`)
					document.querySelector('.confirm').addEventListener('click', () => {
						localStorage.setItem('best', best.innerHTML)
						document.getElementById('score').innerHTML = +(document.getElementById('score').innerHTML)*0
						tmout()
					})
				}, timeout)
			}
			e.classList.add('unclickable')
		})
	})

	setTimeout(() => {
		document.querySelectorAll('.clickable').forEach((e) => {
			e.classList.remove('unclickable')
			e.classList.remove('load')
		})
	}, timeout)
}

tmout()