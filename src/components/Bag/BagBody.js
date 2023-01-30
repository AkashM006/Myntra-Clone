import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BagEmpty from './BagEmpty'
import BagList from './BagList'
import Overlay from '../Reusable/Overlay'
import DATA from '../../constants/Data'
import { setBag } from '../../redux/bagSlice'
import { transform } from '../../utils/utils'

const BagBody = () => {

    const { items } = useSelector(state => state.bag)
    const [loaded, setLoaded] = useState(false)
    const { colors } = useSelector(state => state.theme)
    const dispatch = useDispatch()

    useEffect(() => {
        // in this useEffect
        // load items from server
        // then setLoaded true
        // todo: After fetching call transfrom function
        let result = transform(DATA)
        dispatch(setBag(result))
        setTimeout(() => setLoaded(true), 1000)
    }, [])



    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            {
                loaded === true ? items.length === 0 ? <BagEmpty /> : <BagList /> : <Overlay render={true} hideShadow />
            }
        </View>
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