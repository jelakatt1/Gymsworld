import { StyleSheet } from 'react-native'
import { COLOR, hp, wp } from '../../enums/StyleGuide'

export const styles = StyleSheet.create({
    selectStyle:{
        width:wp('40%'),
    },
    InputStyle: {
        height: hp(6), borderWidth: 1, borderRadius: hp(1), borderColor: COLOR.GREY, justifyContent: 'center',
        paddingHorizontal: '5%'
    },
    miniMap: {
        width: wp('88%'),
        height: 200,
        borderRadius: 20,
        alignSelf:'center'
    },
    profileImageContainer: {
        position: 'absolute', bottom: 0, height: hp(14), width: hp(14), borderRadius: 150 / 2,
        alignItems: 'center', justifyContent: 'center', marginLeft: wp('10%')
    },
})