// libs/review.js

const Review = {
  reviews: [],
  tokensAllowed: [],

  async load(appId) {
    try {
      const res = await fetch(`data/reviews.json`);
      const all = await res.json();
      this.reviews = all.filter(r => r.appId === appId);
      return this.reviews;
    } catch (err) {
      console.error('Error loading reviews:', err);
      return [];
    }
  },

  async loadAllowedTokens() {
    try {
      const res = await fetch(`data/tokens.json`);
      this.tokensAllowed = await res.json();
    } catch (err) {
      console.error('Error loading tokens:', err);
    }
  },

  async checkTokenOwnership(userAddress) {
    if (!window.ethereum || !userAddress || this.tokensAllowed.length === 0) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    for (const token of this.tokensAllowed) {
      const contract = new ethers.Contract(token.address, ['function balanceOf(address) view returns (uint256)'], signer);
      const balance = await contract.balanceOf(userAddress);
      if (balance.gt(0)) return true;
    }
    return false;
  },

  async submit(appId, userAddress, rating, comment) {
    if (!appId || !userAddress || !rating || !comment) {
      UI.showToast('กรุณากรอกข้อมูลให้ครบ', 'error');
      return;
    }

    const hasAccess = await this.checkTokenOwnership(userAddress);
    if (!hasAccess) {
      UI.showToast('คุณไม่มีสิทธิ์รีวิว (ต้องถือ Token ที่กำหนด)', 'error');
      return;
    }

    const review = {
      appId,
      userAddress,
      rating,
      comment,
      timestamp: Date.now()
    };

    this.reviews.push(review);
    UI.showToast('✅ รีวิวสำเร็จ (บันทึกเฉพาะฝั่ง client)', 'success');

    // NOTE: จริงๆ แล้วควรส่ง review นี้ไปยัง backend หรือ IPFS (ยังไม่รองรับในเวอร์ชันนี้)
  },

  getAverageRating(appId) {
    const filtered = this.reviews.filter(r => r.appId === appId);
    if (filtered.length === 0) return 0;
    const sum = filtered.reduce((acc, r) => acc + r.rating, 0);
    return sum / filtered.length;
  }
};
