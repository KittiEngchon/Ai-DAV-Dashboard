// libs/ui.js

/**
 * แสดง Toast แจ้งเตือนแบบง่าย
 * @param {string} message ข้อความ
 * @param {string} type success | error | info
 */
export function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg z-50 text-white transition duration-300
    ${type === 'success' ? 'bg-green-600' :
      type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`;
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/**
 * Toggle theme ระหว่าง light/dark
 */
export function toggleTheme() {
  const html = document.documentElement;
  const current = html.classList.contains('dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  html.classList.remove(current);
  html.classList.add(next);
  localStorage.setItem('theme', next);
}

/**
 * โหลด theme ที่เคยตั้งไว้
 */
export function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.classList.add(saved);
}

/**
 * สร้าง Element พาสปอร์ต AI
 * @param {Object} ai ข้อมูล AI
 * @returns {HTMLElement}
 */
export function createAIPassportCard(ai) {
  const card = document.createElement('div');
  card.className = 'bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-4 w-full max-w-sm hover:scale-105 transition transform duration-300';
  card.innerHTML = `
    <div class="flex items-center space-x-4">
      <img src="${ai.avatar}" alt="${ai.name}" class="w-16 h-16 rounded-full border border-zinc-500" />
      <div>
        <h2 class="text-xl font-bold">${ai.name}</h2>
        <p class="text-xs text-zinc-500">DiD: ${ai.did}</p>
      </div>
    </div>
    <div class="mt-2 text-sm text-zinc-400">${ai.role}</div>
    <div class="mt-3 grid grid-cols-2 gap-2 text-xs">
      <div><strong>GiG:</strong> ${ai.gig}</div>
      <div><strong>Wallet:</strong> <code>${ai.wallet.slice(0, 6)}...${ai.wallet.slice(-4)}</code></div>
      <div><strong>Trust:</strong> ${ai.trustScore || '--'}%</div>
      <div><strong>Status:</strong> ${ai.active ? '✅ Active' : '❌ Offline'}</div>
    </div>
    <div class="mt-3">
      <a href="/ai-profile.html?id=${ai.id}" class="inline-block text-blue-500 hover:underline text-sm">ดูโปรไฟล์</a>
    </div>
  `;
  return card;
}
