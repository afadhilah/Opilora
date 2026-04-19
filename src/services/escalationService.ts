export const escalationService = {
  async getAlerts() { return []; },
  async getRiskScore() { return { score: 43, level: 'medium' }; },
  async getPredictions() { return []; },
};
