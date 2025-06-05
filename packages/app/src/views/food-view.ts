import { css, html, LitElement } from 'lit'
import { property, state } from 'lit/decorators.js'
import { define } from '@calpoly/mustang'
import { FoodList } from '../components/food-list.ts'

export class FoodViewElement extends LitElement {
	static uses = define({
		'food-list': FoodList,
	})

	@property({ attribute: 'food-id' })
	foodid?: string

	static styles = css`
		.container {
			max-width: 1200px;
			margin: 0 auto;
			padding: 2rem;
		}

		nav {
			margin-bottom: 2rem;
			padding: 1rem 0;
			border-bottom: 1px solid var(--color-border);
		}

		nav a {
			color: var(--color-text-link);
			text-decoration: none;
			margin-right: 0.5rem;
		}

		nav a:hover {
			text-decoration: underline;
		}

		header {
			margin-bottom: 2rem;
		}

		header h1 {
			margin: 0 0 1rem 0;
			color: var(--color-text-primary);
		}

		header p {
			color: var(--color-text-secondary);
			margin: 0;
		}

		.food-items-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
			gap: 2rem;
			padding: 1rem;
		}
	`

	get src() {
		return this.foodid ? `/api/food/${this.foodid}` : `/api/food`
	}

	render() {
		return html`
			<div class="container">
				<nav>
					<a href="/app">Home</a> &gt;
					<span>Food Items</span>
				</nav>

				<header>
					<h1>Food Items</h1>
					<p>
						Discover and explore our curated collection of food items and dining
						experiences.
					</p>
				</header>

				<div class="food-items-grid">
					<food-list src="${this.src}"></food-list>
				</div>
			</div>
		`
	}
}
