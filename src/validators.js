import * as yup from 'yup'

const phoneValidator = phone => !isNaN(+phone) && phone.length === 10 && phone.indexOf(',') === -1 && phone.indexOf('.') === -1

const emailValidator = email => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)

const passwordValidator = value => value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value) && /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value)

const addressValidationSchema = yup.object().shape({
    name: yup.string('Enter valid name').required('Name is required').min(3, 'Enter valid name'),
    mobileNumber: yup
        .string()
        .test('phone-number', 'Enter valid mobile number', function (value) {
            if (!value) return false
            if (!isNaN(+value) && value.length === 10) return true

            return false
        })
        .required('Mobile number is required'),
    pincode: yup.string()
        .test('pin-code', 'Enter valid pincode', function (value) {
            if (!value) return false
            if (!isNaN(+value) && value.length === 6) return true

            return false
        })
        .required('Pincode is required'),
    addr: yup.string('Enter valid address').min(5, 'Enter valid address').required('Address is required'),
    state: yup.string('Enter valid state name').required('State is required'),
    locality: yup.string('Enter valid town/locality').required('Town or locality is required'),
    city: yup.string('Enter valid city').required('City is required'),
    typeOfAddress: yup.string().required('Address type is required').nullable()
})

export { phoneValidator, emailValidator, passwordValidator, addressValidationSchema }