import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { Label, Pressable, Section } from '../widgets'
import { ActiveOpacity, COLOR, hp, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { DropDownWhite } from '../../assets/svg'
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate, isIOS } from '../../utils/myUtils';

const DatePicker = (props) => {
    const {
        placeholder, title, width, bg, noBorder,
        titleStyle, radius, size, color, height, style,
        value, onSelect,
    } = props
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || value;
        if (isIOS() != true) {
            setShow(false);

        }
        onSelect(currentDate);
    };

    return (
        <Section spaceY={hp(1)}>
            {title &&
                <Label text={title} style={[TEXT_STYLE.small_text_bold, titleStyle]} spaceB={hp(0.5)} />
            }
            <Pressable row center
                onClick={() => { setShow(true) }}
                style={[styles.dateContainer,
                {
                    height: height ? height : hp(6),
                    width: width, backgroundColor: bg,
                    borderRadius: radius ? radius : hp(0.5),
                    borderWidth: noBorder ? 0 : 1,
                }, style]}
            >
                <Label
                    text={value ? formatDate(value) : placeholder}
                    style={[{ color: color ? color : COLOR.WHITE, fontSize: size && size }, TEXT_STYLE.text]}
                />
                <DropDownWhite />
            </Pressable>
            {show && (
                <>
                    <DateTimePicker
                        value={value}
                        themeVariant='dark'
                        mode="date"
                        display={isIOS() ? 'spinner' : 'calender'}
                        onChange={onChange}
                    />
                    {
                        isIOS() &&
                        <TouchableOpacity
                            onPress={() => setShow(false)}
                            activeOpacity={ActiveOpacity}>
                            <Label
                                text={'Done'}
                                style={[{ color: COLOR.YELLOW, ...TEXT_STYLE.text_bold, fontSize: 16, alignSelf: 'center' }]}
                            />
                        </TouchableOpacity>

                    }

                </>
            )}
        </Section>
    )
}

export default React.memo(DatePicker)

const styles = StyleSheet.create({
    dateContainer: {
        width: '100%', borderColor: COLOR.GREY,
        paddingStart: wp(5), paddingEnd: '5%',
        justifyContent: 'space-between',
    },
})