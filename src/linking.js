const config = {
    screens: {
        Notification: {
            path:'Notification'
        },
        Detail: {
            path: 'Detail/:id',
            parse: {
                id: (id) => `${id}`
            }
        },
        Bag: {
            path: 'Bag'
        }
    }
}

const linking = {
    prefixes: ['myntra://app','https://myntra.com', 'https://myntra.page.link'],
    config
}

export default linking