import { StyleSheet } from 'react-native'
import React from 'react'
import { CaloriesIcon } from '../../assets/svg'
import { Img, Label, Section } from '../widgets'
import { COLOR, hp, JUSTIFY, TEXT_STYLE, wp } from '../../enums/StyleGuide'

const TestBox = ({ item }) => {
    const { scores, created_at, org_info, reps, test_name } = item
    return (
        <Section height={hp(8)} row center style={styles.headerView} justify={JUSTIFY.between}
            bg={COLOR.LIGHT_GREY} brBW={2} brBC={COLOR.BLACK} fillX={'2.5%'} fillY={hp(1)}
            radius={hp(2)} spaceY={hp(0.5)}
        >
            <Section row center>
                <Img
                    imageUrl={org_info?.profile_picture} contain
                    height={hp(5)} width={hp(5)} radius={150 / 2}
                />
                <Section spaceL={wp(5)}>
                    <Label text={test_name} style={TEXT_STYLE.text_bold} />
                    <Label text={created_at} style={TEXT_STYLE.small_text} textColor={COLOR.BLACK} />
                    <Label text={org_info?.username} style={TEXT_STYLE.small_text} textColor={COLOR.BLACK} />
                </Section>
            </Section>
            <Section style={{ alignItems: 'flex-end' }}>
                <Section row center>
                    <CaloriesIcon />
                    <Label text={`My Scores : ${scores}`} style={TEXT_STYLE.small_text} spaceL={wp(2)} />
                </Section>
                <Label text={`My reps : ${reps}`} style={TEXT_STYLE.small_text} />
            </Section>
        </Section>
    )
}


export default React.memo(TestBox)

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