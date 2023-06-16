import { StyleSheet, View } from 'react-native'
import React from 'react'

const Section = (props) => {
    const {
        children, style, bg, height, width,
        center, row, selfCenter, justify, radius,
        space, spaceX, spaceY, spaceT, spaceB, spaceL, spaceR,
        fill, fillX, fillY, fillT, fillB, fillL, fillR,
        brW, brTW, brBW, brLW, brRW,
        brC, brTC, brBC, brLC, brRC,
    } = props
    return (
        <View style={[{
            height: height,
            width: width,
            backgroundColor: bg,
            alignItems: center && 'center',
            flexDirection: row && 'row',
            alignSelf: selfCenter && 'center',
            justifyContent: justify,
            borderRadius: radius,
            borderWidth:brW, borderTopWidth:brTW, borderBottomWidth:brBW, borderLeftWidth:brLW, borderRightWidth:brRW,
            borderColor:brC, borderTopColor:brTC, borderBottomColor:brBC, borderLeftColor:brLC, borderRightColor:brRC,
            margin: space,
            marginHorizontal: spaceX,
            marginVertical: spaceY,
            marginTop: spaceT,
            marginBottom: spaceB,
            marginLeft: spaceL,
            marginRight: spaceR,
            padding: fill,
            paddingHorizontal: fillX,
            paddingVertical: fillY,
            paddingTop: fillT,
            paddingBottom: fillB,
            paddingLeft: fillL,
            paddingRight: fillR,
        }, style]}>
            {children}
        </View>
    )
}

export default React.memo(Section)

const styles = StyleSheet.create({})