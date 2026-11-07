import { loadData, saveData } from './storage.js';

export function checkStreaks(goal, dateStr) {
    const data = loadData();
    const goalCompletions = data.completions[goal.id] || {};
    
    let streak = 0;
    let curr = new Date(dateStr);

    while (true) {
        const dStr = curr.toISOString().split('T')[0];
        if (dStr < goal.startDate) break;
        if (goalCompletions[dStr]) {
            streak++;
            curr.setDate(curr.getDate() - 1);
        } else {
            break;
        }
    }

    if (streak > 0 && streak % 7 === 0) {
        const milestoneKey = `${goal.id}_streak_${streak}`;
        if (!data.celebrations[milestoneKey]) {
            data.celebrations[milestoneKey] = true;
            saveData(data);
            triggerCelebration(goal);
        }
    }
}

function triggerCelebration(goal) {
    const overlay = document.getElementById('celebration-overlay');
    const msg = document.getElementById('celebration-message');
    msg.textContent = `Yay! You accomplished "${goal.minimum}" for seven consecutive days!`;
    overlay.classList.add('active');

    document.getElementById('dismiss-celebration').onclick = () => {
        overlay.classList.remove('active');
    };
}

