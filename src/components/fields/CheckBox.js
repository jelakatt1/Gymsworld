import { StyleSheet } from 'react-native'
import React from 'react'
import { Label, Pressable, Section } from '../widgets'
import { COLOR, hp, JUSTIFY, TEXT_STYLE, wp } from '../../enums/StyleGuide'

const CheckBox = ({ text, check, size, onClick, textStyle, style }) => {
  const _size = size ? size : hp(2)
  return (
    <Pressable row center spaceY={hp(1)} spaceR={wp(5)}
      onClick={() => { onClick && onClick() }} style={style}
    >
      <Section height={_size} width={_size} bg={COLOR.WHITE} radius={2} center justify={JUSTIFY.center}>
        {check &&
          <Section height={'80%'} width={'80%'} bg={COLOR.YELLOW} radius={2}>

          </Section>
        }
      </Section>
      <Label text={text} style={[TEXT_STYLE.small_text, textStyle]} spaceL={wp(2)} />
    </Pressable>
  )
}

export default React.memo(CheckBox)

const styles = StyleSheet.create({
})