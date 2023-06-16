import { View, ScrollView } from 'react-native'
import React from 'react'
import { COLOR, hp, JUSTIFY, TEXT_STYLE, wp } from '../../../enums/StyleGuide'
import { Section, AppHeader, Label, Img, TextField, Button } from '../../../components'
import { En, MemberList } from '../../../enums/AppEnums'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './Styles'

const UserResults = () => {
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
                <AppHeader title={'User Results'} LeftComp={En.BackArrow} RightComp={En.Setting} />

                <Section
                    height={hp(82)} radius={hp(2)} bg={COLOR.LIGHT_GREY_2}
                    spaceX={'5%'} spaceY={hp(2)}
                >
                    <Section bg={COLOR.GREY} style={styles.headerView} brBC={COLOR.BLACK}>
                        <Label text={'Fill Results'} size={16} />
                        <Label text={'Test : Workout'} size={16} />
                    </Section>

                    <Label text={'Members'} style={TEXT_STYLE.small_title}
                        textColor={COLOR.BLACK} spaceL={'5%'} spaceY={hp(1)}
                    />
                    <Section spaceY={hp(1)}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode='never'>
                            {MemberList.map((item, index) => {
                                const { src, name } = item
                                return (
                                    <Section key={index} center spaceR={wp(3)} spaceB={hp(1)} width={hp(9)}>
                                        <Section
                                            height={hp(7)} width={hp(7)}
                                            justify={JUSTIFY.center} center radius={150 / 2}
                                        >
                                            <Img
                                                src={src} contain
                                                height={hp(7)} width={hp(7)} radius={150 / 2}
                                            />
                                        </Section>
                                        <Label text={name.length > 19 ? `${name.slice(0, 18)}...` : name}
                                            size={11} center spaceT={hp(0.5)} textColor={COLOR.BLACK}
                                        />
                                    </Section>
                                )
                            })}
                        </ScrollView>
                    </Section>

                    <Section fillX={'5%'}>
                        <Label text={'Survey'} style={TEXT_STYLE.small_title}
                            textColor={COLOR.BLACK} spaceY={hp(1)}
                        />
                        <TextField title={'How many reps you do ?'}
                            style={styles.input} color={COLOR.BLACK}
                            placeholder={'Write your answer'} titleStyle={styles.textStyle} />
                        <TextField title={'How mush weight you used ?'}
                            style={styles.input} color={COLOR.BLACK}
                            placeholder={'Write your answer'} titleStyle={styles.textStyle} />
                        <TextField title={'How many sets you do ?'}
                            style={styles.input} color={COLOR.BLACK}
                            placeholder={'Write your answer'} titleStyle={styles.textStyle} />
                        <Button text={'Submit'} bg={COLOR.RED} />
                    </Section>


                </Section>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default UserResults
