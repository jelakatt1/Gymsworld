import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { ImageIcon, PulupsBlack, PushupBlack, RunningBlack, ShirtGrey, SitupsBlack } from '../../assets/svg'
import { En } from '../../enums/AppEnums'
import { COLOR, JUSTIFY, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'
import { openCamera, openGallery } from '../../utils/myUtils'
import { CustomAlert, Img, Label, Pressable, Section } from '../widgets'
import { Button } from '../../components'



const excSize = hp(3)



const ScoreBox = ({ score, date, month, collapse,
    handleInputValues, updatedUserExercises, addMoreExercises, setImage, image,
    setcaloriesEaten, setbmiType, setbmi, setcalories, setheight,
    loading, submitDailyProgress, userprofilepic, userExercises

}) => {

    const [isCollapsed, setIsCollapsed] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)

    const [modalData, setModalData] = useState({})
    const handleImagePicker = () => {
        setModalVisible(true)
        setModalData({
            message: 'Choose image from:',
            buttons: [
                {
                    text: 'Camera',
                    onPress: () => { openCamera(setImage) },
                },
                {
                    text: 'Gallery',
                    onPress: () => { openGallery(setImage) },
                },
                {
                    text: En.cancel,
                    onPress: () => { },
                },
            ]
        })
    }


    return (
        <Section spaceY={hp(1)}>
            <Pressable
                onClick={() => { setIsCollapsed(!isCollapsed) }} row center
                style={[styles.header, isCollapsed ? { borderRadius: hp(1) } : styles.bottomRadius]}
            >
                <Section style={styles.dateContainer} center justify={JUSTIFY.center}>
                    <Label text={date} style={TEXT_STYLE.text_bold} textColor={COLOR.BLACK} />
                    <Label text={month?.length > 3 ? month.slice(0, 3) : month} style={TEXT_STYLE.text_bold} textColor={COLOR.BLACK} />
                </Section>
                <Section row center width={'63%'}>
                    {updatedUserExercises?.slice(0,4)?.map((item, index) => {
                        let svg;
                        if (item.name === 'Run Ups') {
                            svg = <RunningBlack height={excSize} width={excSize} />
                        } else if (item.name === 'Push up') {
                            svg = <PushupBlack height={excSize} width={excSize} />
                        }
                        else if (item.name === 'Pull ups') {
                            svg = <PulupsBlack height={excSize} width={excSize} />
                        }
                        else if (item.name === 'Sit Ups') {
                            svg = <SitupsBlack height={excSize} width={excSize} />
                        }
                        else {
                            svg = <ShirtGrey height={excSize} width={excSize} color={COLOR.BLACK} />
                        }
                        return (
                            <Section key={index} width={'25%'} center>
                                <Section>
                                    {svg}
                                </Section>
                                <Label text={item.name} textColor={COLOR.BLACK} size={11} textBold />
                                {/* <Label text={value} textColor={COLOR.BLACK} size={12} /> */}
                            </Section>
                        )
                    })}
                </Section>
                <Section style={styles.scoreContainer} center justify={JUSTIFY.center}>
                    <Img
                        imageUrl={userprofilepic}
                        contain
                        height={hp(6)} width={hp(6)} radius={150 / 2}
                    />
                </Section>
            </Pressable>
            <Collapsible collapsed={isCollapsed}>
                <Section style={styles.collapseView} bg={COLOR.LIGHT_GREY_2}>
                    <Label text={`General:`} textColor={COLOR.RED} style={{ marginTop: 10 }} size={16} />

                    <Section row center justify={JUSTIFY.between} spaceY={hp(1)}>
                        <Section>
                            <View style={{ flexDirection: 'row', marginBottom: 3 }}>

                                <Label text={'Calories Eaten : '} style={styles.textStyle} />
                                <TextInput
                                    onChangeText={(e) => setcaloriesEaten(e)}
                                    keyboardType="numeric"
                                    maxLength={3}
                                    cursorColor={COLOR.RED}
                                    style={{
                                        borderBottomWidth: 0.6,
                                        borderBottomColor: 'gray',
                                        width: wp(7),
                                        height: hp(2),
                                        fontSize: 10,
                                        lineHeight: 10,
                                        padding: 0
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                                <Label text={'BMI Type : '} style={styles.textStyle} />

                                <TextInput
                                    onChangeText={(e) => setbmiType(e)}
                                    keyboardType="numeric"
                                    maxLength={3}
                                    cursorColor={COLOR.RED}
                                    style={{
                                        borderBottomWidth: 0.6,
                                        borderBottomColor: 'gray',
                                        width: wp(7),
                                        height: hp(2),
                                        fontSize: 10,
                                        lineHeight: 10,
                                        padding: 0
                                    }}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                <Label text={'BMI : '} style={styles.textStyle} />


                                <TextInput
                                    onChangeText={(e) => setbmi(e)}
                                    keyboardType="numeric"
                                    maxLength={3}
                                    cursorColor={COLOR.RED}
                                    style={{
                                        borderBottomWidth: 0.6,
                                        borderBottomColor: 'gray',
                                        width: wp(7),
                                        height: hp(2),
                                        fontSize: 10,
                                        lineHeight: 10,
                                        padding: 0
                                    }}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                                <Label text={'Calories Burn : '} style={styles.textStyle} />


                                <TextInput
                                    onChangeText={(e) => setcalories(e)}
                                    keyboardType="numeric"
                                    maxLength={3}
                                    cursorColor={COLOR.RED}
                                    style={{
                                        borderBottomWidth: 0.6,
                                        borderBottomColor: 'gray',
                                        width: wp(7),

                                        height: hp(2),
                                        fontSize: 10,
                                        lineHeight: 10,
                                        padding: 0
                                    }}
                                />
                            </View>

                        </Section>


                    </Section>
                    <View style={{ marginBottom: 15 }}>
                        <Label text={`Exercises:`} textColor={COLOR.RED} style={{ marginBottom: 10, marginTop: 5 }} size={16} />

                        {updatedUserExercises?.map((item, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', marginBottom: 2 }}>
                                    {
                                        index > userExercises?.length - 1  ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <TextInput
                                                    onChangeText={(e) => {
                                                        handleInputValues(index, e, 'name')
                                                    }}
                                                    keyboardType='default'
                                                    cursorColor={COLOR.RED}
                                                    style={{
                                                        borderBottomWidth: 0.6,
                                                        borderBottomColor: 'gray',
                                                        width: wp(12),
                                                        height: hp(2),
                                                        fontSize: 10,
                                                        lineHeight: 10,
                                                        padding: 0
                                                    }}
                                                />
                                                <Label text={` : `} textColor={COLOR.BLACK} size={12} />

                                            </View>

                                            :
                                            <Label text={`${item.name} : `} textColor={COLOR.BLACK} size={12} />

                                    }
                                    <TextInput
                                        onChangeText={(e) => {
                                            handleInputValues(index, e, 'input')
                                        }}
                                        keyboardType="numeric"
                                        maxLength={3}
                                        cursorColor={COLOR.RED}
                                        style={{
                                            borderBottomWidth: 0.6,
                                            borderBottomColor: 'gray',
                                            width: wp(7),
                                            height: hp(2),
                                            fontSize: 10,
                                            lineHeight: 10,
                                            padding: 0
                                        }}
                                    />
                                </View>


                            )
                        })}
                    </View>

                    <TouchableOpacity
                        onPress={() => addMoreExercises()}
                        style={{ marginBottom: 15, alignSelf: 'flex-end' }}>

                        <Label text={'Add more'} textColor={COLOR.RED} size={10} />

                    </TouchableOpacity>

                    <Pressable spaceB={20} onClick={() => { handleImagePicker() }} radius={hp(2)}
                        height={'25%'} center justify={JUSTIFY.center} bg={COLOR.LIGHT_GREY}
                    >
                        {image ?
                            <Img imageUrl={image.path} height={hp(12)} width={wp(80)} contain />
                            :
                            <Section radius={hp(2)} bg={COLOR.WHITE} height={'85%'} width={'95%'} center justify={JUSTIFY.center}>
                                <ImageIcon />
                                <Label
                                    text={'Browse from Photo Gallery'} spaceT={hp(1)}
                                    textColor={COLOR.BLUE} style={TEXT_STYLE.small_text}
                                />
                            </Section>
                        }
                    </Pressable>

                    <Button
                        text={loading ? (<ActivityIndicator size={24} color={COLOR.YELLOW} />) : 'Submit'}
                        bg={COLOR.BLACK} textColor={COLOR.YELLOW}
                        onClick={() => submitDailyProgress()}
                    />

                </Section>
            </Collapsible>
            <CustomAlert visible={modalVisible} onClose={setModalVisible} modalData={modalData} />
        </Section>
    )
}

export default React.memo(ScoreBox)

const styles = StyleSheet.create({
    header: {
        height: hp(10), marginBottom: hp(0.2),
        paddingHorizontal: '2%', paddingVertical: hp(0.5),
        backgroundColor: COLOR.LIGHT_GREY_3,
    },
    bottomRadius: {
        borderTopLeftRadius: hp(1),
        borderTopRightRadius: hp(1),
    },
    dateContainer: {
        height: '100%', width: '12%',
        backgroundColor: COLOR.YELLOW, marginRight: '1%',
        borderRadius: hp(1),
    },
    scoreContainer: {
        height: '100%', width: '24%',
        backgroundColor: COLOR.YELLOW,
        borderRadius: hp(1), marginLeft: '1%',
    },
    collapseView: {
        paddingHorizontal: '5%',
        borderBottomLeftRadius: hp(1), borderBottomRightRadius: hp(1),
    },
    textStyle: {
        ...TEXT_STYLE.small_text_bold,
        color: COLOR.BLACK,
    }
})