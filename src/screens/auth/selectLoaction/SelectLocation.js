import { View, Text } from 'react-native'
import React from 'react'
import { COLOR } from '../../../enums/StyleGuide'
import { AppHeader, Label } from '../../../components'
import { En } from '../../../enums/AppEnums'

const SelectLocation = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
      <AppHeader title={'Select Location'} LeftComp={En.BackArrow} />

    </View>
  )
}

export default SelectLocation