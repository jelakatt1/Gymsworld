import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR, hp, JUSTIFY, TEXT_STYLE, wp } from '../../../enums/StyleGuide'
import { AppHeader, Label, Pressable, Section, SelectField } from '../../../components'
import { En, SCREEN } from '../../../enums/AppEnums'
import { SearchBlack } from '../../../assets/svg'
import { styles } from './Styles'
import { ACCOUNT_TYPE } from '../../../utils/Keys'
import { useSelector } from 'react-redux'

const TestScreen = ({ route, navigation }) => {
    let { age_ranges, gender, name, max_time, rest_time, sets, weight, weight_unit, description, id } = route?.params?.data
    const user = useSelector(({ appReducer }) => appReducer.user)
    const ListItem = ({ text, value }) => {
        return (
            <Section row center width={wp(40)}>
                <Label text={`${text} : `} style={styles.boldText} />
                <Label text={value} style={styles.valueText} capital />
            </Section>
        )
    }
    // console.log(JSON.stringify(route?.params?.data));
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <AppHeader title={`Test Details`} LeftComp={En.BackArrow} RightComp={En.Setting} />
            <Section fillX={'5%'}>


                <Section height={hp(80)} fillB={hp(1)} radius={hp(2)} bg={COLOR.LIGHT_GREY_2} spaceY={hp(2)}>
                    <Section height={hp(7)} center justify={JUSTIFY.center} bg={COLOR.GREY} style={styles.headerView} brBW={2} brBC={COLOR.BLACK}>
                        <Label text={`${name}`} size={16} capital />
                    </Section>
                    <ScrollView>
                        <Section fillX={'4%'}>
                            {
                                <Section spaceY={hp(2)} brBW={0.5} fillB={hp(1)} brBC={COLOR.GREY}>
                                    <Section row center justify={JUSTIFY.between} fillY={hp(0.2)}>
                                        <ListItem text={'Max Time'} value={max_time} />
                                        <ListItem text={'Rest Time'} value={rest_time} />
                                    </Section>
                                    <Section row center justify={JUSTIFY.between} fillY={hp(0.2)}>
                                        <ListItem text={'Weight'} value={weight} />
                                        <ListItem text={'Weight Unit'} value={weight_unit} />
                                    </Section>
                                    <Section row center justify={JUSTIFY.between} fillY={hp(0.2)}>
                                        <ListItem text={'Sets'} value={sets} />
                                        <ListItem text={'Gender'} value={gender} />
                                    </Section>
                                    <Section row>
                                        <Label text={`Description : `} style={styles.boldText} />
                                        <Label text={description} style={[styles.valueText, { maxWidth: wp(60) }]} />
                                    </Section>
                                </Section>
                            }
                            <ScrollView overScrollMode={'never'} showsHorizontalScrollIndicator={false} horizontal>
                                <Section row>
                                    <Section width={wp('22%')}>
                                        <Label text={`Age`} style={styles.boldText} />
                                        <Label text={`Max Reps`} style={styles.boldText} />
                                        <Label text={`Min Reps`} style={styles.boldText} />
                                        <Label text={`Max Points`} style={styles.boldText} />
                                        <Label text={`Min Points`} style={styles.boldText} />
                                    </Section>
                                    {age_ranges?.map((item, index) => {
                                        return (
                                            <Section spaceR={wp(2.5)} key={index}>
                                                <Label text={`${item.min_age}-${item.max_age}`} style={styles.boldText} />
                                                <Label text={item.max_reps} style={styles.text} />
                                                <Label text={item.min_reps} style={styles.text} />
                                                <Label text={item.max_points} style={styles.text} />
                                                <Label text={item.min_points} style={styles.text} />
                                            </Section>
                                        )
                                    })}
                                </Section>
                            </ScrollView>
                            <ScrollView overScrollMode='never' showsHorizontalScrollIndicator={false}>


                                <Section row>
                                    {age_ranges?.map((item, index) => {

                                        const repPointsValues = [];
                                        const repPoints = [];
                                        for (let i = item?.min_reps; i <= item?.max_reps; i++) {
                                            let value = item?.rep_points[i.toString()]

                                            repPoints.push(
                                                <Label text={i} key={i} style={styles.text} />
                                            )

                                            repPointsValues.push(
                                                value ?
                                                    <Label text={`${value}`} key={i} style={styles.text} />
                                                    :
                                                    <Label text={'-'} style={styles.text} />
                                            );
                                        }

                                        return (
                                            <Section width={wp(35)} justify={JUSTIFY.center} fillY={hp(3)} bg={COLOR.LIGHT_GREY_3} row
                                                spaceR={wp(2)} spaceT={hp(2)} radius={10}>
                                                <Section spaceR={wp(3)}>
                                                    <Label text={`Reps`} style={styles.boldText} />
                                                    {repPoints}
                                                </Section>
                                                <Section>
                                                    <Label text={`${item.min_age}-${item.max_age}`} style={styles.boldText} />
                                                    {repPointsValues}
                                                </Section>
                                            </Section>
                                        )
                                    })
                                    }
                                </Section>
                            </ScrollView>
                        </Section>
                    </ScrollView>
                    {user?.role == ACCOUNT_TYPE.USER &&
                        <Pressable
                            height={hp(3)} width={wp(20)}
                            center justify={JUSTIFY.center}
                            bg={COLOR.YELLOW} radius={150 / 2}
                            spaceR={wp(1.5)}
                            style={{ position: 'absolute', bottom: hp(2), right: '4%' }}
                            onClick={() => { navigation.navigate(SCREEN.SURVEY, { test_id: id }) }}
                        >
                            <Label text={'Submit'} textColor={COLOR.BLACK} style={TEXT_STYLE.small_text} />
                        </Pressable>
                    }
                </Section>
            </Section>
        </View >
    )
}

export default TestScreen
