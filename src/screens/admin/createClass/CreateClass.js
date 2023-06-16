import { View } from 'react-native'
import React, { useState, useRef } from 'react'
import { COLOR, commonStyles, hp, JUSTIFY, TEXT_STYLE, wp } from '../../../enums/StyleGuide'
import { AppHeader, ClassModal, ClassSchedule, Label, MessageBox, Pressable, Section, TextField } from '../../../components'
import { En } from '../../../enums/AppEnums'
import { Calendar } from 'react-native-calendars'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './Styles'
import apiRequest from '../../../data/remote/webHandler'
import { METHOD, ROUTES } from '../../../data/remote/routes'
import { useSelector } from 'react-redux';
import { formatDate, isIOS, showFlash } from '../../../utils/myUtils'
import MapModal from '../../../components/modals/mapModal'
import useLocation from '../../../hooks/location'
import MapView, { PROVIDER_GOOGLE, Marker, PROVIDER_DEFAULT, Callout } from 'react-native-maps';

// const weekDays = [
//     { day: 'Monday' },
//     { day: 'Tuesday' },
//     { day: 'Wednesday' },
//     { day: 'Thursday' },
//     { day: 'Friday' },
//     { day: 'Saturday' },
//     { day: 'Sunday' },
// ]

const CreateClass = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(formatDate(new Date));

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        setModalVisible(true);
    }

    // let date = new Date();
    // const user = useSelector(({ appReducer }) => appReducer.user);
    // const [classTime, setClassTime] = useState([]);
    // const [name, setName] = useState('')
    // const [members, setMembers] = useState();
    // const [currentLocation, setCurrentLocation] = useState();
    // const [isMapModalVisible, setisMapModalVisible] = useState(false)
    // const [placeName, setplaceName] = useState({})
    // const { getCurrentPosition } = useLocation()
    // const mapRef = useRef(null)

    // const handleChangeClassTiming = (day, status, openTime, closeTime) => {
    //     const exists = classTime?.find((x) => x.day_of_week == day)
    //     if (exists) {
    //         setClassTime(classTime?.filter((x) => x.day_of_week != day))
    //     } else {
    //         let data = classTime
    //         data.push({ day_of_week: day, status: status == true ? 1 : 0, opening_time: openTime, closing_time: closeTime })
    //         setClassTime(data)
    //     }
    // }

    // const handleTimeChange = (day, type, time) => {
    //     const exists = classTime?.find((x) => x.day_of_week == day)
    //     if (exists) {
    //         let data = classTime.map((x) => {
    //             if (x.day_of_week == day) {
    //                 if (type == 'opening') {
    //                     let data = { ...x, opening_time: time }
    //                     return data
    //                 } else if (type == 'closing') {
    //                     let data = { ...x, closing_time: time }
    //                     return data
    //                 }
    //             } else {
    //                 return x
    //             }
    //         })
    //         setClassTime(data)
    //     }
    // }

    // const handleCreateClass = async () => {
    //     if (name && date && currentLocation && placeName && members && classTime) {
    //         const form = new FormData()
    //         form.append("org_id", user?.id)
    //         form.append("name", name)
    //         // form.append("date", formatDate(date))
    //         form.append("location", placeName?.placeName)
    //         form.append("latitude", currentLocation?.latitude)
    //         form.append("longitude", currentLocation?.longitude)
    //         form.append("number_of_members", members)

    //         classTime?.forEach((item, index) => {
    //             form.append(`days_of_week[${index}][day_of_week]`, item.day_of_week)
    //             form.append(`days_of_week[${index}][status]`, item.status.toString())
    //             form.append(`days_of_week[${index}][number_of_week]`, item.number_of_week)
    //             form.append(`days_of_week[${index}][start_time]`, item.opening_time)
    //             form.append(`days_of_week[${index}][end_time]`, item.closing_time)
    //         })

    //         const result = await apiRequest({
    //             method: METHOD.POST,
    //             url: ROUTES.CREATE_CLASS,
    //             data: form
    //         }, { 'Content-Type': 'multipart/form-data' }
    //         ).catch((e) => {
    //             return false;
    //         });

    //         if (result.status === 200 && result.data.success) {
    //             showFlash(result.data.message)
    //         }
    //     }
    //     else {
    //         showFlash('Please fill in all of the information')
    //     }
    // }

    return (
        <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>

            <AppHeader title={'Create Classes'} LeftComp={En.BackArrow} RightComp={En.Setting} />
            <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>

                <View style={{ paddingHorizontal: '5%' }}>
                    <Calendar
                        style={{ borderRadius: 20, paddingBottom: hp(1), marginBottom: hp(2) }}
                        theme={{
                            calendarBackground: COLOR.GREY_2,
                            todayTextColor: COLOR.WHITE,
                            todayButtonFontWeight: "bold",
                            todayDotColor: COLOR.WHITE,
                            dayTextColor: COLOR.WHITE,
                            textDisabledColor: COLOR.LIGHT_GREY,
                            arrowColor: COLOR.YELLOW,
                            monthTextColor: COLOR.YELLOW,
                            textMonthFontWeight: "bold",
                            selectedDotColor: COLOR.WHITE
                        }}
                        onDayPress={handleDayPress}

                        markedDates={{
                            [selectedDate]: { marked: true, selectedColor: COLOR.WHITE },
                            // ...markedDates,
                        }}
                    />
                    <MessageBox
                        text={'Select the class date from this calender'}
                        textStyle={{ width: '100%' }}
                        style={{ paddingVertical: hp(1.5) }}
                    />
                </View>


                {/* <Section spaceX={'5%'} bg={COLOR.GREY} fillX={'5%'} fillY={hp(1)} spaceY={hp(1)} radius={hp(2)}>
                    <Section row center justify={JUSTIFY.center} spaceY={hp(0.5)}>
                        <Label text={'Class Date :'} spaceR={wp(2)} style={TEXT_STYLE.small_text} />
                        <Label text={formatDate(date)} textColor={COLOR.YELLOW} style={TEXT_STYLE.small_text} />
                    </Section>
                    <TextField
                        title={'Class Name'} titleStyle={styles.titleStyle}
                        placeholder={'Enter class name'} placeholderColor={COLOR.LIGHT_GREY}
                        style={styles.inputStyle}
                        value={name} onChangeText={(x) => { setName(x) }}
                    />
                    <Section>
                        <TextField
                            title={'No. of Members'} titleStyle={styles.titleStyle}
                            placeholder={'Enter number of members'} placeholderColor={COLOR.LIGHT_GREY}
                            style={styles.inputStyle} keyboardType={'numeric'}
                            value={members} onChangeText={(x) => { setMembers(x) }}
                        />
                    </Section>
                    <Label text={'Location'} style={[styles.titleStyle, { marginBottom: hp(0.5) }]} />
                    <Pressable onClick={() => getCurrentPosition(mapRef, setCurrentLocation, setplaceName)} style={[styles.inputStyle]} justify={JUSTIFY.center} fillL={'5%'}>
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

                    <Section spaceT={hp(2)}>
                        <Label text={'Class Schedule'} style={TEXT_STYLE.small_text} spaceB={hp(0.5)} />
                        <Label text={'These are the days of current week'} style={TEXT_STYLE.small_text} spaceB={hp(0.5)} textColor={COLOR.RED} />
                        {weekDays.map((item, index) => {
                            const { day } = item
                            return (
                                <ClassSchedule
                                    key={index} day={day}
                                    data={weekDays}
                                    onStatusChange={(day_, status, openTime, closeTime) => handleChangeClassTiming(day_, status, openTime, closeTime)}
                                    onTimeChange={handleTimeChange}
                                />
                            )
                        })}

                    </Section>

                    <Section row center justify={JUSTIFY.end} spaceY={hp(1)}>
                        <Pressable
                            fillX={wp(2.5)} fillY={hp(0.3)} bg={COLOR.YELLOW} radius={150 / 2} spaceR={wp(1.5)}
                            onClick={() => { handleCreateClass() }}
                        >
                            <Label text={'Create'} textColor={COLOR.BLACK} style={TEXT_STYLE.small_text} />
                        </Pressable>
                    </Section>

                </Section> */}
            </KeyboardAwareScrollView>
            <ClassModal visible={modalVisible} setVisible={setModalVisible} date={selectedDate} />
            {/* <MapModal
                isVisible={isMapModalVisible}
                onclose={() => { setisMapModalVisible(false) }}
                setLocation={setCurrentLocation}
                location={currentLocation}
                mapRef_={mapRef}
                setPlaceFormatedName={setplaceName}
            /> */}

        </Section>
    )
}

export default CreateClass