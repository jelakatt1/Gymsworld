import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TextInput } from 'react-native'
import { SCREEN } from '../../enums/AppEnums'
import { COLOR, hp, JUSTIFY, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { Label, Pressable, Section } from '../widgets'

const TextField = (props) => {
    const {
        placeholder, value, onChangeText, title, titleStyle,
        keyboardType, secure, multiline, radius, placeholderColor,
        svg, endSvg, onSvg, onEndSvg, size, color,
        height, style, width, forget, inputStyle,
    } = props
    const navigation = useNavigation();
    return (
        <Section spaceY={hp(1)}>
            {title &&
                <Section row justify={JUSTIFY.between} spaceB={hp(0.5)}>
                    <Label text={title} style={[TEXT_STYLE.small_text_bold, titleStyle]} />
                    {forget &&
                        <Pressable onClick={() => { navigation.navigate(SCREEN.FORGET) }}>
                            <Label text={'Forget Password'} textColor={COLOR.YELLOW} style={TEXT_STYLE.small_text_bold} />
                        </Pressable>
                    }
                </Section>
            }
            <Section
                height={height ? height : hp(6)} width={width}
                row center brW={1} brC={COLOR.GREY}
                radius={radius ? radius : hp(0.5)} style={style}
            >
                {svg &&
                    <Pressable spaceL={wp(5)} onClick={() => { onSvg && onSvg() }}>
                        {svg}
                    </Pressable>
                }
                <TextInput
                    style={[{
                        flex: 1, paddingHorizontal: '5%', color: COLOR.WHITE,
                        height: height ? height : hp(6), fontSize: size && size,
                        color: color ? color : COLOR.WHITE, width: width,
                        textAlignVertical: multiline ? 'top' : 'center',
                    },inputStyle]}
                    multiline={multiline}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderColor ? placeholderColor : COLOR.GREY}
                    keyboardType={keyboardType}
                    cursorColor={COLOR.LIGHT_GREY}
                    onChangeText={event => {
                        onChangeText && onChangeText(event);
                    }}
                    secureTextEntry={secure || false}
                />
                {endSvg &&
                    <Pressable spaceR={wp(5)} spaceL={wp(2)} onClick={() => { onEndSvg && onEndSvg() }}>
                        {endSvg}
                    </Pressable>
                }
            </Section>

        </Section>
    )
}

export default React.memo(TextField)
