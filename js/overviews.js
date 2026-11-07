import { loadData } from './storage.js';
import { renderContributionCalendar } from './calendar.js';

export function renderOverviews() {
    const container = document.getElementById('goal-overviews-container');
    const data = loadData();
    container.innerHTML = '';

    if (data.goals.length === 0) {
        container.innerHTML = '<p class="text-muted">No goals created yet.</p>';
        return;
    }

    data.goals.forEach(goal => {
        const card = document.createElement('div');
        card.className = 'goal-card';
        card.innerHTML = `
            <div class="goal-card-header">
                <h3>${goal.title}</h3>
                <span class="text-muted">${goal.startDate} to ${goal.endDate}</span>
            </div>
            <p><strong>Daily Minimum:</strong> ${goal.minimum}</p>
        `;

        const completions = data.completions[goal.id] || {};
        const calendarEl = renderContributionCalendar(goal, completions);
        card.appendChild(calendarEl);

        container.appendChild(card);
    });
}

