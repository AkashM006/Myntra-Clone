const phoneValidator = phone => !isNaN(+phone) && phone.length === 10 && phone.indexOf(',') === -1 && phone.indexOf('.') === -1

const emailValidator = email => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)

const passwordValidator = value => value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value) && /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value)

export { phoneValidator, emailValidator, passwordValidator }