import dynamicLinks from '@react-native-firebase/dynamic-links'
import axios from 'axios'
import Config from 'react-native-config'
import { showToast } from './utils'

const getFirebaseDynamicLink = async (link, fallbackURL = 'https://myntra.com') => { // for building a firebase dynamic link

    try {
        // const result = await dynamicLinks().buildLink({
        // domainUriPrefix: Config.DOMAIN_PREFIX,
        // link: `${Config.BASE_WEB_URL}${link}`,
        // android: {
        //     fallbackUrl: fallbackURL,
        //     packageName: 'com.myntra'
        // }
        // })
        const result = await dynamicLinks().buildShortLink({
            domainUriPrefix: Config.DOMAIN_PREFIX,
            link: `${Config.BASE_WEB_URL}${link}`,
            android: {
                fallbackUrl: fallbackURL,
                packageName: 'com.myntra',
            },
        })
        return result
    } catch (err) {
        console.log("Error while building firebase dynamic link: ", err)
        return false
    }
}

const checkClothExists = async id => {
    try {
        const result = await axios.post(`${Config.API_KEY}/products/${id}`)
        if (result) return true
        return false
    } catch (err) {
        console.log("Error while checking if cloth exists")
        return false
    }
    // console.log("ID: ", id)
}

const handleLinking = async (link, navigation) => {
    let { url } = link

    if (!url.startsWith(Config.BASE_WEB_URL)) return

    let rest = url.substring((Config.BASE_WEB_URL + '/').length)

    let route = rest.split('/')

    if (route[0] === 'detail') {
        // get the id and check if it exists and then navigate
        let idx = rest.indexOf('=')
        let clothId = rest.substring(idx + 1)
        let result = checkClothExists(clothId)
        if (result) {
            navigation.navigate('Detail', {
                id: clothId
            })
        } else {
            showToast('Invalid cloth')
        }
    }
}

export { getFirebaseDynamicLink, handleLinking }