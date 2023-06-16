import moment from 'moment'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { ExerciseData } from '../../enums/AppEnums'
import { COLOR, JUSTIFY, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'
import { Img, Label, Pressable, Section } from '../widgets'

const GetScoreBox = ({ item, isSelected }) => {
    const [isCollapsed, setIsCollapsed] = useState(true)


    const dateStr = item?.personal_workout_data?.date
    const date = moment(dateStr).format('DD');
    const month = moment(dateStr).format('MMM');

    const image = item?.personal_workout_data?.file


    return (
        <Section spaceB={hp(2)}>
            <Pressable
                onClick={() => { setIsCollapsed(!isCollapsed) }} row center
                style={[styles.header, isCollapsed ? { borderRadius: hp(1) } : styles.bottomRadius,
                { backgroundColor: isSelected ? COLOR.BLUE_2 : COLOR.LIGHT_GREY_3 }
                ]}
            >
                <Section style={styles.dateContainer} center justify={JUSTIFY.center}>
                    <Label text={date} style={TEXT_STYLE.text_bold} textColor={COLOR.BLACK} />
                    <Label text={month} style={TEXT_STYLE.text_bold} textColor={COLOR.BLACK} />

                </Section>

                {/* SVG ICONS */}
                <Section row center width={'63%'}>
                    {ExerciseData?.map((item, index) => {
                        const { svg, text, value } = item
                        return (
                            <Section key={index} width={'25%'} center>
                                <Section>
                                    {svg}
                                </Section>
                                <Label text={text} textColor={COLOR.BLACK} size={11} textBold />
                            </Section>
                        )
                    })}
                </Section>


                <Section style={styles.scoreContainer} center justify={JUSTIFY.center}>
                    <Label text={'Your Score'} style={[TEXT_STYLE.text_bold,{fontSize: 12}]} center />
                    <Label text={item?.score?.scores} style={TEXT_STYLE.text_bold} />
                </Section>


            </Pressable>


            <Collapsible collapsed={isCollapsed}>
                <Section style={styles.collapseView} bg={COLOR.LIGHT_GREY_2}>
                    <Label text={`General:`} textColor={COLOR.RED} style={{ marginTop: 10 }} size={16} />

                    <Section spaceY={hp(1)}>
                        <Section>
                            <Label text={`Calories Eaten : ${item?.personal_workout_data?.calorie_eaten}`} style={styles.textStyle} />
                            <Label text={`BMI Type : ${item?.personal_workout_data?.BMI_type}`} style={styles.textStyle} />
                            <Label text={`BMI : ${item?.personal_workout_data?.BMI}`} style={styles.textStyle} />
                            <Label text={`Calories Burn : ${item?.personal_workout_data?.calorie_burn}`} style={styles.textStyle} />
                        </Section>

                        <Label text={`Exercises:`} textColor={COLOR.RED} style={{ marginBottom: 10, marginTop: 5 }} size={16} />


                        {
                            item?.workouts?.map((item, index) => (

                                <Label text={`${item.name} : ${item?.reps}`} style={styles.textStyle} />

                            ))
                        }

                    </Section>

                    <View>

                        {image &&
                            <Img style={{ borderRadius: 10, marginBottom: 10, marginTop: 10 }} imageUrl={image} height={hp(14)} width={wp(80)} />
                        }
                    </View>

                </Section>
            </Collapsible>
        </Section>
    )
}

export default React.memo(GetScoreBox)

const styles = StyleSheet.create({
    header: {
        height: hp(10), marginBottom: hp(0.2),
        paddingHorizontal: '2%', paddingVertical: hp(0.5),
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
        backgroundColor: COLOR.RED,
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