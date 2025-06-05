import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface FoodItem {
  title: string;
  imageUrl: string;
  price: string;
  restaurant: string;
  description: string;
  rating: number;
}

@customElement('food-list')
export class FoodList extends LitElement {
  @property()
  src?: string;

  @state()
  foodItems: FoodItem[] = [];

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
  }

  async hydrate(src: string) {
    const res = await fetch(src);
    if (res.ok) {
      const json = await res.json();
      this.foodItems = json as FoodItem[];
    }
  }

  renderFoodItem(item: FoodItem) {
    return html`
      <li>
        <food-item-card
          title=${item.title}
          imageUrl=${item.imageUrl}
          price=${item.price}
          restaurant=${item.restaurant}
          description=${item.description}
          rating=${item.rating}
        ></food-item-card>
      </li>
    `;
  }

  render() {
    return html`
      <section>
        <h2>Food Menu</h2>
        <ul class="food-list">
          ${this.foodItems.map(item => this.renderFoodItem(item))}
        </ul>
      </section>
    `;
  }

  static styles = css`
    .food-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    h2 {
      margin-bottom: 2rem;
      color: var(--color-text-primary);
    }
  `;
}