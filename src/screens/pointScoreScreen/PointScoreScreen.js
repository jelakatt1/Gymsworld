import { View, ScrollView } from 'react-native'
import React from 'react'
import { COLOR, hp, JUSTIFY, wp } from '../../enums/StyleGuide'
import { AppHeader, Label, Pressable, Section, SelectField } from '../../components'
import { En } from '../../enums/AppEnums'
import { SearchBlack } from '../../assets/svg'
import { styles } from './Styles'

const ScoringData = [
    { title: 'Age', vlaue1: '17-20', vlaue2: '21-25', vlaue3: '26-30', vlaue4: '31-35', vlaue5: '36-40', vlaue6: '41-45', },
    { title: 'Max Reps', vlaue1: '20', vlaue2: '23', vlaue3: '23', vlaue4: '23', vlaue5: '21', vlaue6: '20', },
    { title: 'Min Reps', vlaue1: '4', vlaue2: '5', vlaue3: '5', vlaue4: '5', vlaue5: '5', vlaue6: '5', },
    { title: 'Max Points', vlaue1: '100', vlaue2: '100', vlaue3: '100', vlaue4: '100', vlaue5: '100', vlaue6: '100', },
    { title: 'Min Points', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
]
const RepsData = [
    { title: 'Reps', vlaue1: '17-20', vlaue2: '21-25', vlaue3: '26-30', vlaue4: '31-35', vlaue5: '36-40', vlaue6: '41-45', },
    { title: '23', vlaue2: '23', vlaue3: '23', vlaue4: '23', },
    { title: '22', vlaue2: '5', vlaue3: '5', vlaue4: '5', },
    { title: '21', vlaue2: '100', vlaue3: '100', vlaue4: '100', vlaue5: '100', },
    { title: '20', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
    { title: '19', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
    { title: '18', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
    { title: '17', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
    { title: '16', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
    { title: '15', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
    { title: '14', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
    { title: '13', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
    { title: '12', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
    { title: '11', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
    { title: '10', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
    { title: '9', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
    { title: '8', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
    { title: '7', vlaue1: '40', vlaue2: '40', vlaue3: '40', vlaue4: '40', vlaue5: '40', vlaue6: '40', },
    { title: '6', vlaue1: '40', vlaue6: '40', },
]

const PointScoreScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <AppHeader title={'Point Scoring Pullups'} LeftComp={En.BackArrow} RightComp={En.Setting} />
            <Section fillX={'5%'}>
                <Section row center justify={JUSTIFY.between}>
                    <SelectField placeholder={'Select Age'} color={COLOR.WHITE}
                        radius={hp(2)} width={wp('30%')}
                    />
                    <SelectField placeholder={'Select Age Range'} color={COLOR.WHITE}
                        radius={hp(2)} width={wp('40%')}
                    />
                    <Pressable center justify={JUSTIFY.center} bg={COLOR.YELLOW} fill={hp(2)} radius={hp(1.8)} >
                        <SearchBlack />
                    </Pressable>
                </Section>

                <Section height={hp(75)} fillB={hp(1)} radius={hp(2)} bg={COLOR.LIGHT_GREY_2} spaceY={hp(2)}>
                    <Section height={hp(7)} center justify={JUSTIFY.center} bg={COLOR.GREY} style={styles.headerView} brBW={2} brBC={COLOR.BLACK}>
                        <Label text={'Male Pullups'} size={16} />
                    </Section>

                    <ScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
                        {ScoringData.map((item, index) => {
                            const { title, vlaue1, vlaue2, vlaue3, vlaue4, vlaue5, vlaue6 } = item
                            return (
                                <Section key={index} spaceY={hp(0.5)} row justify={JUSTIFY.between} fillX={'2.5%'}>
                                    <Label text={title} style={styles.boldText} />
                                    <Section row center width={'75%'} justify={JUSTIFY.between}>
                                        <Label text={vlaue1} style={index === 0 ? styles.boldText : styles.text} />
                                        <Label text={vlaue2} style={index === 0 ? styles.boldText : styles.text} />
                                        <Label text={vlaue3} style={index === 0 ? styles.boldText : styles.text} />
                                        <Label text={vlaue4} style={index === 0 ? styles.boldText : styles.text} />
                                        <Label text={vlaue5} style={index === 0 ? styles.boldText : styles.text} />
                                        <Label text={vlaue6} style={index === 0 ? styles.boldText : styles.text} />
                                    </Section>
                                </Section>
                            )
                        })}
                        {RepsData.map((item, index) => {
                            const { title, vlaue1, vlaue2, vlaue3, vlaue4, vlaue5, vlaue6 } = item
                            return (
                                <Section key={index} spaceY={hp(0.5)} row justify={JUSTIFY.between} fillX={'2.5%'}>
                                    <Label text={title} style={index === 0 ? styles.boldText : styles.text} />
                                    <Section row center width={'75%'} justify={JUSTIFY.between}>
                                        <Label text={vlaue1} style={index === 0 ? styles.boldText : styles.text} />
                                        <Label text={vlaue2} style={index === 0 ? styles.boldText : styles.text} />
                                        <Label text={vlaue3} style={index === 0 ? styles.boldText : styles.text} />
                                        <Label text={vlaue4} style={index === 0 ? styles.boldText : styles.text} />
                                        <Label text={vlaue5} style={index === 0 ? styles.boldText : styles.text} />
                                        <Label text={vlaue6} style={index === 0 ? styles.boldText : styles.text} />
                                    </Section>
                                </Section>
                            )
                        })}
                    </ScrollView>

                </Section>
            </Section>
        </View>
    )
}

export default PointScoreScreen
