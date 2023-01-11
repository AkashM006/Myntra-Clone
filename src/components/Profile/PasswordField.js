import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from '../Reusable/CustomText'

const PasswordField = ({ password, setPassword, setIsPasswordValid, err }) => {

    const [isLong, setIsLong] = useState(false)
    const [hasUpper, setHasUpper] = useState(false)
    const [hasNumber, setHasNumber] = useState(false)
    const [hasSpecial, setHasSpecial] = useState(false)

    useEffect(() => {
        setIsLong(password.length >= 8)
        setHasUpper(/[A-Z]/.test(password))
        setHasNumber(/[0-9]/.test(password))
        setHasSpecial(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))
    }, [password])

    useEffect(() => {
        setIsPasswordValid(isLong && hasUpper && hasNumber && hasSpecial)
    }, [isLong, hasUpper, hasNumber, hasSpecial])

    const backgroundColor = {
        true: '#92dc8f',
        false: '#efefef'
    }

    const color = {
        true: 'white',
        false: 'gray'
    }

    return (
        <View>
            <TextInput
                value={password}
                onChangeText={newValue => setPassword(newValue)}
                style={[styles.input, { borderColor: err !== null ? 'red' : 'lightgray' }]}
                placeholder='Create Password*'
                secureTextEntry={true}
                placeholderTextColor='#aaaaaa'
            />
            <View style={styles.textContainer}>
                <CustomText style={[styles.text, { backgroundColor: backgroundColor[isLong], color: color[isLong] }]}>
                    8 Characters
                </CustomText>
                <CustomText style={[styles.text, { backgroundColor: backgroundColor[hasUpper], color: color[hasUpper] }]}>
                    1 Uppercase
                </CustomText>
                <CustomText style={[styles.text, { backgroundColor: backgroundColor[hasNumber], color: color[hasNumber] }]}>
                    1 Numeric
                </CustomText>
                <CustomText style={[styles.text, { backgroundColor: backgroundColor[hasSpecial], color: color[hasSpecial] }]}>
                    1 Special
                </CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'lightgray',
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        borderRadius: 3,
        color: 'black'
    },
    textContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    text: {
        marginRight: 20,
        color: 'gray',
        backgroundColor: '#efefef',
        marginBottom: 10,
        padding: 2,
        paddingHorizontal: 5,
        borderRadius: 4,
        fontSize: 12
    }
})

export default PasswordField