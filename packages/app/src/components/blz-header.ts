import { css, html, LitElement } from 'lit'

export class HeaderElement extends LitElement {
	static styles = css`
		.page-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem 2rem;
			background-color: var(--color-primary);
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
					<span>Welcome back, Brian</span>
					<label class="dark-mode-toggle">
						<input type="checkbox" id="dark-mode-toggle" autocomplete="off" />
						Dark mode
					</label>
				</div>
			</header>
		`
	}
}
