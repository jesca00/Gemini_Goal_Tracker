import { renderChecklist } from './checklist.js';
import { renderOverviews } from './overviews.js';
import { renderMonthlyPlanner } from './monthly.js';

export function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetId = btn.dataset.target;
            document.querySelectorAll('.app-section').forEach(sec => {
                sec.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');

            if (targetId === 'section-today') renderChecklist();
            if (targetId === 'section-overviews') renderOverviews();
            if (targetId === 'section-monthly') renderMonthlyPlanner();
        });
    });
}

