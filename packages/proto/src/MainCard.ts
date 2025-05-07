// src/MainCard.ts
import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class MainCard extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: String }) icon = '';
  @property({ type: Array }) links: { text: string; href: string }[] = [];

  override render() {
    return html`
      <div class="card">
        <h3><i class="fas ${this.icon}"></i> ${this.title}</h3>
        <ul>
          ${this.links.map(link => html`
            <li><a href="${link.href}">${link.text}</a></li>
          `)}
        </ul>
      </div>
    `;
  }

  static styles = css`
    .card {
      background: var(--color-background-secondary);
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h3 {
      margin: 0 0 1rem 0;
      color: var(--color-text-primary);
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      margin: 0.5rem 0;
    }

    a {
      color: var(--color-text-link);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    i {
      margin-right: 0.5rem;
    }
  `;
}