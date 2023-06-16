import { StyleSheet , View} from 'react-native'
import React, { useState } from 'react';
import { Label, Section } from '../widgets'
import { COLOR, hp, JUSTIFY, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { DropDownWhite } from '../../assets/svg'
import { Dropdown } from 'react-native-element-dropdown';

const renderItem = item => {
    return (
        <Section row center justify={JUSTIFY.between} fillY={hp(1.5)} fillX={'5%'}
            bg={COLOR.BLACK} style={{ borderWidth: 0 }}
        >
            <Label text={item.label} />
        </Section>
    );
}
const Data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
]

const generalSelectData = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
]

const SelectField = (props) => {
    const {
        placeholder, title, data, width, general, bg, noBorder,
        titleStyle, radius, size, color, height, style,
        value, onSelect,
    } = props
    
    return (
        <Section spaceY={hp(1)}>
            {title &&
                <Label text={title} style={[TEXT_STYLE.small_text_bold, titleStyle]} spaceB={hp(0.5)} />
            }
            <Dropdown
                style={[styles.dropdown,
                {
                    height: height ? height : hp(6),
                    width: width, backgroundColor: bg,
                    borderRadius: radius ? radius : hp(0.5),
                    borderWidth: noBorder ? 0 : 1,
                }
                    , style]}
                placeholderStyle={{ color: color ? color : COLOR.GREY, fontSize: size && size, }}
                selectedTextStyle={{ color: color ? color : COLOR.WHITE, fontSize: size && size, }}
                data={general ? generalSelectData : data ? data : Data}
                containerStyle={styles.containerStyle}
                placeholder={placeholder ? placeholder : "Select"}
                labelField="label"
                valueField="value"
                value={value && value}
                onChange={item => {
                    onSelect && onSelect(item.value)
                }}
                renderRightIcon={() => (
                    <DropDownWhite />
                )}
                renderItem={renderItem}
            />

        </Section>
    )
}

export default React.memo(SelectField)

const styles = StyleSheet.create({
    dropdown: {
        width: '100%', borderColor: COLOR.GREY,
        paddingStart: wp(5), paddingEnd: '5%',
    },
    containerStyle: {
        borderRadius: hp(0.5), overflow: 'hidden',
    }
})