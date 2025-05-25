// libs/chat.js

const Chat = {
  logFile: `data/user-chat-log-${new Date().toISOString().slice(0, 10)}.json`,

  async loadLog() {
    try {
      const res = await fetch(this.logFile);
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      console.warn('Chat Log Load Error:', err);
      return [];
    }
  },

  async saveLog(newMsg) {
    // Placeholder: ใช้ API/backend จริงควรทำ POST
    console.log("💬 Save chat (mock):", newMsg);
    // สำหรับโปรเจกต์ local หรือ static site ให้บันทึกฝั่ง client หรือเชื่อมกับระบบ backend ภายหลัง
  },

  async renderChatLog(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const log = await this.loadLog();
    container.innerHTML = '';
    log.forEach(msg => {
      const div = document.createElement('div');
      div.className = 'chat-msg';
      div.innerHTML = `<b>${msg.name}</b>: ${msg.text}`;
      container.appendChild(div);
    });
  }
};
