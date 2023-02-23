import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../Reusable/CustomButton'
import { setSelected } from '../../../redux/addressSlice'

const StickyFooter = ({ hideForm, onSubmit }) => {

    const { colors } = useSelector(state => state.theme)
    const dispatch = useDispatch()

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <View style={{ width: '45%' }}>
                <CustomButton
                    bgColor={colors['SHADELIGHT']}
                    text='CANCEL'
                    top={0}
                    onPressHandler={() => {
                        hideForm()
                        dispatch(setSelected(null))
                    }}
                />
            </View>
            <View style={{ width: '45%' }}>
                <CustomButton
                    text='SAVE'
                    top={0}
                    onPressHandler={onSubmit}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: '5%',
        elevation: 5
    }
})

export default StickyFooter