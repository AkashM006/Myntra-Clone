import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { formatBytes } from '../../utils/utils'
import CustomText from '../Reusable/CustomText'
import CustomButton from '../Reusable/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdate } from '../../redux/userSlice'
import codePush from 'react-native-code-push'
import { useState } from 'react'
import { useEffect } from 'react'
import RnRestart from 'react-native-restart'

const Buttons = ({ update }) => {

  const size = formatBytes(update?.packageSize)
  const { colors } = useSelector(state => state.theme)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const pressHandler = _ => {
    dispatch(setUpdate({
      show: false,
      update
    }))
  }

  const updateHandler = _ => {
    setLoading(true)
    setStatus('Downloading')
    codePush.checkForUpdate()
      .then(remotePackage => {
        setStatus('Downloading')
        return remotePackage.download()
      })
      .then(localPackage => {
        setStatus('Installing')
        return localPackage.install(codePush.InstallMode.ON_NEXT_RESTART)
      })
      .then(response => {
        dispatch(setUpdate({
          show: false,
          update: null
        }))
        codePush.notifyAppReady()
        codePush.restartApp()
      })
      .catch(err => {
        console.log("Error while updating upackage: ", err)
      })
    // codePush.sync({
    //   installMode: codePush.InstallMode.IMMEDIATE,
    // }, (status) => {
    //   switch (status) {
    //     case codePush.SyncStatus.DOWNLOADING_PACKAGE:
    //       setStatus('Downloading Package')
    //       break
    //     case codePush.SyncStatus.INSTALLING_UPDATE:
    //       setStatus('Installing')
    //       break
    //     case codePush.SyncStatus.UPDATE_INSTALLED:
    //       setStatus('Installed')
    //       break
    //     case codePush.SyncStatus.UPDATE_IGNORED:
    //       setStatus('Installed')
    //       break
    //     case codePush.SyncStatus.UP_TO_DATE:
    //       setStatus('Installed')
    //       break
    //   }
    // })
  }

  useEffect(() => {
    if (status === 'Installed') {
      dispatch(setUpdate({
        show: false,
        update: null
      }))
      codePush.notifyAppReady()
      RnRestart.restart()
    }
  }, [status])

  return (
    <View>
      <CustomText vertical={10} weight='light' size={14} color={'#BF9348'}>
        Download Size: {size}
      </CustomText>
      {
        !loading ?
          update?.isMandatory ?
            <CustomButton
              text='Update Now'
              onPressHandler={updateHandler}
            />
            :
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <CustomButton
                  text='NOT NOW'
                  bgColor={colors['LIGHT']}
                  border={{
                    color: colors['PRIMARY'],
                    width: 1
                  }}
                  color={colors['PRIMARY']}
                  onPressHandler={pressHandler}
                />
              </View>
              <View style={styles.button}>
                <CustomButton
                  text='UPDATE'
                  onPressHandler={updateHandler}
                />
              </View>
            </View> :
          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15 }}>
            <ActivityIndicator
              color={colors['PRIMARY']}
              size='small'
            />
            <CustomText left={25} color={colors['DARK']} size={14} weight='light'>
              {status}
            </CustomText>
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    width: '45%'
  }
})

export default Buttons