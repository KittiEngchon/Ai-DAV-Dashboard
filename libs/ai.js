// libs/ai.js

/**
 * ดึงข้อมูล AI Profiles จาก JSON ไฟล์
 * @returns {Promise<Array>} รายชื่อ AI ทั้งหมด
 */
export async function loadAIProfiles() {
  const res = await fetch('/data/ai-profiles.json');
  if (!res.ok) throw new Error('โหลดข้อมูล ai-profiles ล้มเหลว');
  return await res.json();
}

/**
 * คำนวณ Trust Score ของ AI ตามกฎเบื้องต้น
 * @param {Object} ai AI profile object
 * @returns {number} Trust Score 0-100
 */
export function calculateTrustScore(ai) {
  let score = 50;

  // เพิ่มคะแนนหาก AI มีกิจกรรมล่าสุด
  if (ai.activity && ai.activity.length > 5) score += 10;

  // เพิ่มหาก AI มี Wallet ที่ขึ้นต้นด้วย 0x และมีความยาวปกติ
  if (ai.wallet && ai.wallet.startsWith('0x') && ai.wallet.length >= 10) score += 10;

  // เพิ่มจาก GiG ID ที่ไม่ซ้ำซ้อน
  if (ai.gig && ai.gig.includes('DEV')) score += 10;

  // ค่าต่ำสุด-สูงสุด
  return Math.min(100, Math.max(0, score));
}

/**
 * ตรวจสอบว่า AI เปิดการทำงานอยู่หรือไม่
 * @param {string} id รหัส AI เช่น AI-01
 * @returns {boolean}
 */
export function isAIActive(id) {
  const key = `ai-status-${id}`;
  const val = localStorage.getItem(key);
  return val !== 'off'; // ค่าเริ่มต้นถือว่าเปิด
}

/**
 * สลับสถานะการทำงานของ AI (เปิด/ปิด)
 * @param {string} id รหัส AI
 */
export function toggleAIStatus(id) {
  const key = `ai-status-${id}`;
  const current = localStorage.getItem(key);
  localStorage.setItem(key, current === 'off' ? 'on' : 'off');
}

/**
 * รับสถานะโซเชียลที่เปิดใช้งานของ AI
 * @param {string} id รหัส AI
 * @returns {Object} เช่น { twitter: true, github: false, discord: true }
 */
export function getAISocialStatus(id) {
  const raw = localStorage.getItem(`ai-social-${id}`);
  return raw ? JSON.parse(raw) : { twitter: true, github: true, discord: true };
}

/**
 * ตั้งค่าสถานะโซเชียล
 * @param {string} id 
 * @param {Object} status เช่น { twitter: true, github: false }
 */
export function setAISocialStatus(id, status) {
  localStorage.setItem(`ai-social-${id}`, JSON.stringify(status));
}
