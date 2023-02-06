import Toast from "react-native-root-toast"

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const substring = (text, maxLength) => text.length > maxLength ? text.substring(0, maxLength - 2) + '...' : text

const calculateDiscount = (price, percentage) => (((100 - percentage) * +price) / 100).toFixed()

const formatCurrency = price => price.toLocaleString('en-GB', { style: 'currency', currency: 'INR' })

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

const kFormatter = num => Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)

const showToast = msg => Toast.show(msg, { duration: Toast.durations.LONG, position: Toast.positions.BOTTOM })

const calculateDiscountedPrice = (price, percentage) => Math.round(+price * ((100 - percentage) / 100))

const transform = bagItems => {
    let selected = []
    let items = []
    let itemIds = []

    bagItems.forEach(item => {
        let newItem = {
            id: item.productId + item.selectedSize,
            clothId: item.productId,
            brand: item.brand,
            name: item.productName,
            soldBy: item.seller,
            mrp: item.size[item.selectedSize.toLowerCase() + 'amount'],
            qty: item.quantity,
            discount: item.discount,
            image: item.image,
            currentSize: item.selectedSize,
            size: [
                {
                    name: 'XS',
                    available: item.size.xsavailable > 0,
                    maxQty: item.size.xsavailable,
                    amount: item.size.xsamount
                },
                {
                    name: 'S',
                    available: item.size.savailable > 0,
                    maxQty: item.size.savailable,
                    amount: item.size.samount
                },
                {
                    name: 'M',
                    available: item.size.mavailable > 0,
                    maxQty: item.size.mavailable,
                    amount: item.size.mamount
                },
                {
                    name: 'L',
                    available: item.size.lavailable > 0,
                    maxQty: item.size.lavailable,
                    amount: item.size.lamount
                },
                {
                    name: 'XL',
                    available: item.size.xlavailable > 0,
                    maxQty: item.size.xlavailable,
                    amount: item.size.xlamount
                },
                {
                    name: 'XXL',
                    available: item.size.xxlavailable > 0,
                    maxQty: item.size.xxlavailable,
                    amount: item.size.xxlamount
                }
            ]
        }

        items.push(newItem)
        itemIds.push(newItem.id)

        if (item.selected === true) selected.push(newItem.id)
    })

    return {
        selected,
        items,
        itemIds
    }
}

const getSizes = item => {
    return [
        {
            name: 'XS',
            available: item.size.xsavailable > 0,
            maxQty: item.size.xsavailable,
            amount: item.size.xsamount
        },
        {
            name: 'S',
            available: item.size.savailable > 0,
            maxQty: item.size.savailable,
            amount: item.size.samount
        },
        {
            name: 'M',
            available: item.size.mavailable > 0,
            maxQty: item.size.mavailable,
            amount: item.size.mamount
        },
        {
            name: 'L',
            available: item.size.lavailable > 0,
            maxQty: item.size.lavailable,
            amount: item.size.lamount
        },
        {
            name: 'XL',
            available: item.size.xlavailable > 0,
            maxQty: item.size.xlavailable,
            amount: item.size.xlamount
        },
        {
            name: 'XXL',
            available: item.size.xxlavailable > 0,
            maxQty: item.size.xxlavailable,
            amount: item.size.xxlamount
        }
    ]
}

const transformWishlistData = data => {
    return data.map(item => ({
        clothId: item.productId,
        name: item.productName,
        brand: item.brand,
        soldBy: item.seller,
        mrp: item.mrp,
        discount: item.discount,
        image: item.image,
        ratings: item.ratings,
        star: item.star,
        size: getSizes(item)
    }))
}

export { substring, calculateDiscount, formatCurrency, months, kFormatter, showToast, calculateDiscountedPrice, transform, transformWishlistData }