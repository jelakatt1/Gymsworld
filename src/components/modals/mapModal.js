import React, { useRef, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Img, Label, Section } from '../../components';
import useLocation from '../../hooks/location';
import { COLOR, FONT, JUSTIFY, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide';
import { isIOS } from '../../utils/myUtils';



const MapModal = (props) => {
    /**
     * STATES AND HOOKS
     * **/
    const mapRef = useRef(null)
    const [coords, setcoords] = useState(props.location)
    const { getPlaceName } = useLocation()


    /**
     * ON CONFIRM POSITION
     * **/

    const onConfirm = () => {
        props?.setLocation(coords)
        getPlaceName(coords.latitude, coords.longitude, props.setPlaceFormatedName)
        props.mapRef_.current.animateCamera({
            center: {
                latitude: coords.latitude,
                longitude: coords.longitude,
            },
            duration: 1000,
        });
        props.onclose()
        // console.log(coords);
    }

    return (
        <Modal
            visible={props.isVisible}
            onRequestClose={() => { props.onclose() }}
            animationType='slide'
        >
            <View style={styles.main}>
                {/* HEADERS */}
                {/* <AppHeader
                    title={'Select Location'}
                    centerComp={<Label style={{ color: 'red' }} textColor={'red'}>centerComp</Label>}
                /> */}
                <Section
                    height={hp(8)} row center spaceY={hp(1)} fillX={'5%'}
                    justify={JUSTIFY.center} spaceT={isIOS() ? hp(2.8) : hp(2)}
                >
                    <Label text={'Select Location'} style={TEXT_STYLE.semi_title} textColor={COLOR.YELLOW} />
                </Section>


                {/* CONTEXT */}
                <View style={{ flex: 1, backgroundColor: COLOR.WHITE }}>

                    <View style={styles.mapContainer}>
                        <MapView
                            // zoomControlEnabled
                            zoomEnabled
                            provider={PROVIDER_GOOGLE}
                            ref={mapRef}
                            initialRegion={{
                                latitude: props?.location?.latitude,
                                longitude: props?.location?.longitude,
                                latitudeDelta: 0.0250,
                                longitudeDelta: 0.0011,

                            }}
                            onRegionChangeComplete={(e) => {
                                setcoords({
                                    latitude: e.latitude,
                                    longitude: e.longitude
                                })

                            }}
                            style={styles.map}
                        >


                        </MapView>

                        <View style={{
                            position: 'absolute',
                            backgroundColor: COLOR.WHITE, borderRadius: hp(5 / 2), padding: 5
                        }}>
                            <Img
                                src={require('../../assets/images/Logo.png')} height={hp(4)} width={hp(4)} contain />


                        </View>
                    </View>

                </View>

                {/* BUTTONS */}
                <View style={styles.absoluteContainer}>



                    <Button
                        text={'Confirm'}
                        borderColor={COLOR.YELLOW}
                        bg={COLOR.BLACK} style={{ width: '49%' }}
                        textColor={COLOR.YELLOW} onClick={() => { onConfirm() }}
                    />


                    <Button
                        text={'Cancel'}
                        bg={COLOR.BLACK} style={{ width: '49%' }}
                        borderColor={COLOR.YELLOW}
                        textColor={COLOR.YELLOW} onClick={() => { props.onclose() }}
                    />



                </View>

            </View>

        </Modal>
    )
}

export default MapModal

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: COLOR.BLACK
    },
    absoluteContainer: {
        width: '90%',
        position: 'absolute', bottom: 10,
        alignSelf: 'center', flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        marginVertical: 5,
        width: wp(90),
        height: 45
    },
    btnTxt: {
        fontFamily: FONT.PoppinsBold
    },
    btnTxt1: {
        color: COLOR.YELLOW
    },
    btn1: {
        backgroundColor: COLOR.RED
    },
    btn2: {
        backgroundColor: COLOR.WHITE,
        borderWidth: 1.5,
        borderColor: COLOR.YELLOW
    },
    btn3: {
        backgroundColor: COLOR.RED,
    },
    map: {
        width: '100%',
        height: '100%'
    },
    mapContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})