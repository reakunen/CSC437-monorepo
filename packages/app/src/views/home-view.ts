import { css, html, LitElement } from 'lit'
import { property, state } from 'lit/decorators.js'

export class HomeViewElement extends LitElement {
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
		:host {
			display: block;
			padding: 2rem;
		}

		.welcome-section {
			text-align: center;
			margin-bottom: 3rem;
		}

		.welcome-section h1 {
			color: var(--color-primary, #4a90e2);
			margin-bottom: 1rem;
		}

		.dashboard-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
			gap: 2rem;
			margin-top: 2rem;
		}

		.card {
			background: white;
			border-radius: 10px;
			padding: 1.5rem;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
			transition: transform 0.2s, box-shadow 0.2s;
		}

		.card:hover {
			transform: translateY(-2px);
			box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
		}

		.card h3 {
			color: var(--color-primary, #4a90e2);
			margin-bottom: 1rem;
		}

		.card p {
			color: #666;
			line-height: 1.6;
		}

		.features-section {
			margin-top: 3rem;
		}

		.features-section h2 {
			text-align: center;
			margin-bottom: 2rem;
			color: #333;
		}

		.feature-list {
			list-style: none;
			padding: 0;
		}

		.feature-list li {
			padding: 0.5rem 0;
			border-bottom: 1px solid #eee;
		}

		.feature-list li:last-child {
			border-bottom: none;
		}

		.cta-section {
			text-align: center;
			margin-top: 3rem;
			padding: 2rem;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
			border-radius: 10px;
		}

		.cta-button {
			background: white;
			color: #667eea;
			padding: 1rem 2rem;
			border: none;
			border-radius: 5px;
			font-size: 1.1rem;
			font-weight: bold;
			cursor: pointer;
			transition: transform 0.2s;
			margin-top: 1rem;
		}

		.cta-button:hover {
			transform: scale(1.05);
		}
	`

	render() {
		return html`
			<main>
				<section class="welcome-section">
					<h1>Welcome to Your Lifestyle & Success Platform</h1>
					<p>
						${this._user
							? html`Hello, <strong>${this._user.username}</strong>! Ready to
									achieve your goals?`
							: html`Transform your life with our comprehensive platform.`}
					</p>
				</section>

				<section class="dashboard-grid">
					<div class="card">
						<h3>🍎 Nutrition Tracking</h3>
						<p>
							Monitor your daily nutrition intake and discover healthy recipes
							tailored to your dietary goals.
						</p>
					</div>

					<div class="card">
						<h3>💪 Fitness Goals</h3>
						<p>
							Set and track your fitness objectives with personalized workout
							plans and progress monitoring.
						</p>
					</div>

					<div class="card">
						<h3>📈 Success Metrics</h3>
						<p>
							Visualize your progress with detailed analytics and insights to
							keep you motivated.
						</p>
					</div>

					<div class="card">
						<h3>🎯 Goal Setting</h3>
						<p>
							Define clear, achievable goals and get guidance on how to reach
							them step by step.
						</p>
					</div>
				</section>

				${this._user
					? html`
							<section class="features-section">
								<h2>Your Dashboard Features</h2>
								<div class="card">
									<ul class="feature-list">
										<li>✅ Track daily nutrition and calories</li>
										<li>✅ Monitor workout progress</li>
										<li>✅ Set and achieve personal goals</li>
										<li>✅ View detailed analytics</li>
										<li>✅ Access personalized recommendations</li>
									</ul>
								</div>
							</section>
					  `
					: html`
							<section class="cta-section">
								<h2>Ready to Start Your Journey?</h2>
								<p>
									Join thousands of users who have transformed their lives with
									our platform.
								</p>
								<button class="cta-button" @click=${this._goToRegister}>
									Get Started Today
								</button>
							</section>
					  `}
			</main>
		`
	}

	private _goToRegister() {
		window.location.href = '/register.html'
	}
}

export const HomeView = HomeViewElement
