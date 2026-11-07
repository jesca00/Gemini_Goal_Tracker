import { initTheme } from './themes.js';
import { initNavigation } from './navigation.js';
import { initChecklist } from './checklist.js';
import { initDatePicker } from './date-picker.js';
import { saveGoal } from './goals.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initChecklist();

    // Initialize Custom Date Picker for inputs
    initDatePicker('.custom-date-trigger');

    // Modal Controls
    const modal = document.getElementById('goal-modal');
    const openModalBtn = document.getElementById('open-create-goal-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelGoalBtn = document.getElementById('cancel-goal-btn');
    const goalForm = document.getElementById('goal-form');

    openModalBtn.addEventListener('click', () => {
        goalForm.reset();
        document.getElementById('goal-id').value = '';
        document.getElementById('modal-title').textContent = 'Create New Goal';
        modal.classList.add('active');
    });

    const closeModal = () => modal.classList.remove('active');
    closeModalBtn.addEventListener('click', closeModal);
    cancelGoalBtn.addEventListener('click', closeModal);

    goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const goalData = {
            id: document.getElementById('goal-id').value || null,
            title: document.getElementById('goal-title-input').value,
            description: document.getElementById('goal-desc-input').value,
            startDate: document.getElementById('goal-start-input').value,
            endDate: document.getElementById('goal-end-input').value,
            minimum: document.getElementById('goal-minimum-input').value
        };

        saveGoal(goalData);
        closeModal();
   
     initChecklist();
    });

    // Cursor Glow
    const glow = document.getElementById('cursor-glow');
    if (window.matchMedia('(pointer: fine)').matches) {
        glow.style.display = 'block';
        window.addEventListener('mousemove', (e) => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
    }

    // Hide Loading Screen
    setTimeout(() => {
        const loading = document.getElementById('loading-screen');
        loading.classList.add('fade-out');
    }, 300);
});
