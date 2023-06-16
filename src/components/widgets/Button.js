import React from 'react'
import { COLOR, JUSTIFY, TEXT_STYLE, hp } from '../../enums/StyleGuide'
import Label from './Label'
import Pressable from './Pressable'

const Button = (props) => {
    const {
        text, bg, borderColor,
        textColor, textBold, textStyle,
        onClick, style
    } = props
    return (
        <Pressable
            height={hp(6.3)} width={'100%'} bg={bg ? bg : COLOR.YELLOW}
            radius={150 / 2} row spaceY={hp(1)} center justify={JUSTIFY.center}
            style={[{
                borderWidth: borderColor && 1,
                borderColor: borderColor,
            }, style]}
            onClick={() => { onClick && onClick() }}
        >
            <Label
                text={text} textColor={textColor} textBold={textBold}
                style={[TEXT_STYLE.small_title, textStyle]}
            />
        </Pressable>
    )
}

export default React.memo(Button)

