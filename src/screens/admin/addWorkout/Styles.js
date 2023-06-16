import { StyleSheet } from 'react-native'
import { COLOR, commonStyles, hp, TEXT_STYLE, wp } from '../../../enums/StyleGuide'

export const styles = StyleSheet.create({
    titleStyle: {
        ...TEXT_STYLE.small_text,
    },
    imageContainer: {
        height: hp(12), marginVertical: hp(1),
        borderRadius: hp(1.5), ...commonStyles.center,
        overflow: 'hidden',
    },
    inputStyle: {
        height: hp(5), width: wp('38%'), borderRadius: hp(1.5),
        borderWidth: 1, borderColor: COLOR.LIGHT_GREY,
    },
    multiInputContainer: {
        height: hp(10), borderRadius: hp(1.5),
        borderWidth: 1, borderColor: COLOR.LIGHT_GREY,
    },
    multiInput: {
        height: '100%', textAlignVertical: 'top'
    },

    sliderContainerStyle: {
        width: '100%',
        alignItems: 'center',
    },
    markerStyle: {
        height: hp(4), width: hp(4),
        borderRadius: hp(5), borderWidth: 0.7, borderColor: COLOR.WHITE,
        backgroundColor: COLOR.LIGHT_GREY,
        alignItems: 'center', justifyContent: 'center',
    },
    timeTrack: {
        backgroundColor: COLOR.LIGHT_GREY,
        height: 5, borderRadius: 150 / 2, width: 100,
    },
    selectedTrack: {
        backgroundColor: COLOR.YELLOW, width: 100,
    },
    buttonStyle: {
        height: hp(3.5),
        width: wp(34),
        backgroundColor: COLOR.LIGHT_GREY_2,
        borderRadius: hp(3),
        ...commonStyles.center,
        marginVertical: hp(0.5),
        alignSelf: 'flex-end',
    },
    smallButtonStyle: {
        height: hp(2.8),
        width: wp(16),
        backgroundColor: COLOR.YELLOW,
        borderRadius: 150 / 2,
        ...commonStyles.center,
    },
    borderButtonStyle: {
        backgroundColor: COLOR.RED,
    },
    itemContainer: {
        paddingVertical: hp(1),
        paddingHorizontal: '5%',
        borderRadius: hp(1),
        backgroundColor: COLOR.LIGHT_GREY,
        marginVertical: hp(0.5),
    },
})