import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSelected } from '../../redux/bagSlice'
import List from './List'

const BagList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setSelected('all'))
    }, [])

    return <List />
}

export default BagList