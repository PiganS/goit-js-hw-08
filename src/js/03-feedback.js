import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInp: document.querySelector('input[name="email"]'),
  messageInp: document.querySelector('textarea[name="message"]'),
};

const handleInput = () => {
  const formData = {
    email: refs.emailInp.value.trim(),
    message: refs.messageInp.value.trim(),
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

refs.emailInp.addEventListener('input', throttle(handleInput, 500));
refs.messageInp.addEventListener('input', throttle(handleInput, 500));

const loadFormData = () => {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const formData = JSON.parse(savedData);
    refs.emailInp.value = formData.email || '';
    refs.messageInp.value = formData.message || '';
  }
};

window.addEventListener('load', loadFormData);
refs.form.addEventListener('submit', formSabmit);

function formSabmit(evt) {
  evt.preventDefault();
  const formData = {
    email: refs.emailInp.value.trim(),
    message: refs.messageInp.value.trim(),
  };
  console.log('Form Data:', formData);

  localStorage.removeItem('feedback-form-state');
  refs.emailInp.value = '';
  refs.messageInp.value = '';
}
