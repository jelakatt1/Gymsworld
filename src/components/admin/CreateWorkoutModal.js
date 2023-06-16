import { StyleSheet, Modal, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Label, Pressable, Section } from '../widgets'
import { COLOR, JUSTIFY, KEYBOARDTYPE, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'
import { TextField } from '../fields'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

const CreateWorkoutModal = ({ visible, setVisible, onPress }) => {
    const [minAge, setMinAge] = useState(15);
    const [maxAge, setMaxAge] = useState(100);

    const [maxReps, setMaxReps] = useState('');
    const [miniReps, setMiniReps] = useState('');
    const [maxPoints, setMaxPoints] = useState('');
    const [miniPoints, setMiniPoints] = useState('');

    const handleValuesChange = (values) => {
        setMinAge(values[0]);
        setMaxAge(values[1]);
    };
    const handlePress = () => {

        onPress(minAge, maxAge, miniReps, maxReps, miniPoints, maxPoints);

        setMinAge(15);
        setMaxAge(100);
        setMiniReps('');
        setMaxReps('');
        setMiniPoints('');
        setMaxPoints('');
    }
    return (
        <Modal
            visible={visible}
            transparent
            onRequestClose={() => { setVisible(flase) }}
            animationType='fade'
        >
            <View style={styles.mainScreen}>

                <Section spaceX={'5%'} bg={COLOR.GREY} fillX={'5%'} fillY={hp(1)} spaceY={hp(1)} radius={hp(2)}>
                    <ScrollView showsVerticalScrollIndicator={false} >

                        <View style={{ marginVertical: hp(1) }}>
                            <Label text={'Age Range'} />
                            <MultiSlider
                                values={[minAge, maxAge]}
                                onValuesChange={handleValuesChange}
                                min={15}
                                max={100}
                                step={1}
                                allowOverlap={false}
                                snapped
                                trackStyle={styles.timeTrack}
                                sliderLength={wp(70)}
                                selectedStyle={styles.selectedTrack}
                                containerStyle={styles.sliderContainerStyle}
                                customMarker={(e) => {
                                    return (
                                        <View style={styles.markerStyle}>
                                            <Label text={e.currentValue} style={TEXT_STYLE.small_text} />
                                        </View>
                                    )
                                }}
                            />
                        </View>

                        <Section row center justify={JUSTIFY.between}>
                        </Section>
                        <Section row center justify={JUSTIFY.between}>
                            <TextField
                                title={'Min Reps'} titleStyle={styles.titleStyle}
                                style={styles.inputStyle} keyboardType={KEYBOARDTYPE.NUMERIC}
                                value={miniReps} onChangeText={(x) => { setMiniReps(x) }}
                            />
                            <TextField
                                title={'Max Reps'} titleStyle={styles.titleStyle}
                                style={styles.inputStyle} keyboardType={KEYBOARDTYPE.NUMERIC}
                                value={maxReps} onChangeText={(x) => { setMaxReps(x) }}
                            />
                        </Section>
                        <Section row center justify={JUSTIFY.between}>
                            <TextField
                                title={'Min Points'} titleStyle={styles.titleStyle}
                                style={styles.inputStyle} keyboardType={KEYBOARDTYPE.NUMERIC}
                                value={miniPoints} onChangeText={(x) => { setMiniPoints(x) }}
                            />
                            <TextField
                                title={'Max Points'} titleStyle={styles.titleStyle}
                                style={styles.inputStyle} keyboardType={KEYBOARDTYPE.NUMERIC}
                                value={maxPoints} onChangeText={(x) => { setMaxPoints(x) }}
                            />
                        </Section>

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
                                onClick={() => handlePress()}
                            >
                                <Label text={'Select'} textColor={COLOR.BLACK} style={TEXT_STYLE.small_text} />
                            </Pressable>
                        </Section>

                    </ScrollView>

                </Section>

            </View>



        </Modal>
    )
}

export default React.memo(CreateWorkoutModal)

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
        height: hp(5), width: wp('38%'), borderRadius: hp(1.5),
        borderWidth: 1, borderColor: COLOR.LIGHT_GREY,
    },
    sliderContainerStyle: {
        width: '100%',
        alignItems: 'center',
    },
    markerStyle: {
        height: hp(4), width: hp(4),
        borderRadius: hp(5), borderWidth: 0.7, borderColor: COLOR.WHITE,
        backgroundColor: COLOR.LIGHT_GREY,
        alignItems: 'center', justifyContent: 'center',
    },
    timeTrack: {
        backgroundColor: COLOR.LIGHT_GREY,
        height: 5, borderRadius: 150 / 2, width: 100,
    },
    selectedTrack: {
        backgroundColor: COLOR.YELLOW, width: 100,
    },
})