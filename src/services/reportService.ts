export const reportService = {
  async generateReport(config: { dateRange: { start: string; end: string }; topics: string[] }) { return { id: crypto.randomUUID(), status: 'pending', config }; },
  async getReports() { return []; },
  async downloadReport(reportId: string, format: 'pdf' | 'xlsx') { return { reportId, format, url: '#' }; },
};
