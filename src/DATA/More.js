const MORE = [
    {
        id: 1,
        title: 'Payment/Refund',
        category: [
            {
                id: 1,
                title: "My return was picked up but I haven't received my refund yet",
            },
            {
                id: 2,
                title: 'My payment has been debited mutiple times'
            },
            {
                id: 12,
                title: 'Other'
            },
        ]
    },
    {
        id: 2,
        title: 'Offers, Discounts, Coupons',
        category: [
            {
                id: 4,
                title: 'My coupon got locked'
            },
            {
                id: 5,
                title: 'I am unable to apply coupon'
            },
            {
                id: 12,
                title: 'Other'
            },
        ]
    },
    {
        id: 3,
        title: 'Manage You Account',
        category: [
            {
                id: 7,
                title: 'I am unable to login to my account'
            },
            {
                id: 8,
                title: 'I want to unsubscribe from promotional emails and SMS'
            },
            {
                id: 12,
                title: 'Other'
            }
        ]

    },
    {
        id: 4,
        title: 'Other',
        category: [
            {
                id: 10,
                title: 'I have an issue with the mobile app'
            },
            {
                id: 11,
                title: 'I have a query on return / exchange process'
            },
            {
                id: 12,
                title: 'Other'
            }
        ]
    }
]

const CATEGORYCONTENT = [
    {
        id: 1,
        data: [
            {
                id: 1,
                content: 'Refund will be inititated after we receive the iten and it passes the quality check.'
            },
            {
                id: 2,
                content: 'Refund time depends on the mode of refund: '
            },
            {
                id: 3,
                title: 'Bank Account:',
                content: 'Time the item takes to reach us + 1 to 3 business days.'
            },
            {
                id: 4,
                title: 'Online Refund: ',
                content: 'Time the item takes to reach us + 7 to 10 business days.'
            },
        ]
    },
    {
        id: 2,
        data: [
            {
                id: 1,
                content: 'We are sorry that your payment got debited multiple times. The extra amount debited from your bank/card account will be automatically refunded.'
            },
            {
                id: 2,
                content: 'Refund time depends on the mode of payment:'
            },
            {
                id: 3,
                title: 'Online Refund:',
                content: '7 to 10 business days'
            },
            {
                id: 4,
                title: 'PhonePe Wallet:',
                content: '1 to 3 business days'
            }
        ]
    },
    {
        id: 4,
        data: [
            {
                id: 1,
                content: 'A locked coupon will automatically be unlocked in 3 hours.'
            }
        ]
    },
    {
        id: 5,
        data: [
            {
                id: 1,
                content: 'You can apply a coupon on a cart page before you place an order.'
            },
            {
                id: 2,
                content: "The complete list of your unused and valid coupons is available under the 'My Account -> Coupons' section. "
            }
        ]
    },
    {
        id: 7,
        data: [
            {
                id: 1,
                content: "You can recover your password using the 'Forget Password' link in the login page. If you are still unable to access your account, then please call our customer care "
            }
        ]
    },
    {
        id: 8,
        data: [
            {
                id: 1,
                content: "To unsubscribe from promotional SMSes please email us."
            },
            {
                id: 2,
                title: 'AND:',
            },
            {
                id: 3,
                content: 'To unsubscribe from promotional emails please click on unsubscribe link on the emails you have received'
            }
        ]
    },
    {
        id: 10,
        data: [
            {
                id: 1,
                content: 'Sorry! We are not able to recommend a solution. Please get in touch using the Contact Us otpion below.'
            }
        ]
    },
    {
        id: 11,
        data: [
            {
                id: 1,
                title: 'When will the return product be picked up?',
                content: 'Within 7 business days once treutnr request is created.'
            },
            {
                id: 2,
                title: 'When will I get the refund?',
                content: 'Refund will be initiated after we receive the item and it passes the quality check.'
            },
            {
                id: 3,
                content: 'Refund time depends on the mode of refund: '
            },
            {
                id: 4,
                title: 'Bank Account: ',
                content: 'Time the item takes to reach us + 1 to 3 business days.'
            },
            {
                id: 5,
                title: 'Online Refund: ',
                content: 'Time the items takes to reach us + 7 to 10 business days.'
            },
            {
                id: 6,
                title: 'PhonePe Wallet: ',
                content: 'Time the item takes to reach us + 1 business day.'
            }
        ]
    },
    {
        id: 12,
        data: [
            {
                id: 1,
                content: 'Sorry! We are not able to recommend a solution. Please get in touch using the Contact Us option below.'
            }
        ]
    }
]

export default MORE
export { CATEGORYCONTENT }