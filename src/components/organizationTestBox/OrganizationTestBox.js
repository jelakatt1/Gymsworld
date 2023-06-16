import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Img, Label, Pressable, Section } from '../widgets'
import { useNavigation } from '@react-navigation/native'
import { SCREEN } from '../../enums/AppEnums'
import { COLOR, JUSTIFY, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'

const OrganizationTestBox = ({ item, style }) => {
    const navigation = useNavigation();
    const { name, created_at_human, org_info, age_ranges, gender } = item
    return (
        <Section style={[styles.testContainer, style]}>
            <Img imageUrl={org_info?.profile_picture} style={styles.testImageStyle} />
            <Section center>
                <Label text={`${org_info?.first_name} ${org_info?.last_name}`} style={TEXT_STYLE.small_text_bold} textColor={COLOR.BLUE} />
                <Label text={name} style={TEXT_STYLE.small_text_bold} textColor={COLOR.BLACK} />
                <Label text={created_at_human} style={TEXT_STYLE.small_text} textColor={COLOR.BLACK} />
                <Pressable height={hp(3)} width={wp(20)} center
                    justify={JUSTIFY.center} radius={150 / 2}
                    bg={COLOR.YELLOW} spaceT={hp(1)}
                    onClick={() => { navigation.navigate(SCREEN.TEST_SCREEN, { data: item }) }}
                >
                    <Label text={'Details'} textColor={COLOR.BLACK} size={11} />
                </Pressable>
            </Section>
        </Section>
    )
}

export default React.memo(OrganizationTestBox)

const styles = StyleSheet.create({
    testContainer: {
        paddingBottom: hp(1),
        borderRadius: hp(1),
        width: wp(40),
        marginRight: wp(3),
        backgroundColor: COLOR.LIGHT_GREY_2,
    },
    testImageStyle: {
        height: hp(8),
        width: wp(40),
        borderTopRightRadius: hp(1),
        borderTopLeftRadius: hp(1),
        marginBottom: hp(1),
    },
})