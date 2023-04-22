const openFormBtn = document.querySelector('#open-form-btn');
const serviceFormContainer = document.querySelector('#service-form-container');

openFormBtn.addEventListener('click', () => {
    serviceFormContainer.classList.add('open');
});

serviceFormContainer.addEventListener('click', (e) => {
    if (e.target === serviceFormContainer) {
        serviceFormContainer.classList.remove('open');
    }
});