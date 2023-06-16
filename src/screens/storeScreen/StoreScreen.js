import { ScrollView } from 'react-native'
import React from 'react'
import { COLOR, commonStyles, hp } from '../../enums/StyleGuide'
import { Section, LogoHeader } from '../../components'
import WebView from 'react-native-webview';

const StoreScreen = () => {
  return (
    <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>
      <ScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
        <LogoHeader title={'Go to Store'} textColor={COLOR.WHITE} spaceT={hp(5)} />

        <WebView
          source={{ uri: 'https://mypetsprofile.com' }}
          style={{ flex: 1 }}
        />

      </ScrollView>
    </Section>
  )
}

export default StoreScreen
