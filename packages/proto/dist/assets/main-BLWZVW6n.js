import{i as p,x as c,a as h,n as o,d as m}from"./property-6n6DIx1f.js";var g=Object.defineProperty,a=(s,e,l,u)=>{for(var r=void 0,i=s.length-1,d;i>=0;i--)(d=s[i])&&(r=d(e,l,r)||r);return r&&g(e,l,r),r};const n=class n extends p{constructor(){super(...arguments),this.title="",this.icon="",this.links=[]}render(){return c`
      <div class="card">
        <h3><i class="fas ${this.icon}"></i> ${this.title}</h3>
        <ul>
          ${this.links.map(e=>c`
            <li><a href="${e.href}">${e.text}</a></li>
          `)}
        </ul>
      </div>
    `}};n.styles=h`
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
  `;let t=n;a([o({type:String})],t.prototype,"title");a([o({type:String})],t.prototype,"icon");a([o({type:Array})],t.prototype,"links");m({"blz-main-card":t});
