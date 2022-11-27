const substring = (text, maxLength) => text.length > maxLength ? text.substring(0, maxLength - 2) + '...' : text

const calculateDiscount = (price, percentage) => (((100 - percentage) * +price) / 100).toFixed()

const formatCurrency = price => price.toLocaleString('en-GB', { style: 'currency', currency: 'INR' })

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

const kFormatter = num => Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)

export { substring, calculateDiscount, formatCurrency, months, kFormatter }