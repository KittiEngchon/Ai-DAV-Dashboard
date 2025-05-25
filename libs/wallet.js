// libs/wallet.js

const Wallet = {
  address: null,
  chainId: null,

  async connect() {
    if (typeof window.ethereum === 'undefined') {
      UI.showToast('🔌 กรุณาติดตั้ง Metamask ก่อน', 'error');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.address = accounts[0];
      this.chainId = await this.getChainId();
      UI.showToast('🦊 Wallet เชื่อมต่อแล้ว', 'success');
      return this.address;
    } catch (err) {
      UI.showToast('❌ ยกเลิกการเชื่อมต่อ Wallet', 'error');
      return null;
    }
  },

  async getChainId() {
    const hexId = await window.ethereum.request({ method: 'eth_chainId' });
    return parseInt(hexId, 16);
  },

  async switchNetwork(targetChainId, chainData = {}) {
    const hexId = '0x' + targetChainId.toString(16);
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexId }]
      });
      UI.showToast('🔁 สลับเครือข่ายสำเร็จ', 'success');
    } catch (err) {
      // ถ้ายังไม่มี chain นี้ ให้เพิ่ม
      if (err.code === 4902 && chainData.chainId && chainData.rpcUrls) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [chainData]
        });
      } else {
        UI.showToast('⚠️ ไม่สามารถสลับเครือข่ายได้', 'error');
      }
    }
  },

  onAccountChanged(callback) {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        this.address = accounts[0] || null;
        callback(this.address);
      });
    }
  },

  onChainChanged(callback) {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }
};
