import { View } from 'react-native'
import React from 'react'
import Header from '../components/Notifcation/Header'
import { useSelector } from 'react-redux'
import Empty from '../components/Notifcation/Empty'
import Body from '../components/Notifcation/Body'

const NotificationScreen = () => {
    const { data } = useSelector(state => state.notification)
    return (
        <View style={{ flex: 1 }}>
            <Header />
            {
                data.length === 0 ? <Empty /> : <Body />
            }
        </View>
    )
}

export default NotificationScreen