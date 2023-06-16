import {  Text, View } from 'react-native'
import React from 'react'
import { COLOR, FONT, hp } from '../../enums/StyleGuide'

const Label = (props) => {
    const {
        text, textColor, size, textBold, center, style, width,
        space, spaceX, spaceY, spaceT, spaceB, spaceL, spaceR,
        capital
    } = props
    return (
        <View>
            <Text style={[{
                color: textColor ? textColor : COLOR.WHITE,
                fontFamily: textBold ? FONT.PoppinsBold : FONT.PoppinsRegular,
                fontSize: size ? size : hp(1.8),
                textAlign: center && 'center',
                textTransform: capital && 'capitalize',
                width: width,
                margin: space,
                marginHorizontal: spaceX,
                marginVertical: spaceY,
                marginTop: spaceT,
                marginBottom: spaceB,
                marginLeft: spaceL,
                marginRight: spaceR,
            }, style]}
            >
                {text}
            </Text>
        </View>
    )
}

export default React.memo(Label)
