let currentDpDate = new Date();
let selectedInput = null;
let onSelectCallback = null;

export function initDatePicker(triggerSelector, callback) {
    const triggers = document.querySelectorAll(triggerSelector);
    const modal = document.getElementById('date-picker-modal');
    const cancelBtn = document.getElementById('dp-cancel-btn');
    const selectBtn = document.getElementById('dp-select-btn');
    const prevBtn = document.getElementById('dp-prev-month');
    const nextBtn = document.getElementById('dp-next-month');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            selectedInput = trigger;
            onSelectCallback = callback;
            const val = trigger.value;
            if (val) {
                currentDpDate = new Date(val);
            } else {
                currentDpDate = new Date();
            }
            modal.classList.add('active');
            renderCalendarGrid();
        });
    });

    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    prevBtn.addEventListener('click', () => {
        currentDpDate.setMonth(currentDpDate.getMonth() - 1);
        renderCalendarGrid();
    });

    nextBtn.addEventListener('click', () => {
        currentDpDate.setMonth(currentDpDate.getMonth() + 1);
        renderCalendarGrid();
    });

    selectBtn.addEventListener('click', () => {
        const selectedCell = modal.querySelector('.calendar-day-cell.selected');
        if (selectedCell && selectedInput) {
            const y = selectedCell.dataset.year;
            const m = String(Number(selectedCell.dataset.month) + 1).padStart(2, '0');
            const d = String(selectedCell.dataset.day).padStart(2, '0');
            const dateStr = `${y}-${m}-${d}`;
            selectedInput.value = dateStr;
            if (onSelectCallback) onSelectCallback(dateStr);
        }
        modal.classList.remove('active');
    });
}

function renderCalendarGrid() {
    const grid = document.getElementById('dp-days-grid');
    const label = document.getElementById('dp-month-year-label');
    grid.innerHTML = '';

    const year = currentDpDate.getFullYear();
    const month = currentDpDate.getMonth();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    label.textContent = `${monthNames[month]} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayIndex; i++) {
        const empty = document.createElement('div');
        grid.appendChild(empty);
    }

    for (let d = 1; d <= totalDays; d++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day-cell';
        cell.textContent = d;
        cell.dataset.year = year;
        cell.dataset.month = month;
        cell.dataset.day = d;

        cell.addEventListener('click', () => {
            grid.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('selected'));
            cell.classList.add('selected');
        });

        grid.appendChild(cell);
    }
}

