import { StyleSheet, View } from 'react-native'
import React, { useState, useRef } from 'react'
import useLocation from '../../hooks/location'
import MapModal from '../modals/mapModal'
import { Label, Pressable } from '../widgets'
import { COLOR, JUSTIFY, TEXT_STYLE, hp } from '../../enums/StyleGuide'
import MapView, { PROVIDER_GOOGLE, Marker, PROVIDER_DEFAULT, Callout } from 'react-native-maps';
import { isIOS } from '../../utils/myUtils'

const LocationField = ({ style, setCurrentLocation, currentLocation, placeName, setplaceName }) => {
    const [isMapModalVisible, setisMapModalVisible] = useState(false)
    const { getCurrentPosition } = useLocation()
    const mapRef = useRef(null)
    return (
        <View style={{ marginVertical: hp(0.5) }}>
            <Label text={'Location'} style={[styles.titleStyle, { marginBottom: hp(0.5) }]} />
            <Pressable
                onClick={() => getCurrentPosition(mapRef, setCurrentLocation, setplaceName)}
                style={[styles.inputStyle, style]} justify={JUSTIFY.center}>
                <Label style={{ ...TEXT_STYLE.text }} text={placeName?.placeName ?? 'Get your location'} textColor={COLOR.LIGHT_GREY} />
            </Pressable>

            {currentLocation?.longitude && currentLocation?.latitude &&
                <Pressable
                    style={{
                        borderRadius: 5,
                        overflow: 'hidden',
                        height: 200,
                        width: '99%',
                        marginVertical: 15,
                    }}
                    activeOpacity={0.8}
                    onPress={() => setisMapModalVisible(true)}
                >
                    <MapView
                        ref={mapRef}
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        initialRegion={{
                            latitude: currentLocation?.latitude,
                            longitude: currentLocation?.longitude,
                            // latitudeDelta: 0.0922,
                            // longitudeDelta: 0.0421,
                            latitudeDelta: isIOS() ? 0.1322 : 0.0922,
                            longitudeDelta: isIOS() ? 0.0821 : 0.0421,
                        }}
                        style={styles.miniMap}
                    >
                        <Marker
                            coordinate={{
                                latitude: currentLocation?.latitude,
                                longitude: currentLocation?.longitude
                            }}

                        />
                    </MapView>
                </Pressable>
            }


            <MapModal
                isVisible={isMapModalVisible}
                onclose={() => { setisMapModalVisible(false) }}
                setLocation={setCurrentLocation}
                location={currentLocation}
                mapRef_={mapRef}
                setPlaceFormatedName={setplaceName}
            />
        </View>
    )
}

export default LocationField

const styles = StyleSheet.create({
    inputStyle: {
        height: hp(5.3), borderRadius: hp(2),
        paddingHorizontal: '5%',
        borderWidth: 1, borderColor: COLOR.LIGHT_GREY,
        justifyContent: 'center',
    },
    titleStyle: {
        ...TEXT_STYLE.small_text, fontSize: 11
    },
    miniMap: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        alignSelf: 'center'
    },
})