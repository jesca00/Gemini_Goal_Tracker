export function renderContributionCalendar(goal, completions) {
    const wrapper = document.createElement('div');
    wrapper.className = 'contribution-calendar';

    const grid = document.createElement('div');
    grid.className = 'calendar-grid';

    const start = new Date(goal.startDate);
    const end = new Date(goal.endDate);
    const today = new Date().toISOString().split('T')[0];

    let curr = new Date(start);
    while (curr <= end) {
        const dateStr = curr.toISOString().split('T')[0];
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';

        const isCompleted = completions[dateStr] || false;
        if (isCompleted) {
            dayEl.classList.add('completed');
        } else if (dateStr > today) {
            dayEl.classList.add('future');
        }

        grid.appendChild(dayEl);
        curr.setDate(curr.getDate() + 1);
    }

    wrapper.appendChild(grid);
    return wrapper;
}

