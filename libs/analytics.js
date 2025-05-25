// libs/analytics.js

/**
 * เก็บการเข้าชมหน้าปัจจุบันลง localStorage
 */
export function trackPageVisit() {
  const key = `visit:${window.location.pathname}`;
  const count = parseInt(localStorage.getItem(key) || '0', 10);
  localStorage.setItem(key, count + 1);
}

/**
 * เก็บ log ว่า AI ตัวไหนถูกคลิกดู
 * @param {string} aiId รหัส AI เช่น "AI-01"
 */
export function logAIClick(aiId) {
  const logs = JSON.parse(localStorage.getItem('aiClicks') || '{}');
  logs[aiId] = (logs[aiId] || 0) + 1;
  localStorage.setItem('aiClicks', JSON.stringify(logs));
}

/**
 * อ่านข้อมูล log click ทั้งหมด
 * @returns {Object} เช่น { "AI-01": 5, "AI-02": 2 }
 */
export function getAIClickStats() {
  return JSON.parse(localStorage.getItem('aiClicks') || '{}');
}

/**
 * สถิติเข้าชมแต่ละหน้า
 * @returns {Object} เช่น { "/index.html": 3, "/ai-profile.html": 7 }
 */
export function getPageVisitStats() {
  const result = {};
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('visit:')) {
      result[key.replace('visit:', '')] = parseInt(localStorage.getItem(key), 10);
    }
  });
  return result;
}
