import { View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Profile/Header'
import AddressBody from '../components/Profile/Address/AddressBody'
import Overlay from '../components/Reusable/Overlay'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addAddress, clearAddresses } from '../redux/addressSlice'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { showToast } from '../utils/utils'
import Config from 'react-native-config'

const AddressScreen = () => {

    const [loaded, setLoaded] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const { theme } = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const getData = async _ => {
        dispatch(clearAddresses())
        if (loaded) setLoaded(false)
        try {
            const result = await axios.get(`${Config.API_KEY}/address`)
            const data = result.data.data
            dispatch(addAddress(data))
        } catch (error) {
            console.log("Error in AddressScreen.js: ", error)
            showToast('Something went wrong while fetching your addresses. Please try again later')
        }
        setLoaded(true)
    }

    useEffect(() => {
        if (!showForm) getData()
    }, [showForm])

    const onBackPress = _ => {
        if (showForm) setShowForm(false)
        else navigation.goBack()
    }

    return (
        <View style={{ flex: 1 }}>
            <Header backPressHandler={onBackPress} title='ADDRESS' />
            <View style={{ flex: 1 }}>
                {loaded ?
                    <AddressBody rerender={getData} showForm={showForm} setShowForm={setShowForm} /> :
                    <Overlay hideShadow={(theme === 'light')} render={true} />
                }
            </View>
        </View>
    )
}

export default AddressScreen