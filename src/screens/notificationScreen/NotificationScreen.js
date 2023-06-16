import { View, ImageBackground, StatusBar } from 'react-native'
import React from 'react'
import { styles } from './Styles'
import { COLOR, commonStyles, hp, wp } from '../../enums/StyleGuide'
import { Img, Label, Button, Pressable, Section } from '../../components'
import { SCREEN } from '../../enums/AppEnums'

const NotificationScreen = ({ navigation }) => {
    return (
        <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>
           <Label text={'Notification'} />
        </Section>
    )
}

export default NotificationScreen