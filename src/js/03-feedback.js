import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInp: document.querySelector('input[name="email"]'),
  messageInp: document.querySelector('textarea[name="message"]'),
};

refs.emailInp.addEventListener('input', throttle(handleInput, 500));
refs.messageInp.addEventListener('input', throttle(handleInput, 500));
refs.form.addEventListener('submit', formSabmit);
window.addEventListener('load', loadFormData);

const formData = {
  email: '',
  message: '',
};

function handleInput() {
  (formData.email = refs.emailInp.value.trim()),
    (formData.message = refs.messageInp.value.trim()),
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function loadFormData() {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const currentValueForm = JSON.parse(savedData);
    refs.emailInp.value = currentValueForm.email || '';
    refs.messageInp.value = currentValueForm.message || '';
  }
}

function formSabmit(evt) {
  evt.preventDefault();
  handleInput();
  console.log('Form Data:', formData);
  localStorage.removeItem('feedback-form-state');
  refs.emailInp.value = '';
  refs.messageInp.value = '';
}
