import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { Location } from '../../assets/svg'
import { AppHeader, Img, Label, Pressable } from '../../components'
import { METHOD, ROUTES } from '../../data/remote/routes'
import apiRequest from '../../data/remote/webHandler'
import { En } from '../../enums/AppEnums'
import { ActiveOpacity, COLOR, JUSTIFY, TEXT_STYLE, height, hp, width, wp } from '../../enums/StyleGuide'
import useLocation from '../../hooks/location'
import { showFlash } from '../../utils/myUtils'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps




const CARD_HEIGHT = height / 6;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const SNAP_TO_INTERVAL = CARD_WIDTH + 20;




const MapScreen = () => {

    const mapRef = useRef(null)
    const scrollViewRef = useRef();

    const { getCurrentPosition } = useLocation()
    const [placeName, setplaceName] = useState({})
    const [currentLocation, setCurrentLocation] = useState();
    const [organizationsList, setorganizationsList] = useState([])
    const [nearby, setnearby] = useState(false)
    const [openNow, setopenNow] = useState(false)

    animation = new Animated.Value(0);


    const memoizedList = useMemo(() => organizationsList, [organizationsList]);


    useEffect(() => {
        getCurrentPosition(mapRef, setCurrentLocation, setplaceName)
    }, []);

    useEffect(() => {

        getAllOrganizations()

    }, [openNow, nearby]);




    const getAllOrganizations = async () => {
        try {
            let gymData = {};

            if (!nearby && !openNow) {
                gymData = {};
            }
            else if (nearby) {
                gymData = {
                    near_by: nearby,
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                };
            }
            else if (openNow) {
                gymData = {
                    open_now: openNow
                };
            }
            else if (nearby && openNow) {
                gymData = {
                    near_by: nearby,
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    open_now: openNow,

                };
            }

            setorganizationsList([]);



            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.ALL_NEARBY_OPEN_GYMS,
                data: gymData,
            });


            if (result.status === 200 && result.data.success) {
                const organizations = result.data.data
                    .map((org) => ({
                        ...org,
                        latitude: parseFloat(org.latitude),
                        longitude: parseFloat(org.longitude),
                    }))
                    .filter((org) => !isNaN(org.latitude) && !isNaN(org.longitude));

                setorganizationsList(organizations);
            }
            else{
                showFlash(result.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const animateToMarker = (organization) => {

        mapRef?.current?.animateToRegion({
            latitude: organization?.latitude,
            longitude: organization?.longitude,
            latitudeDelta: 0.0250,
            longitudeDelta: 0.0011,
        });
    };

    const onMarkerPress = markerID => {

        let x = markerID * width - markerID * width * 0.2 + 20 * markerID;
        if (markerID !== 0) {
            x = x - (width * 0.2) / 2 + 10;
        }
        scrollViewRef?.current?.scrollTo({ x: x, y: 0, animated: true });
    };



    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <AppHeader title={`Explore gym's`} LeftComp={En.BackArrow} RightComp={En.Setting} />

            {/* <Section row center justify={JUSTIFY.between} fillX={'5%'} spaceT={isIOS() ? hp(4) : hp(1)}>
                <TextField
                    placeholder={'Search by area, city and zip code'}
                    color={COLOR.WHITE} radius={hp(2)} width={wp('75%')}
                />
                <Pressable center justify={JUSTIFY.center} bg={COLOR.YELLOW} fill={hp(2)} radius={hp(1.8)} >
                    <SearchBlack />
                </Pressable>
            </Section> */}





            {
                currentLocation?.longitude && currentLocation?.latitude &&
                <View >

                    <MapView
                        ref={mapRef}
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        initialRegion={{
                            latitude: currentLocation?.latitude,
                            longitude: currentLocation?.longitude,
                            latitudeDelta: 0.0250,
                            longitudeDelta: 0.0011,
                        }}
                        style={styles.miniMap}>

                        {/* Current location marker */}
                        <Marker coordinate={currentLocation} />

                        {/* Markers for all organizations */}
                        {memoizedList?.filter(organization => organization.latitude && organization.longitude).map((organization, index) => (
                            <Marker
                                key={index}
                                onPress={() => {
                                    onMarkerPress(index);
                                }}
                                coordinate={{
                                    latitude: organization?.latitude,
                                    longitude: organization?.longitude
                                }}
                            >
                                <Animated.View style={{
                                    backgroundColor: COLOR.WHITE, borderRadius: hp(6 / 2), padding: 4
                                }}>
                                    <Img
                                        src={require('../../assets/images/Logo.png')} height={hp(3.53)} width={hp(3.53)} contain />
                                </Animated.View>
                            </Marker>

                        ))}

                    </MapView>
                </View>

            }

            {/* //FILTER */}
            <View style={{ position: 'absolute', top: hp(15), height: hp(4), alignSelf: 'center' }}>

                <ScrollView horizontal>
                    <Pressable fillX={wp(2)} spaceX={wp(1)}
                        bg={openNow ? COLOR.D_GREEN : COLOR.YELLOW}
                        radius={150 / 2} justify={JUSTIFY.center}
                        onClick={() => { setopenNow(!openNow) }}
                    >
                        <Label text={'Open Now'} style={TEXT_STYLE.small_text}
                            textColor={openNow ? COLOR.WHITE : COLOR.BLACK}
                        />
                    </Pressable>

                    <Pressable fillX={wp(2)} spaceX={wp(1)}
                        bg={nearby ? COLOR.D_GREEN : COLOR.YELLOW}
                        radius={150 / 2} justify={JUSTIFY.center}
                        onClick={() => { setnearby(!nearby) }}
                    >
                        <Label text={'Nearby'} style={TEXT_STYLE.small_text}
                            textColor={nearby ? COLOR.WHITE : COLOR.BLACK}
                        />
                    </Pressable>
                </ScrollView>
            </View>

            {/* Horizontal scroll bar for the markers */}

            <Animated.ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                snapToInterval={SNAP_TO_INTERVAL}
                snapToAlignment="center"
                automaticallyAdjustContentInsets
                centerContent
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: animation,
                                },
                            },
                        },
                    ],
                    { useNativeDriver: true },
                )}
                style={styles.scrollView}
                contentInset={{ top: 0, left: 0, bottom: 0, right: 0 }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 0,
                }}

            >
                {memoizedList
                    .filter((organization) => organization.latitude && organization.longitude)
                    .map((organization, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => animateToMarker(organization)}
                            style={styles.card}
                        >
                            <Img
                                imageUrl={organization.profile_picture}
                                contain
                                style={styles.cardImage} />

                            <View style={{ paddingHorizontal: wp(3) }}>
                                <Label text={organization?.first_name + ' ' + organization?.last_name} style={styles.cardtitle} />
                                <Text numberOfLines={4} style={[styles.cardtitle, { ...TEXT_STYLE.text }]}>{organization?.address}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
            </Animated.ScrollView>

            <TouchableOpacity
                activeOpacity={ActiveOpacity}
                style={{ borderRadius: 10, position: 'absolute', top: hp(15), end: wp(5), backgroundColor: COLOR.WHITE, padding: 10, borderWidth: 1 }}
                onPress={() => getCurrentPosition(mapRef, setCurrentLocation, setplaceName)} >
                <Location height={hp(2)} width={hp(2)} />
            </TouchableOpacity>


        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({

    miniMap: {
        width: '100%',
        height: '95%',
        borderRadius: 20,
        alignSelf: 'center',
    },
    scrollView: {
        position: 'absolute',
        bottom: hp(3),
        left: 0,
        right: 0,
    },
    card: {
        marginStart: hp(2),
        elevation: 2,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: hp(2),
        backgroundColor: COLOR.WHITE,
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,

        elevation: 21,
    },
    cardImage: {
        width: wp(37),
        height: wp(40),
        borderRadius: hp(2),
    },
    cardtitle: {
        ...TEXT_STYLE.text_bold,
        width: wp(38),
        marginBottom: hp(1),
        color: COLOR.BLACK,
    },
})




