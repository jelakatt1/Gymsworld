import { StyleSheet, Switch, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLOR, commonStyles, hp, JUSTIFY, TEXT_STYLE, wp, ActiveOpacity } from '../../enums/StyleGuide';
import { Label, Pressable, Section } from '../widgets';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formateTime, isIOS } from '../../utils/myUtils';
import { TextField } from '../fields';

const array = []

const ClassSchedule = ({ day, onStatusChange, onTimeChange }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    // const [weekNo, setWeekNo] = useState('1')
    const [showOpenTime, setShowOpenTime] = useState(false);
    const [showCloseTime, setShowCloseTime] = useState(false);
    const [openTime, setOpenTime] = useState('9:00:00');
    const [closeTime, setCloseTime] = useState('17:00:00');
    const [recentOpenTime, setRecentOpenTime] = useState(null);
    const [recentCloseTime, setRecentCloseTime] = useState(null);

    const toggleSwitch = () => {
        let formatedOpenTime
        let formatedCloseTime

        if (recentOpenTime) {
            formatedOpenTime = formateTime(recentOpenTime);
        }
        if (recentCloseTime) {
            formatedCloseTime = formateTime(recentCloseTime);
        }

        onStatusChange(day, !isEnabled, formatedOpenTime || '9:00:00', formatedCloseTime || '17:00:00')
        setIsEnabled(previousState => !previousState);
    }

    const onOpenTime = (event, selectedDate) => {
        let formatedTime = formateTime(selectedDate);
        if (isIOS() != true) {
            setShowOpenTime(false);


        }
        setRecentOpenTime(selectedDate)
        setOpenTime(formatedTime);
        onTimeChange(day, 'opening', formatedTime)
    }

    const onCloseTime = (event, selectedDate) => {
        let formatedTime = formateTime(selectedDate);
        if (isIOS() != true) {

            setShowCloseTime(false);

        }
        setRecentCloseTime(selectedDate)
        setCloseTime(formatedTime);
        onTimeChange(day, 'closing', formatedTime, weekNo)
    }

    return (
        <View>

            <Section row center spaceY={hp(0.5)} justify={JUSTIFY.between}>
                <Section width={'40%'} row center justify={JUSTIFY.between}>
                    <Pressable onClick={() => { addDay() }}>
                        <Label text={day} style={TEXT_STYLE.small_text_bold} />
                    </Pressable>
                    <Switch
                        style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                        trackColor={{ false: COLOR.LIGHT_GREY_3, true: COLOR.YELLOW }}
                        thumbColor={isEnabled ? COLOR.WHITE : COLOR.LIGHT_GREY}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </Section>
                <Section width={'60%'} row center>
                    {isEnabled &&
                        <Section row center width={'80%'} justify={JUSTIFY.between}>
                            <Pressable onClick={() => { setShowOpenTime(!showOpenTime) }} style={styles.smallInput}>
                                <Label text={openTime?.toString()} size={11} textColor={COLOR.LIGHT_GREY_3} />
                            </Pressable>
                            <Label text={'To'} style={TEXT_STYLE.small_text} textColor={COLOR.LIGHT_GREY} />
                            <Pressable onClick={() => { setShowCloseTime(!showCloseTime) }} style={styles.smallInput}>
                                <Label text={closeTime?.toString()} size={11} textColor={COLOR.LIGHT_GREY_3} />
                            </Pressable>
                            {/* <TextField
                                // placeholder={'Week Number'} placeholderColor={COLOR.LIGHT_GREY}
                                style={[styles.smallInput, { width: wp('10%') }]}
                                inputStyle={{ textAlign: 'center', fontSize: 11 }}
                                keyboardType={'numeric'}
                                value={weekNo} onChangeText={(x) => { setWeekNo(x) }}
                            /> */}
                        </Section>
                    }

                </Section>

            </Section>
            {
                showOpenTime || showCloseTime ? (
                    <>
                        <DateTimePicker
                            value={new Date()}
                            mode='time'
                            themeVariant='dark'
                            display={isIOS() ? 'spinner' : 'compact'}
                            is24Hour={true}
                            onChange={showOpenTime ? onOpenTime : onCloseTime}
                        />

                        {
                            isIOS() &&
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
        </View >

    )
}

export default React.memo(ClassSchedule)

const styles = StyleSheet.create({
    smallInput: {
        width: '40%', height: hp(3),
        ...commonStyles.center,
        borderRadius: hp(1),
        marginHorizontal: 4,
        borderWidth: 1, borderColor: COLOR.LIGHT_GREY,
    },
})