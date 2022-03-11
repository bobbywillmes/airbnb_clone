export function displaySignupErrors(errors) {
  const originalHelpText = {
    email: 'We\'ll never share your email with anyone else',
    password: 'A strong & unique password',
    username: 'Your public username on Airbnb'
  }
  const formInputs = document.querySelectorAll('#signup .form-control')
  // loop through each form input
  formInputs.forEach(input => {
    // get the input type & help-text element below it
    const inputType = input.getAttribute('name')
    const elName = `#signup${inputType}help`
    const helpEl = document.querySelector(elName)
    // if no error: return help-text to original message, then skip to next input
    if (errors[inputType] == undefined) {
      helpEl.innerHTML = originalHelpText[inputType]
      helpEl.classList.remove('error')
      return
    }
    // build error message
    const inputTypeTitle = inputType[0].toUpperCase() + inputType.substring(1)
    let errorText = inputTypeTitle + ': '
    errors[inputType].forEach(msg => {
      // skip 'can't be blank' error, next error will show min required length
      if (msg == `can't be blank` & errors[inputType].length > 1) { return }
      errorText += msg
    })
    helpEl.classList.add('error')
    helpEl.innerHTML = errorText
  })
}