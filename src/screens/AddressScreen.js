import { View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Profile/Header'
import AddressBody from '../components/Profile/Address/AddressBody'
import Overlay from '../components/Reusable/Overlay'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setAddress } from '../redux/addressSlice'
import DATA from '../constants/AddressData'
import { useNavigation } from '@react-navigation/native'

const AddressScreen = () => {

    const [loaded, setLoaded] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const { theme } = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            dispatch(setAddress(DATA))
            setLoaded(true)
        }, 1000)
    }, [])

    const onBackPress = _ => {
        if (showForm) setShowForm(false)
        else navigation.goBack()
    }

    return (
        <View style={{ flex: 1 }}>
            <Header backPressHandler={onBackPress} title='ADDRESS' />
            <View style={{ flex: 1 }}>
                {loaded ?
                    <AddressBody showForm={showForm} setShowForm={setShowForm} /> :
                    <Overlay hideShadow={(theme === 'light')} render={true} />
                }
            </View>
        </View>
    )
}

export default AddressScreen