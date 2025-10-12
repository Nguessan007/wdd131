/* app.js
 - Single script used by all pages. It detects page by checking for specific DOM elements.
 - Uses template literals exclusively for building HTML output.
*/

// --- Sample data (replace with real content or load from server) ---
const sampleRecipes = [
    { id: 'r1', title: 'Quinoa Salad', time: 20, tags: ['vegetarian'], img: 'images/quinoa.jpg' },
    { id: 'r2', title: 'Lemon Salmon', time: 30, tags: ['glutenfree'], img: 'images/salmon.jpg' },
    { id: 'r3', title: 'Oat Pancakes', time: 15, tags: ['vegetarian'], img: 'images/pancakes.jpg' }
  ];
  
  // --- Storage keys ---
  const STORAGE_KEY = 'healthyrecipes_v1';
  
  // --- helpers ---
  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { recipes: sampleRecipes.slice(), favorites: [] };
    try { return JSON.parse(raw); } catch (e) { console.warn('Corrupt storage, resetting'); return { recipes: sampleRecipes.slice(), favorites: [] }; }
  }
  
  // --- render card template (uses template literals) ---
  function recipeCardHtml(recipe, isFav = false) {
    return `
      <article class="card" data-id="${recipe.id}">
        <img loading="lazy" src="${recipe.img}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p>Time: ${recipe.time} min</p>
        <p>Tags: ${recipe.tags.join(', ')}</p>
        <div style="margin-top:auto;">
          <button class="fav-btn">${isFav ? '♥ Remove' : '♡ Favorite'}</button>
        </div>
      </article>
    `;
  }
  
  // --- main app object (encapsulate state & methods) ---
  const App = {
    state: loadState(),
  
    init() {
      // provide access to pages by checking elements
      if (document.getElementById('featured-list')) this.initHome();
      if (document.getElementById('recipes-grid')) this.initRecipes();
      if (document.getElementById('recipe-form')) this.initForm();
      this.restoreSubscribe();
    },
  
    // home page: show a few featured items
    initHome() {
      const container = document.getElementById('featured-list');
      const featured = this.state.recipes.slice(0,3);
      container.innerHTML = featured.map(r => recipeCardHtml(r, this.isFavorite(r.id))).join('');
      this.addCardListeners(container);
      // subscribe form handled globally
    },
  
    // recipes page with search & filter
    initRecipes() {
      this.renderRecipes(this.state.recipes);
      const search = document.getElementById('search');
      const filter = document.getElementById('filter');
  
      search.addEventListener('input', e => {
        const q = e.target.value.trim().toLowerCase();
        const filtered = this.state.recipes.filter(r => r.title.toLowerCase().includes(q) || r.tags.join(' ').includes(q));
        this.renderRecipes(filtered);
      });
  
      filter.addEventListener('change', e => {
        const val = e.target.value;
        let list = this.state.recipes;
        if (val === 'vegetarian') list = list.filter(r => r.tags.includes('vegetarian'));
        else if (val === 'glutenfree') list = list.filter(r => r.tags.includes('glutenfree'));
        else if (val === '30min') list = list.filter(r => r.time <= 30);
        this.renderRecipes(list);
      });
    },
  
    // render array into DOM and attach listeners
    renderRecipes(arr) {
      const grid = document.getElementById('recipes-grid');
      grid.innerHTML = arr.map(r => recipeCardHtml(r, this.isFavorite(r.id))).join('');
      this.addCardListeners(grid);
    },
  
    // event handlers for recipe cards (favorite/unfavorite)
    addCardListeners(container) {
      container.querySelectorAll('.card').forEach(card => {
        const id = card.dataset.id;
        card.querySelector('.fav-btn').addEventListener('click', () => {
          this.toggleFavorite(id);
          // update UI (simple approach: rerender current page)
          if (document.getElementById('recipes-grid')) this.renderRecipes(this.state.recipes);
          if (document.getElementById('featured-list')) this.initHome();
        });
      });
    },
  
    // favorites logic (uses array methods and conditional branching)
    isFavorite(id) {
      return this.state.favorites.includes(id);
    },
  
    toggleFavorite(id) {
      if (this.isFavorite(id)) {
        this.state.favorites = this.state.favorites.filter(x => x !== id); // array method
      } else {
        this.state.favorites.push(id);
      }
      saveState(this.state); // persist
    },
  
    // form to add a recipe
    initForm() {
      const form = document.getElementById('recipe-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('r-title').value.trim();
        const time = Number(document.getElementById('r-time').value);
        const tags = document.getElementById('r-tags').value.split(',').map(s => s.trim()).filter(Boolean);
        const img = document.getElementById('r-image').value.trim() || 'images/placeholder.jpg';
        const newRecipe = { id: 'r' + Date.now(), title, time, tags, img };
        this.state.recipes.push(newRecipe);
        saveState(this.state);
        document.getElementById('form-msg').textContent = 'Recipe added!';
        form.reset();
      });
    },
  
    // subscription form example (simple localStorage demo)
    restoreSubscribe() {
      const form = document.getElementById('subscribe-form');
      if (!form) return;
      const msg = document.getElementById('subscribe-msg');
      form.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        // simple validation
        if (!email.includes('@')) {
          msg.textContent = 'Please enter a valid email.';
          return;
        }
        // store to localStorage (array of subscribers)
        const raw = localStorage.getItem('subscribers') || '[]';
        const subs = JSON.parse(raw);
        if (subs.includes(email)) {
          msg.textContent = 'You are already subscribed!';
          return;
        }
        subs.push(email);
        localStorage.setItem('subscribers', JSON.stringify(subs));
        msg.textContent = 'Thanks! You are subscribed.';
      });
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => App.init());
  