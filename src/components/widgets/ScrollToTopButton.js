import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { UpArrow } from '../../assets/svg'
import { ActiveOpacity, COLOR, hp } from '../../enums/StyleGuide'


const ScrollToTopButton = ({onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={ActiveOpacity}
            style={{ position: 'absolute', bottom: 20, end: 20 }}
            onPress={()=> onPress()}>
            <View style={{
                backgroundColor: COLOR.BLUE, height: 51, width: 51, borderRadius: 51 / 2, justifyContent: 'center', alignItems: 'center'
            }}>
                <UpArrow height={hp(1.5)} width={hp(1.5)} />

            </View>

        </TouchableOpacity>
    )
}
export default React.memo(ScrollToTopButton)
