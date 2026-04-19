export const influencerService = {
  async getTopInfluencers() { return []; },
  async getNetwork() { return { nodes: [], edges: [] }; },
  async getReach(influencerId: string) { return { influencerId, reach: 0 }; },
};
