import { StyleSheet } from 'react-native'
import { COLOR, TEXT_STYLE, hp } from '../../enums/StyleGuide'

export const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: COLOR.BLACK,
    },
    header: {
        height: hp(7),
        backgroundColor: COLOR.RED,
        borderRadius: 10,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        // minWidth: '30%',
    },
    headerText: {
        color: COLOR.CREAM,
        ...TEXT_STYLE.text_bold,
    },
    hourText: {
        color: COLOR.WHITE,
        ...TEXT_STYLE.text,
    },
    gridRow: {
        borderTopWidth: 1,
        borderColor: COLOR.BLUE_2,
    },
    gridColumn: {
        borderLeftWidth: 1,
        borderColor: COLOR.CREAM,
    },
    eventContainer: {
        borderRadius: 10,
        padding: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        borderColor: COLOR.WHITE,
        borderWidth: 0.5,
        // maxWidth: 40,
    },
    itemContainer: {
        marginVertical: hp(1),
        paddingHorizontal: '5%',
        paddingVertical: hp(1),
        backgroundColor: COLOR.GREY,
        borderRadius: hp(1),
    },
}) 