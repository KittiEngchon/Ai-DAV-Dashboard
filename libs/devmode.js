// libs/devmode.js

const DevMode = {
  enabled: false,

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('devmode', this.enabled);
    UI.toast(this.enabled ? '🛠 Dev Mode ON' : '🛑 Dev Mode OFF');
    this.apply();
  },

  load() {
    this.enabled = localStorage.getItem('devmode') === 'true';
    this.apply();
  },

  apply() {
    document.body.classList.toggle('devmode', this.enabled);
    const devTools = document.querySelectorAll('.dev-only');
    devTools.forEach(el => {
      el.style.display = this.enabled ? 'block' : 'none';
    });
  }
};

// โหลด Dev Mode ตอนเริ่ม
document.addEventListener('DOMContentLoaded', () => {
  DevMode.load();
});
