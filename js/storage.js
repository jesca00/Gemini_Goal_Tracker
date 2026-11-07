const STORAGE_KEY = 'consistency_tracker_data_v1';

export function loadData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { goals: [], completions: {}, celebrations: {} };
        return JSON.parse(raw);
    } catch (e) {
        console.error('Failed to load data from localStorage', e);
        return { goals: [], completions: {}, celebrations: {} };
    }
}

export function saveData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save data to localStorage', e);
    }
}

