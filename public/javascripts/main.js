const form = document.querySelector('.needs-validate')
const submitButton = document.querySelector('#submit-btn')

form.addEventListener('submit', function onFormSubmitted (event) {
  if (!form.checkValidity()) {
    event.stopPropagation()
    event.preventDefault()
  }
})

submitButton.addEventListener('click', function onSubmitButtonClicked (event) {
  form.classList.add('was-validated')
})
