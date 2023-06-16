import { StyleSheet } from 'react-native'
import React from 'react'
import { Img, Label, Pressable, Section } from '../widgets'
import { COLOR, hp, TEXT_STYLE, wp } from '../../enums/StyleGuide'

const WorkoutItem = ({ title, score, image }) => {
    return (
      <Section spaceR={wp(3)} width={wp(40)} height={hp(25)}>
        <Section height={'67%'}>
          <Img
            src={image}
            height={'100%'} width={'100%'} radius={hp(1)} contain
          />
        </Section>
        <Section height={'32%'} spaceT={'1%'}>
          <Label text={title} style={TEXT_STYLE.small_text} />
          <Section row center>
            <Label text={'Top Scores : '} style={TEXT_STYLE.small_text} />
            <Label text={score} style={TEXT_STYLE.small_text} textColor={COLOR.YELLOW} />
          </Section>
          {/* <Section row>
            <Pressable style={styles.button}>
              <Label text={'Details'} textColor={COLOR.WHITE} size={11} />
            </Pressable>
          </Section> */}
        </Section>
      </Section>
    )
  }

export default React.memo(WorkoutItem)

const styles = StyleSheet.create({
    button:{
        borderWidth: 1, borderColor: COLOR.WHITE,
        height: hp(2.5), paddingHorizontal: wp(1.5),
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 150 / 2, marginHorizontal:wp(1),
    },
})