const substring = (text, maxLength) => text.length > maxLength ? text.substring(0, maxLength - 2) + '...' : text

const calculateDiscount = (price, percentage) => (((100 - percentage) * +price) / 100).toFixed()

const formatCurrency = price => price.toLocaleString('en-GB', { style: 'currency', currency: 'INR' })

export { substring, calculateDiscount, formatCurrency }