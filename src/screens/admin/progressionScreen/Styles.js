import { StyleSheet } from 'react-native'
import { hp, commonStyles, wp } from '../../../enums/StyleGuide'

export const styles = StyleSheet.create({
    headerView: {
        height: hp(5.5), paddingHorizontal: '5%',
        borderTopRightRadius: hp(2),
        borderTopLeftRadius: hp(2),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        borderRadius: hp(2),
        paddingVertical: hp(2),
        paddingHorizontal: '5%',
        marginVertical: hp(0.5),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    bottomRadius:{
        marginTop:hp(0.75),
        marginBottom:hp(0.5),
        borderRadius:0,
        borderBottomRightRadius: hp(2),
        borderBottomLeftRadius: hp(2),
    },
    btn: {
        ...commonStyles.center, paddingVertical: hp(0.4),
        borderRadius: 150 / 2, marginVertical: hp(0.5),
    },
})