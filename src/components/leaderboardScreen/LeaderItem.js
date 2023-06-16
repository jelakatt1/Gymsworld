import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { CaloriesIcon, CaloriesIconBlack } from '../../assets/svg'
import { Img, Label, Pressable, Section } from '../widgets'
import { COLOR, commonStyles, hp, JUSTIFY, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import Collapsible from 'react-native-collapsible';

const LeaderItem = ({ item }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const { user_first_name, user_last_name, user_profile_picture, user_scores, test_gender, user_age, test_weight, workout_name, org_username, user_test_reps } = item
    return (
        <Section radius={hp(2)} bg={COLOR.LIGHT_GREY_2} spaceY={hp(1)}>
            {/* Header */}
            <Pressable height={hp(8)} row center style={styles.headerView} justify={JUSTIFY.between}
                bg={COLOR.LIGHT_GREY} brBW={2} brBC={COLOR.BLACK} fillX={'2.5%'} fillY={hp(1)}
                radius={isCollapsed ? hp(2) : 0} onClick={() => { setIsCollapsed(!isCollapsed) }}
            >
                <Section row center>
                    <Img
                        imageUrl={user_profile_picture} contain
                        height={hp(5)} width={hp(5)} radius={150 / 2}
                    />
                    {/* <Section spaceL={wp(5)}>
                        <Label text={org_username} style={TEXT_STYLE.text_bold} />
                        <Label text={`${user_first_name} ${user_last_name}`} style={TEXT_STYLE.text} textColor={COLOR.BLACK} />
                    </Section> */}
                    <Section spaceL={wp(5)}>
                        <Label text={`${user_first_name} ${user_last_name}`} style={TEXT_STYLE.text_bold} />
                        <Label text={'date'} style={TEXT_STYLE.small_text} textColor={COLOR.BLACK} />
                        <Label text={org_username} style={TEXT_STYLE.small_text} textColor={COLOR.BLACK} />
                    </Section>
                </Section>
                <Section style={{ alignItems: 'flex-end' }}>
                    <Section row center>
                        {/* {bg === COLOR.YELLOW ?
                            <CaloriesIconBlack />
                            : */}
                        <CaloriesIcon />
                        {/* } */}
                        <Label text={`My Scores : ${user_scores}`} style={TEXT_STYLE.small_text} spaceL={wp(2)} />
                    </Section>
                    <Label text={`My reps : ${user_test_reps}`} style={TEXT_STYLE.small_text} />
                </Section>
            </Pressable>
            {/* Header ends */}

            <Collapsible collapsed={isCollapsed}>
                <Section fillX={'2.5%'} fillY={hp(1)}>
                    {/* <Label text={`User Details`} textColor={COLOR.BLACK} textBold
                        style={TEXT_STYLE.text_bold} spaceY={hp(0.5)}
                    />
                    <Section row center>
                        <Section row center>
                            <Label text={'Gender :'} style={styles.small_text} textBold />
                            <Label text={test_gender} style={styles.small_text} />
                        </Section>
                        <Section row center>
                            <Label text={'Age :'} style={styles.small_text} textBold />
                            <Label text={user_age} style={styles.small_text} />
                        </Section>
                        <Section row center>
                            <Label text={'Weight :'} style={styles.small_text} textBold />
                            <Label text={test_weight} style={styles.small_text} />
                        </Section>
                        <Section row center>
                            <Label text={'Height :'} style={styles.small_text} textBold />
                            <Label text={'5’10”'} style={styles.small_text} />
                        </Section>
                    </Section> */}

                    <Label text={`Workout Details`} textColor={COLOR.BLACK} textBold
                        style={TEXT_STYLE.text_bold} spaceY={hp(0.5)}
                    />

                    <Section row center>
                        <Section row center>
                            <Label text={'Workout Name :'} style={styles.small_text} textBold />
                            <Label text={workout_name} style={styles.small_text} />
                        </Section>
                        <Section row center>
                            <Label text={'Reps :'} style={styles.small_text} textBold />
                            <Label text={user_test_reps} style={styles.small_text} />
                        </Section>
                    </Section>

                    {/* <Section spaceL={1} width={'25%'} center>
                        <Section>
                            {svg}
                        </Section>
                        <Label text={'PushUP'} textColor={COLOR.BLACK} size={11} textBold />
                        <Label text={30} textColor={COLOR.BLACK} size={12} />
                    </Section> */}

                    {/* Exercise Count Section */}
                    {/* <Section row spaceT={hp(1)} center>
                        {ExerciseData?.map((item, index) => {
                            const { svg, text, value } = item
                            return (
                                <Section key={index} spaceL={1} width={'25%'} center>
                                    <Section>
                                        {svg}
                                    </Section>
                                    <Label text={text} textColor={COLOR.BLACK} size={11} textBold />
                                    <Label text={value} textColor={COLOR.BLACK} size={12} />
                                </Section>
                            )
                        })}

                    </Section> */}
                    {/* Button Section */}
                    {/* {!test &&
                        <Section row justify={JUSTIFY.end} spaceY={hp(1)}>
                            <Pressable style={styles.button}>
                                <Label text={'Upload Videos'} textColor={COLOR.BLACK} style={TEXT_STYLE.small_text} />
                            </Pressable>
                            <Pressable style={styles.button}>
                                <Label text={'Detail'} textColor={COLOR.BLACK} style={TEXT_STYLE.small_text} />
                            </Pressable>
                        </Section>
                    } */}

                    {/* Vedion Section */}
                    {/* {videosData &&
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {videosData.map((item, index) => {
                                const { title, date, src } = item
                                return (
                                    <Section key={index} spaceR={wp(3)}>
                                        <Section height={hp(12)} width={wp(40)} spaceB={hp(1)}
                                            bg={COLOR.BLACK} radius={hp(2)} center justify={JUSTIFY.center}
                                        >
                                            <Img
                                                src={src}
                                                contain style={styles.imageStyle}
                                            />
                                            <View style={{ position: 'absolute' }}>
                                                <PlayButtonRed height={hp(3)} width={hp(3)} />
                                            </View>
                                        </Section>
                                        <Section width={wp(40)} style={commonStyles.flexWrap}>
                                            <Label text={title?.length > 18 ? `${title.slice(0, 17)}...` : title}
                                                textColor={COLOR.BLACK} style={TEXT_STYLE.text} />
                                            <Label text={date} textColor={COLOR.BLACK} style={TEXT_STYLE.small_text} />
                                        </Section>
                                    </Section>
                                )
                            })
                            }
                        </ScrollView>
                    } */}
                </Section>
            </Collapsible>

        </Section>
    )
}


export default React.memo(LeaderItem)

const styles = StyleSheet.create({
    headerView: {
        borderTopRightRadius: hp(2),
        borderTopLeftRadius: hp(2),
    },
    small_text: { fontSize: 11, color: COLOR.BLACK, marginHorizontal: wp(1) },
    button: {
        backgroundColor: COLOR.YELLOW,
        paddingHorizontal: wp(3.5), paddingVertical: hp(0.5),
        borderRadius: 150 / 2, marginLeft: wp(1),
    },
    imageStyle: { height: hp(12), width: wp(40), borderRadius: hp(2), opacity: 0.7 },
})