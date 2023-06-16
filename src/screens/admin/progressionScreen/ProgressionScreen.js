import { ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AppHeader, CheckBox, Label, Pressable, Section, SelectField } from '../../../components'
import { COLOR, commonStyles, hp, JUSTIFY, TEXT_STYLE, wp } from '../../../enums/StyleGuide'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { En } from '../../../enums/AppEnums'
import { SearchBlack } from '../../../assets/svg'
import { styles } from './Styles'

const ProgressionItem = ({ id, day, interval, exercise, time }) => {
    const [check, setCheck] = useState(false);
    return (
        <Section bg={COLOR.GREY_2} style={[styles.container, id === 0 && styles.bottomRadius]}>
            <Section width={'68%'}>
                <Label text={`${day} :`} style={TEXT_STYLE.text_bold} textColor={COLOR.YELLOW} spaceB={hp(0.5)} />
                <Label text={interval} style={TEXT_STYLE.small_text} />
                <Label text={exercise} style={TEXT_STYLE.small_text} textColor={COLOR.LIGHT_GREY_3} />
                <CheckBox text={'Mark if you done this test'}
                    check={check} onClick={() => { setCheck(!check) }}
                    textStyle={TEXT_STYLE.small_text} size={hp(1.5)}
                />
            </Section>
            <Section center width={'30%'}>
                <Label text={'Total Time Repetition :'} size={11} textBold
                    textColor={COLOR.YELLOW}
                />
                <Pressable brW={1} brC={COLOR.YELLOW} width={wp(24)} style={styles.btn}>
                    <Label text={time} textColor={COLOR.YELLOW} size={11} />
                </Pressable>
                <Pressable bg={COLOR.YELLOW} width={wp(24)} style={styles.btn}>
                    <Label text={'Add Details'} textColor={COLOR.BLACK} size={11} />
                </Pressable>
            </Section>
        </Section>
    )
}

const Data = [
    {
        day: 'Day 1', interval: 'Interval : 20 on / : 20 off 2 Rounds', time: '6 min 20 sec',
        exercise: 'Mountain Climbers, Plank, Flutter Kicks,Prone Superman, Four Way Bear Crawl',
    },
    {
        day: 'Day 2', interval: '7 min AMRAP (As many rounds as possible)', time: '6 min 20 sec',
        exercise: 'Mountain Climbers, Plank, Flutter Kicks,Prone Superman, Four Way Bear Crawl',
    },
    {
        day: 'Day 3', interval: '7 min AMRAP (As many rounds as possible)', time: '6 min 20 sec',
        exercise: 'Mountain Climbers, Plank, Flutter Kicks,Prone Superman, Four Way Bear Crawl',
    },
    {
        day: 'Day 4', interval: '7 min AMRAP (As many rounds as possible)', time: '6 min 20 sec',
        exercise: 'Mountain Climbers, Plank, Flutter Kicks,Prone Superman, Four Way Bear Crawl',
    },
    {
        day: 'Day 5', interval: '7 min AMRAP (As many rounds as possible)', time: '6 min 20 sec',
        exercise: 'Mountain Climbers, Plank, Flutter Kicks,Prone Superman, Four Way Bear Crawl',
    },
    {
        day: 'Day 6', interval: '7 min AMRAP (As many rounds as possible)', time: '6 min 20 sec',
        exercise: 'Mountain Climbers, Plank, Flutter Kicks,Prone Superman, Four Way Bear Crawl',
    },
    {
        day: 'Day 7', interval: '7 min AMRAP (As many rounds as possible)', time: '6 min 20 sec',
        exercise: 'Mountain Climbers, Plank, Flutter Kicks,Prone Superman, Four Way Bear Crawl',
    },
]

const ProgressData = [
    { week: 'Week 1', data: [...Data.slice(0, 3)] },
    { week: 'Week 2', data: [...Data.slice(0, 4)] },
]

const ProgressionScreen = () => {
    return (
        <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>
            <AppHeader title={'Plank Progression'} LeftComp={En.BackArrow} RightComp={En.Setting} />

            <ScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
                <Section fillX={'5%'} fillB={hp(2)}>
                    <Section row center justify={JUSTIFY.between} spaceB={hp(1)}>
                        <SelectField
                            placeholder={'Select Age'}
                            color={COLOR.WHITE} radius={hp(2)} width={wp('75%')}
                        />
                        <Pressable center justify={JUSTIFY.center} bg={COLOR.YELLOW} fill={hp(2)} radius={hp(1.8)} >
                            <SearchBlack />
                        </Pressable>
                    </Section>

                    {ProgressData.map((item, index) => {
                        const { week, data } = item
                        return (
                            <Section key={index} spaceB={hp(1)}>
                                <Section bg={COLOR.GREY_2} style={styles.headerView}>
                                    <Label text={week} style={TEXT_STYLE.text_bold} />
                                </Section>
                                {data.map((item, index) => {
                                    const { day, interval, exercise, time } = item
                                    return (
                                        <ProgressionItem key={index} id={index}
                                            day={day} interval={interval} exercise={exercise} time={time}
                                        />

                                    )
                                })}
                            </Section>
                        )
                    })}
                </Section>

            </ScrollView>
        </Section>
    )
}

export default ProgressionScreen