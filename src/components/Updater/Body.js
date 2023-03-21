import React from 'react'
import { formatBytes } from '../../utils/utils'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'

const Body = ({ update }) => {
    
    let description = update?.description
    const mandatory = update?.isMandatory
    const {colors} = useSelector(state => state.theme)

    if (!description) {
        if (mandatory)
            description = 'A mandatory update was launched by the team and is available to download and install. You must update the app to continue browsing clothes.'
        else
            description = 'An update was launched by the team and is available to download and install. Please install to enjoy a better experience.'
    }

  return (
        <CustomText top={10} size={14} color={colors['SHADEDARK']}>
              {description}
        </CustomText>
  )
}

export default Body

