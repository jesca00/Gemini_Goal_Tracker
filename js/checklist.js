import { loadData, saveData } from './storage.js';
import { checkStreaks } from './streaks.js';

let currentDateStr = new Date().toISOString().split('T')[0];

export function initChecklist(onUpdate) {
    setupDateNavigation(onUpdate);
    renderChecklist();
}

function setupDateNavigation(onUpdate) {
    const prevBtn = document.getElementById('prev-day-btn');
    const nextBtn = document.getElementById('next-day-btn');
    const label = document.getElementById('selected-day-label');

    updateDateLabel();

    prevBtn.addEventListener('click', () => {
        const d = new Date(currentDateStr);
        d.setDate(d.getDate() - 1);
        currentDateStr = d.toISOString().split('T')[0];
        updateDateLabel();
        renderChecklist();
    });

    nextBtn.addEventListener('click', () => {
        const d = new Date(currentDateStr);
        d.setDate(d.getDate() + 1);
        currentDateStr = d.toISOString().split('T')[0];
        updateDateLabel();
        renderChecklist();
    });
}

function updateDateLabel() {
    const label = document.getElementById('selected-day-label');
    const today = new Date().toISOString().split('T')[0];
    if (currentDateStr === today) {
        label.textContent = 'Today';
    } else {
        label.textContent = currentDateStr;
    }
}

export function renderChecklist() {
    const container = document.getElementById('today-checklist-container');
    const data = loadData();
    container.innerHTML = '';

    const activeGoals = data.goals.filter(g => {
        if (g.status === 'paused') return false;
        return currentDateStr >= g.startDate && currentDateStr <= g.endDate;
    });

    if (activeGoals.length === 0) {
        container.innerHTML = '<p class="text-muted">No active goals for this date.</p>';
        return;
    }

    activeGoals.forEach(goal => {
        const isCompleted = data.completions[goal.id]?.[currentDateStr] || false;

        const card = document.createElement('div');
        card.className = 'checklist-card';
        card.innerHTML = `
            <div class="checklist-item-row">
                <input type="checkbox" data-goal-id="${goal.id}" ${isCompleted ? 'checked' : ''}>
                <span class="checklist-title">${escapeHtml(goal.title)}</span>
            </div>
            <div class="checklist-minimum">Daily minimum: ${escapeHtml(goal.minimum)}</div>
        `;

        const checkbox = card.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', (e) => {
            const checked = e.target.checked;
            if (!data.completions[goal.id]) {
                data.completions[goal.id] = {};
            }
            data.completions[goal.id][currentDateStr] = checked;
            saveData(data);
            checkStreaks(goal, currentDateStr);
        });

        container.appendChild(card);
    });
}

function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

