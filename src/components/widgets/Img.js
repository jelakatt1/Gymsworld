import { StyleSheet, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';

const Img = (props) => {
    const {
        src, contain, height, width, imageUrl, style, bg, radius,
        space, spaceX, spaceY, spaceT, spaceB, spaceL, spaceR,
    } = props

    let localStyle = {
        height: height, width: width,
        backgroundColor: bg, borderRadius: radius,
        margin: space,
        marginHorizontal: spaceX,
        marginVertical: spaceY,
        marginTop: spaceT,
        marginBottom: spaceB,
        marginLeft: spaceL,
        marginRight: spaceR,
    }
    return (
        <View>
            {src ?
                <FastImage
                    source={src}
                    style={[localStyle, style]}
                    resizeMode={contain ?
                        FastImage.resizeMode.contain :
                        FastImage.resizeMode.cover
                    }
                />
                :
                <FastImage
                    source={{ uri: imageUrl }}
                    style={[localStyle, style]}
                    resizeMode={contain ?
                        FastImage.resizeMode.contain :
                        FastImage.resizeMode.cover
                    }
                />

            }
        </View>
    )
}

export default React.memo(Img)

const styles = StyleSheet.create({})