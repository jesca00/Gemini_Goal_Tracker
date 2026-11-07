import { loadData } from './storage.js';
import { deleteGoal, togglePauseGoal } from './goals.js';

export function renderMonthlyPlanner() {
    const container = document.getElementById('monthly-planner-container');
    const data = loadData();
    container.innerHTML = '';

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    months.forEach((month, idx) => {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'goal-card';
        
        const monthNum = String(idx + 1).padStart(2, '0');
        const monthGoals = data.goals.filter(g => g.startDate.startsWith(`2026-${monthNum}`) || g.startDate.includes(`-${monthNum}-`));

        let goalsHtml = monthGoals.map(g => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.4rem 0; border-bottom:1px solid var(--border-color);">
                <span>${g.title} (${g.status})</span>
                <div style="display:flex; gap:0.5rem;">
                    <button class="secondary-btn" data-action="pause" data-id="${g.id}">${g.status === 'paused' ? 'Resume' : 'Pause'}</button>
                    <button class="secondary-btn" data-action="delete" data-id="${g.id}">Delete</button>
                </div>
            </div>
        `).join('') || '<p class="text-muted">No goals planned.</p>';

        monthDiv.innerHTML = `
            <h3 class="handwriting-font">${month}</h3>
            <div style="display:flex; flex-direction:column; gap:0.5rem;">${goalsHtml}</div>
        `;

        monthDiv.querySelectorAll('button[data-action]').forEach(btn => {
            const id = btn.dataset.id;
            if (btn.dataset.action === 'delete') {
                btn.addEventListener('click', () => {
                    deleteGoal(id);
                    renderMonthlyPlanner();
                });
            } else if (btn.dataset.action === 'pause') {
                btn.addEventListener('click', () => {
                    togglePauseGoal(id);
                    renderMonthlyPlanner();
                });
            }
        });

        container.appendChild(monthDiv);
    });
}

