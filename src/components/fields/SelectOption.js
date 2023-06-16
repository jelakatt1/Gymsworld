import React from 'react'
import { Label, Section } from '../widgets'
import { commonStyles, hp, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import CheckBox from './CheckBox'

const SelectOption = ({ title, titleStyle,size, titleColor, data, value, callBack, style, optionStyle, textStyle }) => {
    return (
        <Section spaceY={hp(1)}>
            {title &&
                // <Label text={title} style={[TEXT_STYLE.text_bold, titleStyle]} spaceB={hp(0.5)} textColor={titleColor} />
                <Label text={title} style={[TEXT_STYLE.small_text_bold, titleStyle]} spaceB={hp(0.5)} textColor={titleColor} />
            }
            <Section row center style={[commonStyles.flexWrap, style]}>
                {data?.map((item, index) => {
                    return (
                        <Section style={optionStyle} key={index}>
                            <CheckBox text={item.text} size={size} onClick={() => { callBack(index) }}
                                check={value === index ? true : false} textStyle={textStyle}
                            />
                        </Section>
                    )
                })}
            </Section>
        </Section>
    )
}

export default React.memo(SelectOption)
