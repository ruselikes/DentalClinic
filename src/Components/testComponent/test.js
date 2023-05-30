document.addEventListener('DOMContentLoaded', function() {
    // Получаем ссылки на элементы
    const personalTab = document.getElementById('personal-tab');
    const appointmentsTab = document.getElementById('appointments-tab');
    const personalContent = document.getElementById('personal-content');
    const appointmentsContent = document.getElementById('appointments-content');
    const upcomingAppointmentsBtn = document.getElementById('upcoming-appointments-btn');
    const pastAppointmentsBtn = document.getElementById('past-appointments-btn');
    const appointmentsList = document.getElementById('appointments-list');

    // Обработчики событий для переключения вкладок
    personalTab.addEventListener('click', function() {
        personalTab.classList.add('active');
        appointmentsTab.classList.remove('active');
        personalContent.style.display = 'block';
        appointmentsContent.style.display = 'none';
    });

    appointmentsTab.addEventListener('click', function() {
        personalTab.classList.remove('active');
        appointmentsTab.classList.add('active');
        personalContent.style.display = 'none';
        appointmentsContent.style.display = 'block';
    });

    // Обработчики событий для кнопок приемов
    upcomingAppointmentsBtn.addEventListener('click', function() {
        // Очищаем список приемов
        appointmentsList.innerHTML = '';

        // TODO: Загрузка и отображение предстоящих приемов
    });

    pastAppointmentsBtn.addEventListener('click', function() {
        // Очищаем список приемов
        appointmentsList.innerHTML = '';

        // TODO: Загрузка и отображение прошедших приемов
    });

    // По умолчанию отображаем вкладку "Личный кабинет"
    personalTab.click();
});