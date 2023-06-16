import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react';
import { Label, Pressable, Section } from '../widgets'
import { COLOR, hp, JUSTIFY, TEXT_STYLE } from '../../enums/StyleGuide'
import { DropDownWhite } from '../../assets/svg'
import CountryPickerModal, { DARK_THEME } from 'react-native-country-picker-modal'

const CountryField = (props) => {
    const {
        placeholder, title, width, bg, noBorder,
        titleStyle, radius, size, height, style,
        onSelect, value
    } = props
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <Section spaceY={hp(1)}>
            {title &&
                <Label text={title} style={[TEXT_STYLE.small_text_bold, titleStyle]} spaceB={hp(0.5)} />
            }
            <Pressable row center justify={JUSTIFY.between}
                onClick={() => { setModalVisible(true) }}
                style={[styles.countryContainer,
                {
                    height: height ? height : hp(6),
                    width: width, backgroundColor: bg,
                    borderRadius: radius ? radius : hp(0.5),
                    borderWidth: noBorder ? 0 : 1,
                }, style]}>
                <View style={{ position: 'absolute' }}>
                    <CountryPickerModal
                        visible={modalVisible} theme={DARK_THEME}
                        containerButtonStyle={{ height: 0 }}
                        onSelect={(x) => { onSelect(x.name); setModalVisible(false) }}
                        onClose={() => setModalVisible(false)}
                    />
                </View>
                <Label text={value || placeholder}
                    style={[{ color: value ? COLOR.WHITE : COLOR.GREY, fontSize: size && size }, TEXT_STYLE.text]}
                />
                <DropDownWhite />
            </Pressable>
        </Section>
    )
}

export default React.memo(CountryField)

const styles = StyleSheet.create({
    countryContainer: {
        width: '100%', borderColor: COLOR.GREY,
        paddingHorizontal: '5%',
    },
})