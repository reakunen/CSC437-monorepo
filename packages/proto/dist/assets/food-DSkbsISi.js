import{n as s,i as g,x as p,a as h,d as u}from"./property-6n6DIx1f.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function y(t){return s({...t,state:!0,attribute:!1})}var b=Object.defineProperty,l=(t,e,i,d)=>{for(var r=void 0,a=t.length-1,n;a>=0;a--)(n=t[a])&&(r=n(e,i,r)||r);return r&&b(e,i,r),r};const f=class f extends g{constructor(){super(...arguments),this.title="",this.imageUrl="",this.price="",this.restaurant="",this.description="",this.rating=0}render(){return p`
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
    `}};f.styles=h`
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
  `;let o=f;l([s({type:String})],o.prototype,"title");l([s({type:String})],o.prototype,"imageUrl");l([s({type:String})],o.prototype,"price");l([s({type:String})],o.prototype,"restaurant");l([s({type:String})],o.prototype,"description");l([s({type:Number})],o.prototype,"rating");var x=Object.defineProperty,$=Object.getOwnPropertyDescriptor,m=(t,e,i,d)=>{for(var r=d>1?void 0:d?$(e,i):e,a=t.length-1,n;a>=0;a--)(n=t[a])&&(r=(d?n(e,i,r):n(r))||r);return d&&r&&x(e,i,r),r};let c=class extends g{constructor(){super(...arguments),this.foodItems=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}async hydrate(t){const e=await fetch(t);if(e.ok){const i=await e.json();this.foodItems=i}}renderFoodItem(t){return p`
      <li>
        <food-item-card
          title=${t.title}
          imageUrl=${t.imageUrl}
          price=${t.price}
          restaurant=${t.restaurant}
          description=${t.description}
          rating=${t.rating}
        ></food-item-card>
      </li>
    `}render(){return p`
      <section>
        <h2>Food Menu</h2>
        <ul class="food-list">
          ${this.foodItems.map(t=>this.renderFoodItem(t))}
        </ul>
      </section>
    `}};c.styles=h`
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
  `;m([s()],c.prototype,"src",2);m([y()],c.prototype,"foodItems",2);c=m([v("food-list")],c);u({"food-item-card":o,"food-list":c});
