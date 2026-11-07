import { loadData, saveData } from './storage.js';

export function getGoals() {
    return loadData().goals;
}

export function saveGoal(goalData) {
    const data = loadData();
    if (goalData.id) {
        const index = data.goals.findIndex(g => g.id === goalData.id);
        if (index !== -1) {
            data.goals[index] = { ...data.goals[index], ...goalData };
        }
    } else {
        goalData.id = 'goal_' + Date.now();
        goalData.status = 'active'; // active, paused, archived
        data.goals.push(goalData);
    }
    saveData(data);
}

export function deleteGoal(id) {
    const data = loadData();
    data.goals = data.goals.filter(g => g.id !== id);
    saveData(data);
}

export function togglePauseGoal(id) {
    const data = loadData();
    const goal = data.goals.find(g => g.id === id);
    if (goal) {
        goal.status = goal.status === 'paused' ? 'active' : 'paused';
        saveData(data);
    }
}

