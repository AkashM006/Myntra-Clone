import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BagEmpty from './BagEmpty'
import BagList from './BagList'
import Overlay from '../Reusable/Overlay'
import DATA from '../../constants/Data'
import { setBag } from '../../redux/bagSlice'
import { showToast, transform } from '../../utils/utils'
import axios from 'axios'
import Config from 'react-native-config'
import LoaderContext from '../../context/loaderContext'

const BagBody = () => {

    const { items } = useSelector(state => state.bag)
    const [loaded, setLoaded] = useState(false)
    const { colors } = useSelector(state => state.theme)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)

    const refresh = _ => {
        if (!loaded) setLoaded(false)

        axios.get(`${Config.API_KEY}/bag`)
            .then(res => {
                const data = res.data
                if (data.status) {
                    let result = transform(data.data.items)
                    let others = { ...data.data }
                    delete others.items
                    result = { ...result, others }
                    dispatch(setBag(result))
                    setIsLoading(true)
                } else
                    showToast(data.message)
                setLoaded(true)
            })
            .catch(err => {
                console.log("Error: ", err)
                showToast('Something went wrong while fetching your bag. Please try again later')
                setLoaded(true)
            })
    }

    useEffect(() => {
        // in this useEffect
        // load items from server
        // then setLoaded true
        // todo: After fetching call transfrom function
        if (token) refresh()
        // setTimeout(() => {
        //     let result = transform(DATA)
        //     dispatch(setBag(result))
        //     setLoaded(true)
        // }, 1000)
    }, [])


    return (
        <LoaderContext.Provider value={{ loaded: isLoading, setLoaded: setIsLoading, refresh }}>
            <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
                {
                    loaded === true ? !token || items.length === 0 ? <BagEmpty /> : <BagList /> : <Overlay render={true} hideShadow />
                }
            </View>
        </LoaderContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingVertical: '3.5%'
    }
})

export default BagBody