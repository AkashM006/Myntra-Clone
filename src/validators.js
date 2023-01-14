const phoneValidator = phone => !isNaN(+phone) && phone.length === 10 && phone.indexOf(',') === -1 && phone.indexOf('.') === -1

const emailValidator = email => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)

export { phoneValidator, emailValidator }