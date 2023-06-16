import { StyleSheet } from 'react-native'
import { COLOR, hp, TEXT_STYLE, wp } from '../../../enums/StyleGuide'

export const styles = StyleSheet.create({
    headingStyle: {
        ...TEXT_STYLE.small_text,
        paddingHorizontal: '10%',
        marginVertical: hp(1),
    },
    profileImageContainer: {
        position: 'absolute', bottom: 0, height: hp(14), width: hp(14), borderRadius: 150 / 2,
        alignItems: 'center', justifyContent: 'center', marginLeft: wp('10%')
    },
    multiInput: { height: hp(13), textAlignVertical: 'top' },
    InputStyle: {
        height: hp(6), borderWidth: 1, borderRadius: hp(1), borderColor: COLOR.GREY, justifyContent: 'center',
        paddingHorizontal: '5%'
    },
    miniMap: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        alignSelf:'center'
    },
})