// libs/data.js

const Data = {
  async loadJSON(filename) {
    try {
      const res = await fetch(`data/${filename}`);
      if (!res.ok) throw new Error(`Cannot load ${filename}`);
      return await res.json();
    } catch (err) {
      console.error('Data Load Error:', err);
      return [];
    }
  },

  async getApps() {
    return await this.loadJSON('apps.json');
  },

  async getAIProfiles() {
    return await this.loadJSON('ai-profiles.json');
  },

  async getReviews() {
    return await this.loadJSON('reviews.json');
  },

  async getTokens() {
    return await this.loadJSON('tokens.json');
  },

  async getAppById(id) {
    const apps = await this.getApps();
    return apps.find(a => a.id === id);
  },

  async getAIById(id) {
    const ais = await this.getAIProfiles();
    return ais.find(a => a.id === id);
  },

  getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }
};
