/**
 * Dashboard Logic
 * Processes user statistics and generates insights.
 */

const Dashboard = {
    getWeakTopics() {
        const mistakes = State.user.stats.mistakes;
        const topicCounts = {};

        mistakes.forEach(m => {
            topicCounts[m.topic] = (topicCounts[m.topic] || 0) + 1;
        });

        const sorted = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);
        return sorted.length > 0 ? sorted[0][0] : 'Tiada';
    },

    generateAnalysisReport() {
        const stats = State.user.stats;
        const weakTopic = this.getWeakTopics();

        document.getElementById('stat-weak').textContent = weakTopic;

        // Detailed log
        const tableBody = document.querySelector('#records-table tbody');
        if (stats.mistakes.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4">Tahniah! Tiada kesilapan direkodkan.</td></tr>';
        }
    }
};

// Hook into UI.renderDashboard
const originalRender = UI.renderDashboard;
UI.renderDashboard = function() {
    originalRender.call(UI);
    Dashboard.generateAnalysisReport();
};
