import { StyleSheet, Modal, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Label, Pressable, Section } from '../widgets'
import { COLOR, JUSTIFY, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'
import { SelectField, TextField } from '../fields'
import { formateTime, isIOS, showFlash } from '../../utils/myUtils'
import DateTimePicker from '@react-native-community/datetimepicker'
import LocationField from '../fields/LocationField'
import { METHOD, ROUTES } from '../../data/remote/routes'
import { useSelector } from 'react-redux'
import apiRequest from '../../data/remote/webHandler'
import { ActiveOpacity } from '../../enums/StyleGuide'

const DATA = [
    { label: 'Everyday', value: 'Everyday' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Monthly', value: 'Monthly' },
];

const ClassModal = ({ visible, setVisible, date }) => {
    const user = useSelector(({ appReducer }) => appReducer.user);
    const [name, setName] = useState('')
    const [repeat, setRepeat] = useState('')
    const [members, setMembers] = useState('');
    const [currentLocation, setCurrentLocation] = useState();
    const [placeName, setplaceName] = useState({})
    const [showOpenTime, setShowOpenTime] = useState(false);
    const [showCloseTime, setShowCloseTime] = useState(false);
    const [openTime, setOpenTime] = useState('9:00:00');
    const [closeTime, setCloseTime] = useState('17:00:00');
    const [showWarning, setShowWarning] = useState(false);

    const onOpenTime = (event, selectedDate) => {
        let formatedTime = formateTime(selectedDate);
        if (isIOS() != true) {
            setShowOpenTime(false);
        }
        setOpenTime(formatedTime);
    }

    const onCloseTime = (event, selectedDate) => {
        let formatedTime = formateTime(selectedDate);
        if (isIOS() != true) {
            setShowCloseTime(false);
        }
        setCloseTime(formatedTime);
    }

    const handleCreateClass = async () => {
        if (name && date && currentLocation && placeName && members && openTime && closeTime && repeat) {
            const form = new FormData()
            form.append("org_id", user?.id)
            form.append("name", name)
            form.append("date", date)
            form.append("location", placeName?.placeName)
            form.append("latitude", currentLocation?.latitude)
            form.append("longitude", currentLocation?.longitude)
            form.append("number_of_members", members)
            form.append("start_time", openTime)
            form.append("end_time", closeTime)
            form.append("class_recurring", repeat)

            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.CREATE_CLASS,
                data: form
            }, { 'Content-Type': 'multipart/form-data' }
            ).catch((e) => {
                return false;
            });

            if (result?.status === 200 && result?.data?.success) {
                setVisible(false)
                showFlash(result?.data?.message)
            }
            // console.log(result.data);
        } else {
            setShowWarning(true);
        }
    }

    return (
        <Modal
            visible={visible}
            transparent
            onRequestClose={() => { setVisible(false) }}
            animationType='fade'
        >
            <View style={styles.mainScreen}>

                <Section spaceX={'5%'} bg={COLOR.GREY} fillX={'5%'} fillY={hp(1)} spaceY={hp(1)} radius={hp(2)}>
                    <ScrollView showsVerticalScrollIndicator={false} >

                        <SelectField
                            placeholder={'Repetition'}
                            color={COLOR.LIGHT_GREY_3}
                            style={styles.dropDownStyle}
                            data={DATA}
                            value={repeat} onSelect={(x) => { setRepeat(x) }}
                        />

                        <TextField
                            title={'Class Name'} titleStyle={styles.titleStyle}
                            placeholder={'Enter class name'} placeholderColor={COLOR.LIGHT_GREY}
                            style={styles.inputStyle}
                            value={name} onChangeText={(x) => { setName(x) }}
                        />
                        <TextField
                            title={'No. of Members'} titleStyle={styles.titleStyle}
                            placeholder={'Enter number of members'} placeholderColor={COLOR.LIGHT_GREY}
                            style={styles.inputStyle} keyboardType={'numeric'}
                            value={members} onChangeText={(x) => { setMembers(x) }}
                        />
                        <LocationField
                            currentLocation={currentLocation}
                            setCurrentLocation={setCurrentLocation}
                            placeName={placeName}
                            setplaceName={setplaceName}
                        />

                        <Section row center justify={JUSTIFY.between} spaceY={hp(1)}>
                            <View>
                                <Label text={'Start Time'} style={[styles.titleStyle, { marginBottom: hp(0.5) }]} />
                                <Pressable
                                    onClick={() => { setShowOpenTime(true) }}
                                    style={[styles.inputStyle2, { width: wp('37%') }]}>
                                    <Label text={openTime?.toString()} size={11} textColor={COLOR.LIGHT_GREY_3} />
                                </Pressable>
                            </View>
                            <View>
                                <Label text={'End Time'} style={[styles.titleStyle, { marginBottom: hp(0.5) }]} />
                                <Pressable
                                    onClick={() => { setShowCloseTime(true) }}
                                    style={[styles.inputStyle2, { width: wp('37%') }]}>
                                    <Label text={closeTime?.toString()} size={11} textColor={COLOR.LIGHT_GREY_3} />
                                </Pressable>
                            </View>
                        </Section>
                        {showWarning &&
                            <Label
                                text={'Please enter all of the required fields'}
                                style={TEXT_STYLE.small_text}
                                spaceB={hp(0.5)} textColor={COLOR.RED}
                            />
                        }
                        <Section row center justify={JUSTIFY.end} spaceY={hp(1)}>
                            <Pressable
                                fillX={wp(2.5)} fillY={hp(0.3)}
                                radius={150 / 2} style={{ borderWidth: 1, borderColor: COLOR.LIGHT_GREY_3 }}
                                spaceR={wp(1.5)}
                                onClick={() => { setVisible(false) }}
                            >
                                <Label text={'Cancel'} textColor={COLOR.LIGHT_GREY_3} style={TEXT_STYLE.small_text} />
                            </Pressable>
                            <Pressable
                                fillX={wp(2.5)} fillY={hp(0.3)}
                                bg={COLOR.YELLOW} radius={150 / 2}
                                spaceR={wp(1.5)}
                                onClick={() => { handleCreateClass() }}
                            >
                                <Label text={'Create'} textColor={COLOR.BLACK} style={TEXT_STYLE.small_text} />
                            </Pressable>
                        </Section>


                        {showOpenTime || showCloseTime ? (
                            <>
                                <DateTimePicker
                                    value={new Date()}
                                    mode='time'
                                    themeVariant='dark'
                                    display={isIOS() ? 'spinner' : 'compact'}
                                    is24Hour={true}
                                    onChange={showOpenTime ? onOpenTime : onCloseTime}
                                />

                                {isIOS() &&
                                    <TouchableOpacity
                                        onPress={() => setShowOpenTime(false) || setShowCloseTime(false)}
                                        activeOpacity={ActiveOpacity}>
                                        <Label
                                            text={'Done'}
                                            style={[{ color: COLOR.YELLOW, ...TEXT_STYLE.text_bold, fontSize: 16, alignSelf: 'center' }]}
                                        />
                                    </TouchableOpacity>
                                }
                            </>
                        ) : null
                        }
                    </ScrollView>

                </Section>

            </View>



        </Modal>
    )
}

export default React.memo(ClassModal)

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
    },
    titleStyle: {
        ...TEXT_STYLE.small_text, fontSize: 11
    },
    inputStyle: {
        height: hp(5.3), borderRadius: hp(2),
        borderWidth: 1, borderColor: COLOR.LIGHT_GREY,
    },
    inputStyle2: {
        height: hp(5.3), borderRadius: hp(2),
        paddingHorizontal: '5%', marginBottom: hp(0.5),
        borderWidth: 1, borderColor: COLOR.LIGHT_GREY,
        justifyContent: 'center',
    },
    dropDownStyle: {
        height: hp(3.5), width: '40%',
        alignSelf: 'flex-end',
        borderRadius: hp(2),
        paddingHorizontal: '5%', marginBottom: hp(0.5),
        borderWidth: 1, borderColor: COLOR.LIGHT_GREY,
        justifyContent: 'center',
    },
    weekInput: {
        height: hp(3), borderRadius: hp(2),
        borderWidth: 1, borderColor: COLOR.LIGHT_GREY,
        marginBottom: 0, marginVertical: 0, marginHorizontal: 0,
    },
    miniMap: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        alignSelf: 'center'
    },
})