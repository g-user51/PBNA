const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { DrinkooChatbot } = require('./chatbot');

const port = process.env.PORT || 3000;
const rootDir = __dirname;
const data = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'drinkoo-data.json'), 'utf8'));

// Initialize chatbot with API key from environment
const API_KEY = process.env.OPENROUTER_API_KEY || '';
const chatbot = new DrinkooChatbot(data.products, API_KEY, 'nvidia/nemotron-3-ultra-550b-a55b:free');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function parseCookies(header) {
  const cookieHeader = header || '';
  return cookieHeader.split(';').reduce((cookies, part) => {
    const [name, ...rest] = part.trim().split('=');
    if (name) cookies[name] = decodeURIComponent(rest.join('='));
    return cookies;
  }, {});
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderLayout(title, body, extraScript = '') {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} | Drinkoo</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/styles.css" />
    <style>
      #drinkoo-chat-widget { position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: 'Inter', sans-serif; }
      .chat-toggle { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #1d4f8c 0%, #3a83d0 100%); color: white; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(29, 79, 140, 0.3); display: flex; align-items: center; justify-content: center; transition: transform 0.2s, box-shadow 0.2s; }
      .chat-toggle:hover { transform: scale(1.1); box-shadow: 0 6px 16px rgba(29, 79, 140, 0.4); }
      .chat-toggle svg { width: 28px; height: 28px; }
      .chat-window { position: absolute; bottom: 80px; right: 0; width: 380px; height: 500px; background: white; border-radius: 12px; box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16); display: flex; flex-direction: column; overflow: hidden; }
      .chat-header { background: linear-gradient(135deg, #0e2647 0%, #1d4f8c 100%); color: white; padding: 16px; display: flex; justify-content: space-between; align-items: center; }
      .chat-header h3 { margin: 0; font-size: 1rem; }
      .chat-close { background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 0; width: 28px; height: 28px; }
      .chat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
      .chat-message { display: flex; margin-bottom: 8px; }
      .chat-message p { margin: 0; padding: 12px 16px; border-radius: 8px; max-width: 85%; word-wrap: break-word; font-size: 0.95rem; line-height: 1.4; }
      .chat-message.user { justify-content: flex-end; }
      .chat-message.user p { background: #1d4f8c; color: white; border-radius: 18px 18px 4px 18px; }
      .chat-message.bot p { background: #f0f4f8; color: #16324f; border-radius: 18px 18px 18px 4px; }
      .chat-input-area { padding: 12px; border-top: 1px solid #dce4ef; display: flex; gap: 8px; }
      #chat-input { flex: 1; border: 1px solid #dce4ef; border-radius: 24px; padding: 10px 14px; font-size: 0.95rem; outline: none; font-family: 'Inter', sans-serif; }
      #chat-input:focus { border-color: #3a83d0; box-shadow: 0 0 0 3px rgba(58, 131, 208, 0.1); }
      #chat-send { background: #1d4f8c; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
      #chat-send:hover { background: #0e2647; }
      #chat-send:disabled { opacity: 0.6; cursor: not-allowed; }
      @media (max-width: 480px) { .chat-window { width: 100vw; height: 100vh; max-width: 380px; bottom: 0; right: 0; border-radius: 0; } }
    </style>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="/">Drinkoo</a>
      <nav class="site-nav">
        <a href="/#products">Beverages</a>
        <a href="/#about">About</a>
        <a href="/#contact">Contact</a>
        <a href="/cart">Cart</a>
        <a href="/login">Admin</a>
      </nav>
    </header>
    ${body}
    <footer class="site-footer">
      <div>
        <strong>Drinkoo</strong>
        <p>Crafted for modern Indian beverage experiences.</p>
      </div>
      <div>
        <a href="/#products">Products</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/cart">Cart</a>
        <a href="/login">Login</a>
      </div>
    </footer>
    <div id="drinkoo-chat-widget" class="chat-widget">
      <button class="chat-toggle" id="chat-toggle" title="Chat with Drinkoo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
      <div class="chat-window" id="chat-window" style="display: none;">
        <div class="chat-header">
          <h3>Drinkoo Assistant</h3>
          <button class="chat-close" id="chat-close">✕</button>
        </div>
        <div class="chat-messages" id="chat-messages">
          <div class="chat-message bot">
            <p>Hi! 👋 I'm here to help you discover Drinkoo beverages. What would you like to know about our drinks?</p>
          </div>
        </div>
        <div class="chat-input-area">
          <input type="text" id="chat-input" placeholder="Ask about our drinks..." />
          <button id="chat-send">Send</button>
        </div>
      </div>
    </div>
    <script src="/app.js"></script>
    ${extraScript}
    <script>
      (function () {
        let sessionId = localStorage.getItem('drinkoo_chat_session') || 'session_' + Date.now();
        localStorage.setItem('drinkoo_chat_session', sessionId);
        const toggle = document.getElementById('chat-toggle');
        const closeBtn = document.getElementById('chat-close');
        const chatWindow = document.getElementById('chat-window');
        const input = document.getElementById('chat-input');
        const sendBtn = document.getElementById('chat-send');
        const messagesDiv = document.getElementById('chat-messages');
        let isLoading = false;
        toggle.addEventListener('click', () => {
          chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
        });
        closeBtn.addEventListener('click', () => {
          chatWindow.style.display = 'none';
        });
        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter' && !isLoading) sendMessage();
        });
        async function sendMessage() {
          const message = input.value.trim();
          if (!message || isLoading) return;
          addMessage(message, 'user');
          input.value = '';
          isLoading = true;
          sendBtn.disabled = true;
          const loadingDiv = document.createElement('div');
          loadingDiv.className = 'chat-message loading';
          loadingDiv.innerHTML = '<p>Thinking...</p>';
          messagesDiv.appendChild(loadingDiv);
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
          try {
            const response = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message, sessionId })
            });
            if (!response.ok) throw new Error('Chat failed');
            const data = await response.json();
            loadingDiv.remove();
            addMessage(data.reply, 'bot');
          } catch (error) {
            loadingDiv.remove();
            addMessage('Sorry, I encountered an error. Please try again.', 'bot');
          }
          isLoading = false;
          sendBtn.disabled = false;
          input.focus();
        }
        function addMessage(text, role) {
          const div = document.createElement('div');
          div.className = 'chat-message ' + role;
          const p = document.createElement('p');
          p.textContent = text;
          div.appendChild(p);
          messagesDiv.appendChild(div);
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
      })();
    </script>
  </body>
</html>`;
}

function renderHomePage(currentPage = 1, itemsPerPage = 6) {
  const allProducts = data.products;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const validPage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = allProducts.slice(startIndex, endIndex);

  const heroSection = `
    <section class="hero" style="background: linear-gradient(135deg, #003d82 0%, #0066cc 100%); padding: 80px 20px; text-align: center; color: white;">
      <h1 style="font-size: 3em; margin: 0; font-weight: bold;">Welcome to Drinkoo</h1>
      <p style="font-size: 1.2em; margin: 10px 0 0 0;">Premium Beverages for Every Moment</p>
    </section>
  `;

  const productGrid = `
    <section class="products" style="padding: 60px 20px; background: #f8f9fa;">
      <h2 style="text-align: center; font-size: 2.5em; margin-bottom: 40px; color: #003d82;">Our Collection</h2>
      <div class="product-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto; margin-bottom: 40px;">
        ${paginatedProducts.map(product => `
          <div class="product-card" style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center;">
            <h3 style="font-size: 1.3em; color: #003d82; margin: 0 0 10px 0;">${escapeHtml(product.name)}</h3>
            <p style="color: #666; margin: 5px 0;">${escapeHtml(product.category)} • ${product.sizeMl}ml</p>
            <p style="font-size: 1.2em; font-weight: bold; color: #0066cc; margin: 15px 0;">₹${product.price}</p>
            <a href="/product/${escapeHtml(product.slug)}" style="display: inline-block; background: #0066cc; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none; margin-top: 10px;">View Details</a>
          </div>
        `).join('')}
      </div>
      
      <div class="pagination" style="text-align: center; margin: 40px 0;">
        ${validPage > 1 ? `<a href="/?page=${validPage - 1}" style="padding: 8px 12px; margin: 0 5px; background: #0066cc; color: white; text-decoration: none; border-radius: 4px;">← Previous</a>` : ''}
        <span style="padding: 8px 12px; margin: 0 5px; color: #003d82; font-weight: bold;">Page ${validPage} of ${totalPages}</span>
        ${validPage < totalPages ? `<a href="/?page=${validPage + 1}" style="padding: 8px 12px; margin: 0 5px; background: #0066cc; color: white; text-decoration: none; border-radius: 4px;">Next →</a>` : ''}
      </div>
    </section>
  `;

  const aboutSection = `
    <section class="about" style="padding: 60px 20px; background: white;">
      <h2 style="text-align: center; font-size: 2.5em; margin-bottom: 30px; color: #003d82;">About Drinkoo</h2>
      <div style="max-width: 800px; margin: 0 auto; line-height: 1.8; color: #333;">
        <p>Drinkoo is a premium beverage company dedicated to bringing refreshing, high-quality drinks to every corner of India. With over 15 SKUs spanning carbonated beverages, ready-to-drink teas, energy drinks, mineral water, and juices, we cater to every taste and lifestyle.</p>
        <p>Our commitment to quality, taste, and health has made us the preferred choice for millions of consumers. From bustling metros to small towns, Drinkoo is trusted by families and individuals who demand the best.</p>
      </div>
    </section>
  `;

  const contactSection = `
    <section class="contact" style="padding: 60px 20px; background: #f8f9fa;">
      <h2 style="text-align: center; font-size: 2.5em; margin-bottom: 30px; color: #003d82;">Get in Touch</h2>
      <div style="max-width: 600px; margin: 0 auto; text-align: center; color: #333;">
        <p><strong>Email:</strong> support@drinkoo.com</p>
        <p><strong>Phone:</strong> +91-1800-DRINKOO</p>
        <p><strong>Address:</strong> Drinkoo Headquarters, India</p>
        <p style="margin-top: 20px;">Have questions? We'd love to hear from you. Reach out anytime!</p>
      </div>
    </section>
  `;

  const body = heroSection + productGrid + aboutSection + contactSection;
  return renderLayout('Home', body, '<script>window.drinkooProducts = ' + JSON.stringify(data.products) + '</script>');
}

function renderProductPage(product) {
  const nutrition = Object.entries(product.nutrition).map(([key, value]) => `<tr><th>${escapeHtml(key)}</th><td>${escapeHtml(value)}</td></tr>`).join('');
  const sizes = product.availableSizes.map((size) => `<span class="chip">${escapeHtml(size)}</span>`).join('');
  const body = `
    <main class="product-detail">
      <section class="detail-card">
        <div>
          <p class="eyebrow">${escapeHtml(product.category)}</p>
          <h1>${escapeHtml(product.name)}</h1>
          <p class="product-intro">${escapeHtml(product.description)}</p>
          <div class="detail-tags">
            <span class="chip">${product.sizeMl} ml</span>
            <span class="chip">Shelf life ${product.shelfLifeDays} days</span>
            <span class="chip">Health score ${product.healthScore}/100</span>
          </div>
          <div class="detail-actions">
            <a class="button primary" href="/add-to-cart?sku=${product.sku}">Add to Cart</a>
            <a class="button secondary" href="/error?from=buy-now">Buy Now</a>
          </div>
          <div class="detail-pricing">
            <span class="price">₹${product.price}</span>
            <span>Manufactured ${product.manufacturingDate}</span>
          </div>
        </div>
        <div class="detail-panel">
          <h3>Available sizes</h3>
          <div class="chip-list">${sizes}</div>
          <h3>Nutrition snapshot</h3>
          <table>
            <tbody>${nutrition}</tbody>
          </table>
        </div>
      </section>
    </main>`;
  return renderLayout(product.name, body);
}

function renderCartPage(cartItems, message = '') {
  const itemsMarkup = cartItems.length ? cartItems.map((item) => `
    <div class="cart-item">
      <div>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.category)}</p>
      </div>
      <div class="cart-price">₹${item.price}</div>
    </div>`).join('') : '<p class="empty-state">Your cart is empty right now. Explore the range and add a beverage to begin.</p>';

  const body = `
    <main class="cart-page">
      <section class="section-block">
        <p class="eyebrow">SHOPPING CART</p>
        <h1>Your selected beverages</h1>
        ${message ? `<p class="message">${escapeHtml(message)}</p>` : ''}
        <div class="cart-list">${itemsMarkup}</div>
      </section>
    </main>`;
  return renderLayout('Cart', body);
}

function renderLoginPage(message = '') {
  const body = `
    <main class="auth-page">
      <section class="auth-card">
        <p class="eyebrow">ADMIN ACCESS</p>
        <h1>Login to view the dashboard</h1>
        <form method="POST" action="/login" class="auth-form">
          <label>
            <span>Username</span>
            <input type="text" name="username" value="admin" required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" value="password" required />
          </label>
          <button class="button primary" type="submit">Login</button>
        </form>
        <form method="POST" action="/signup" class="auth-form secondary-form">
          <button class="button secondary" type="submit">Sign up</button>
        </form>
        ${message ? `<p class="message">${escapeHtml(message)}</p>` : ''}
      </section>
    </main>`;
  return renderLayout('Login', body);
}

function renderDashboardPage() {
  const stateOptions = data.stateSales.map((entry) => `<option value="${escapeHtml(entry.state)}">${escapeHtml(entry.state)}</option>`).join('');
  const beverageOptions = data.products.map((product) => `<option value="${escapeHtml(product.name)}">${escapeHtml(product.name)}</option>`).join('');
  const distributorRows = data.distributors.map((distributor) => `
    <tr>
      <td>${escapeHtml(distributor.name)}</td>
      <td>${escapeHtml(distributor.region)}</td>
      <td>${escapeHtml(distributor.skuDemand)}</td>
      <td>${escapeHtml(distributor.inventory)}</td>
    </tr>`).join('');
  const trackingRows = data.tracking.map((entry) => `
    <tr>
      <td>${escapeHtml(entry.id)}</td>
      <td>${escapeHtml(entry.distributor)}</td>
      <td>${escapeHtml(entry.status)}</td>
      <td>${escapeHtml(entry.location)}</td>
    </tr>`).join('');

  const body = `
    <main class="dashboard-page">
      <section class="section-block">
        <p class="eyebrow">OPERATIONS DASHBOARD</p>
        <h1>Sales and distribution intelligence</h1>
        <p>This dashboard is pre-fetched from the Drinkoo dummy data model and is ready for review by admin users.</p>
      </section>
      <section class="section-block dashboard-grid">
        <div class="dashboard-card">
          <h2>Sales trend by state</h2>
          <label>
            <span>Select state</span>
            <select>${stateOptions}</select>
          </label>
          <div class="metric">${data.stateSales[0].unitsSold} units sold</div>
        </div>
        <div class="dashboard-card">
          <h2>Sales trend by drink</h2>
          <label>
            <span>Select beverage</span>
            <select>${beverageOptions}</select>
          </label>
          <div class="metric">${data.products[0].name} • ${data.products[0].category}</div>
        </div>
        <div class="dashboard-card">
          <h2>Day-wise movement</h2>
          <div class="metric">${data.daySales[0].day}: ${data.daySales[0].unitsSold} units</div>
          <div class="metric">${data.daySales[1].day}: ${data.daySales[1].unitsSold} units</div>
        </div>
      </section>
      <section class="section-block">
        <h2>Distributor inventory demand</h2>
        <table class="data-table">
          <thead><tr><th>Distributor</th><th>Region</th><th>SKU demand</th><th>Inventory</th></tr></thead>
          <tbody>${distributorRows}</tbody>
        </table>
      </section>
      <section class="section-block">
        <h2>Package tracking</h2>
        <table class="data-table">
          <thead><tr><th>Tracking ID</th><th>Distributor</th><th>Status</th><th>Location</th></tr></thead>
          <tbody>${trackingRows}</tbody>
        </table>
      </section>
    </main>`;
  return renderLayout('Dashboard', body);
}

function renderErrorPage(message) {
  const body = `
    <main class="error-page">
      <section class="auth-card">
        <p class="eyebrow">404</p>
        <h1>${escapeHtml(message)}</h1>
        <p>The page you requested is not available. Return to the Drinkoo home page to continue exploring.</p>
        <a class="button primary" href="/">Back home</a>
      </section>
    </main>`;
  return renderLayout('Error', body);
}

function getProductBySku(sku) {
  return data.products.find((product) => product.sku === sku);
}

function setCookie(res, name, value, ttlSeconds = 60 * 60) {
  const expires = new Date(Date.now() + ttlSeconds * 1000).toUTCString();
  res.setHeader('Set-Cookie', `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; Expires=${expires}`);
}

function clearCookie(res, name) {
  res.setHeader('Set-Cookie', `${name}=; Path=/; Max-Age=0; HttpOnly`);
}

function handleStaticFile(req, res) {
  const urlPath = req.url === '/' ? '/index.html' : decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  const filePath = path.join(rootDir, 'public', urlPath);
  if (!filePath.startsWith(path.join(rootDir, 'public'))) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404); res.end('Not Found'); return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
}

function serve(req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const cookies = parseCookies(req.headers.cookie);

  if (pathname.startsWith('/images/') || pathname.startsWith('/styles.css') || pathname.startsWith('/app.js')) {
    handleStaticFile(req, res); return;
  }

  if (pathname === '/api/products') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data.products));
    return;
  }

  if (pathname === '/api/dashboard') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ stateSales: data.stateSales, daySales: data.daySales, distributors: data.distributors }));
    return;
  }

  if (pathname === '/api/chat' && req.method === 'POST') {
    const bodyChunks = [];
    req.on('data', (chunk) => bodyChunks.push(chunk));
    req.on('end', async () => {
      try {
        const rawBody = Buffer.concat(bodyChunks).toString().trim();
        if (!rawBody) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Empty request body' }));
          return;
        }
        const payload = JSON.parse(rawBody);
        const { message, sessionId } = payload;
        if (!message || !sessionId || typeof message !== 'string' || typeof sessionId !== 'string') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid request' }));
          return;
        }
        const reply = await chatbot.processMessage(message, sessionId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply: reply.content }));
      } catch (error) {
        console.error('Chat API error:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON request' }));
      }
    });
    return;
  }

  if (pathname === '/login' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderLoginPage());
    return;
  }

  if (pathname === '/login' && req.method === 'POST') {
    const body = [];
    req.on('data', (chunk) => body.push(chunk));
    req.on('end', () => {
      const form = new URLSearchParams(Buffer.concat(body).toString());
      const username = form.get('username');
      const password = form.get('password');
      if (username === 'admin' && password === 'password') {
        setCookie(res, 'drinkoo_session', 'admin');
        res.writeHead(302, { Location: '/dashboard' });
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(renderLoginPage('Incorrect credentials. Please use admin/password.'));
      }
    });
    return;
  }

  if (pathname === '/signup' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderLoginPage('Sign-ups are disabled for this demo. Please use the admin login.'));
    return;
  }

  if (pathname === '/dashboard') {
    if (cookies.drinkoo_session !== 'admin') {
      res.writeHead(302, { Location: '/login' });
      res.end();
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderDashboardPage());
    return;
  }

  if (pathname === '/logout') {
    clearCookie(res, 'drinkoo_session');
    res.writeHead(302, { Location: '/' });
    res.end();
    return;
  }

  if (pathname === '/add-to-cart') {
    const sku = parsedUrl.searchParams.get('sku');
    const product = getProductBySku(sku);
    if (product) {
      const currentCart = cookies.drinkoo_cart ? cookies.drinkoo_cart.split(',') : [];
      if (!currentCart.includes(sku)) currentCart.push(sku);
      setCookie(res, 'drinkoo_cart', currentCart.join(','));
      res.writeHead(302, { Location: '/cart' });
      res.end();
    } else {
      res.writeHead(302, { Location: '/error' });
      res.end();
    }
    return;
  }

  if (pathname === '/cart') {
    const cartSkus = (cookies.drinkoo_cart || '').split(',').filter(Boolean);
    const cartItems = cartSkus.map((sku) => getProductBySku(sku)).filter(Boolean);
    clearCookie(res, 'drinkoo_cart');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderCartPage(cartItems, cartItems.length ? 'Added to your cart successfully.' : ''));
    return;
  }

  if (pathname === '/error') {
    const reason = parsedUrl.searchParams.get('from') === 'buy-now' ? 'Buy Now is currently redirected to a friendly error page for this demo.' : 'The page you requested is not available.';
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderErrorPage(reason));
    return;
  }

  if (pathname.startsWith('/product/') || pathname.startsWith('/sku/')) {
    const slug = pathname.startsWith('/product/') ? pathname.replace('/product/', '') : pathname.replace('/sku/', '');
    const product = data.products.find((item) => item.slug === slug);
    if (product) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(renderProductPage(product));
      return;
    }
  }

  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderHomePage());
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(renderErrorPage('This page is not available yet.'));
}

const server = http.createServer(serve);
server.listen(port, () => {
  console.log(`Drinkoo website running at http://localhost:${port}`);
});

