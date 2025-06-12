import { css, html, LitElement } from 'lit'
import { property, state } from 'lit/decorators.js'

export class HeaderElement extends LitElement {
	@property({ attribute: 'username' })
	username = ''

	@state()
	private _user: any = null

	connectedCallback() {
		super.connectedCallback()
		// Listen for auth messages
		document.addEventListener(
			'auth:message',
			this._handleAuthMessage.bind(this) as EventListener
		)

		// Check if user is already logged in
		this._checkAuthStatus()
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		document.removeEventListener(
			'auth:message',
			this._handleAuthMessage.bind(this) as EventListener
		)
	}

	private _handleAuthMessage(event: Event) {
		const customEvent = event as CustomEvent
		const [action, data] = customEvent.detail
		if (action === 'auth/signin') {
			this._user = { username: data.username || 'User' }
		} else if (action === 'auth/signout') {
			this._user = null
			localStorage.removeItem('token')
		}
	}

	private async _checkAuthStatus() {
		const token = localStorage.getItem('token')
		if (token) {
			try {
				const response = await fetch('/auth/verify', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				if (response.ok) {
					const data = await response.json()
					this._user = data.user
				} else {
					localStorage.removeItem('token')
				}
			} catch (error) {
				console.error('Auth check failed:', error)
				localStorage.removeItem('token')
			}
		}
	}

	static styles = css`
		.page-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem 2rem;
			background-color: var(--color-primary, #4a90e2);
			color: white;
		}

		.header-logo {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		.header-logo h1 {
			margin: 0;
			font-size: 1.5rem;
		}

		.header-user {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		.user-info {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}

		.logout-button {
			background: transparent;
			border: 1px solid white;
			color: white;
			padding: 0.5rem 1rem;
			border-radius: 4px;
			cursor: pointer;
			transition: background-color 0.2s;
		}

		.logout-button:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}

		.login-link {
			color: white;
			text-decoration: none;
			padding: 0.5rem 1rem;
			border: 1px solid white;
			border-radius: 4px;
			transition: background-color 0.2s;
		}

		.login-link:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}

		.dark-mode-toggle {
			display: flex;
			align-items: center;
			cursor: pointer;
		}

		.dark-mode-toggle input[type='checkbox'] {
			margin-right: 0.5rem;
		}
	`

	render() {
		return html`
			<header class="page-header">
				<div class="header-logo">
					<i class="fas fa-rocket fa-2x"></i>
					<h1>Lifestyle & Success Platform</h1>
				</div>
				<div class="header-user">
					${this._user
						? html`
								<div class="user-info">
									<span>Welcome, ${this._user.username}</span>
									<button class="logout-button" @click=${this._signOut}>
										Logout
									</button>
								</div>
						  `
						: html` <a href="/login.html" class="login-link">Login</a> `}
					<label class="dark-mode-toggle">
						<input type="checkbox" id="dark-mode-toggle" autocomplete="off" />
						Dark mode
					</label>
				</div>
			</header>
		`
	}

	private _signOut() {
		localStorage.removeItem('token')
		this._user = null
		const event = new CustomEvent('auth:message', {
			bubbles: true,
			composed: true,
			detail: ['auth/signout'],
		})
		document.dispatchEvent(event)
		window.location.href = '/login.html'
	}
}

export const Header = HeaderElement
