import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class FoodItemCard extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: String }) imageUrl = '';
  @property({ type: String }) price = '';
  @property({ type: String }) restaurant = '';
  @property({ type: String }) description = '';
  @property({ type: Number }) rating = 0;

  override render() {
    return html`
      <div class="food-card">
        <div class="image-container">
          <img src="${this.imageUrl}" alt="${this.title}" />
        </div>
        <div class="content">
          <h3>${this.title}</h3>
          <div class="restaurant">${this.restaurant}</div>
          <div class="price">${this.price}</div>
          <div class="rating">
            ${this.rating}
            <span class="rating-number">${this.rating}/5</span>
          </div>
          <p class="description">${this.description}</p>
        </div>
      </div>
    `;
  }

  static styles = css`
    .food-card {
      background: var(--color-background-secondary);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    }

    .food-card:hover {
      transform: translateY(-4px);
    }

    .image-container {
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .content {
      padding: 1.5rem;
    }

    h3 {
      margin: 0 0 0.5rem 0;
      color: var(--color-text-primary);
      font-size: 1.25rem;
    }

    .restaurant {
      color: var(--color-text-secondary);
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .price {
      font-weight: bold;
      color: var(--color-primary);
      margin-bottom: 0.5rem;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .stars {
      display: flex;
      gap: 0.25rem;
    }

    .star {
      color: #ffd700;
      font-size: 1.2rem;
    }

    .star.empty {
      color: #e0e0e0;
    }

    .star.half {
      position: relative;
    }

    .star.half::after {
      content: '☆';
      position: absolute;
      left: 0;
      color: #e0e0e0;
    }

    .rating-number {
      color: var(--color-text-secondary);
      font-size: 0.9rem;
    }

    .description {
      color: var(--color-text-secondary);
      font-size: 0.9rem;
      line-height: 1.4;
      margin: 0;
    }
  `;
} 