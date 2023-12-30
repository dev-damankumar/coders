let Toast;
export default Toast = (function () {
	let icons = {
		success: 'data:image/png;base64,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',
		error: 'data:image/png;base64,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',
		warning: 'data:image/png;base64,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',
		info: 'data:image/png;base64,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'
	}
	let delay = 0
	let style = `<style data-toast-style>.toast-alert-wrapper{z-index:99999;font-family:'Segoe UI',sans-serif}@keyframes fromRight{0%{transform:translateX(1000px)}100%{transform:translateX(0)}}*{box-sizing:border-box}.toast-close{border:none;background:no-repeat;position:absolute;right:10px;top:15px;cursor:pointer}.toast-close svg{width:18px;height:18px}.toast-header{margin:0 0 5px;font-size:17px;font-weight:500;color:#34363c;color:inherit;display:flex;align-items:center;line-height:1.35;padding-right:15px}.toast-alert-wrapper{position:fixed;top:107px;right:10px;transition:.3s all ease}.toast-alert.toast-alert-close{transform:translateX(500px)}.toast-alert.toast-alert-destroying{transform:translateX(1000px);height:0;margin:0;padding:0}.toast-alert{position:relative;background:#fff;z-index:999999;box-shadow:rgb(100 100 111 / 20%) 0 7px 29px 0;padding:15px;border-radius:10px;border-left:5px solid;border-right:5px solid #fff;max-width:360px;min-width:360px;margin-bottom:20px;box-shadow:rgb(17 17 26 / 10%) 0 0 16px;display:flex;align-items:center;animation:fromRight .5s ease;transition:.15s all ease;overflow:hidden}.toast-message{margin:0 0 5px;color:#767676;font-size:15px;line-height:1.35}.toast-alert img{width:auto;height:26px;margin-right:20px}.toast-success{color:#17b978}.toast-success .toast-close svg path{fill:#17b978}.toast-error{color:#ff304f}.toast-error .toast-close svg path{fill:#ff304f}.toast-warning{color:#ff8a5c}.toast-warning .toast-close svg path{fill:#ff8a5c}.toast-info{color:#0dafff}.toast-info .toast-close svg path{fill:#0dafff}@media screen and (max-width:500px){.toast-alert{max-width:100%;min-width:100%;padding:8px}.toast-alert-wrapper{right:14px;top:70px;left:11px}.toast-header{margin:0;font-size:14px}.toast-close{right:0;top:7px}.toast-message{margin:0 0 2px;font-size:13px}.toast-alert img{height:20px;margin-right:10px}}</style>`

	function Constructor() {
		let timeHandler=null;
		if (!document.querySelector(`[data-toast-style]`)) {
			document.head.innerHTML += style
		}

		function destroyMessage(toast) {
			toast.classList.add("toast-alert-close")
			setTimeout(function () {
				toast.classList.add("toast-alert-destroying")
			}, 200)
			setTimeout(function () {
				toast.remove()
			}, 400)
		}

		function makeMessage(type, header, msg) {
			let div = document.createElement("div")
			div.className = `toast-alert ${type ? `toast-${type}` : ''}`
			div.innerHTML = `
							<button type="button" class="toast-close">
         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9,0.493C4.302,0.493,0.493,4.302,0.493,9S4.302,17.507,9,17.507
         S17.507,13.698,17.507,9S13.698,0.493,9,0.493z M12.491,11.491c0.292,0.296,0.292,0.773,0,1.068c-0.293,0.295-0.767,0.295-1.059,0
         l-2.435-2.457L6.564,12.56c-0.292,0.295-0.766,0.295-1.058,0c-0.292-0.295-0.292-0.772,0-1.068L7.94,9.035L5.435,6.507
         c-0.292-0.295-0.292-0.773,0-1.068c0.293-0.295,0.766-0.295,1.059,0l2.504,2.528l2.505-2.528c0.292-0.295,0.767-0.295,1.059,0
         s0.292,0.773,0,1.068l-2.505,2.528L12.491,11.491z"></path>
         </svg>
      </button>
                              ${icons[type] ? `<img src="${icons[type]}">` : ''}
                              <div class="toast-message-wrap">
                                 <h3 class="toast-header">${header ? header : type.toUpperCase()}</h3>
                                 <p class="toast-message">${msg}</p>
                              </div>`
			div.querySelector('.toast-close').addEventListener("click", () => {
				destroyMessage(div.querySelector('.toast-close').parentElement)
			})
			return div
		}

		function setTimeForDestroy (toast) {
			destroyMessage(toast)
		}

		function render(toast) {
			delay++
			let timer = delay / 2 * 1000
			setTimeout(() => {
				let wrapperExist = document.querySelector(`[data-toast-wrapper]`)
				if (wrapperExist) {
					return wrapperExist.insertAdjacentElement("beforeend", toast)
				}
				let wrapper = document.createElement('div')
				wrapper.className = 'toast-alert-wrapper'
				wrapper.setAttribute("data-toast-wrapper", "")
				wrapper.append(toast)
				document.body.append(wrapper)
				delay = 0
			}, timer)
			timeHandler = setTimeout(setTimeForDestroy.bind(this, toast), 2000 + timer)
		}

		this.success = (message, header) => {
			let toast = makeMessage('success', header, message);
			render(toast)
			return this
		}

		this.error = (message, header) => {
			let toast = makeMessage('error', header, message);
			render(toast)
			return this
		}

		this.warning = (message, header) => {
			let toast = makeMessage('warning', header, message);
			render(toast)
			return this
		}

		this.info = (message, header) => {
			let toast = makeMessage('info', header, message);
			render(toast)
			return this
		}

		this.hold = () => {
			clearTimeout(timeHandler)
		}
	}

	return function instance() {
		return new Constructor()
	}
})()
