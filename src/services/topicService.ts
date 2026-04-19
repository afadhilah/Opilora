export const topicService = {
  async getTopics() { return []; },
  async getTrending() { return []; },
  async getEvolution(topicId: string) { return { topicId, data: [] }; },
};
