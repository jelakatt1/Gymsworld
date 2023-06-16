import { StyleSheet, Modal, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Img, Label, Pressable, Section } from '../widgets'
import { COLOR, JUSTIFY, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'
import { useSelector } from 'react-redux'
import { getItem } from '../../utils/asyncStorage'
import { ACCOUNT_TYPE, KEYS } from '../../utils/Keys'
import { useNavigation } from '@react-navigation/native'
import { METHOD, ROUTES } from '../../data/remote/routes'
import apiRequest from '../../data/remote/webHandler'


const SelectOrgModal = ({ visible, setVisible, handleOrgSelect }) => {
    const user = useSelector(({ appReducer }) => appReducer.user)
    const navigation = useNavigation();
    const [orgData, setOrgdata] = useState([]);
    useEffect(() => {
        if (user?.role == ACCOUNT_TYPE.USER) {
            getData();
        }
    }, [])

    const getData = async () => {
        try {
            const result = await apiRequest({
                method: METHOD.GET,
                url: ROUTES.USER_ORGANIZATIONS(user?.id),
            });

            if (result.status === 200) {
                setOrgdata(result?.data?.data)
            }
        } catch (error) {
            console.log(error);
        }
        // const data = await getItem(KEYS.USER_ORGANIZATIONS);
        // if (data) {
        //     setOrgdata(data)
        // }
    }

    return (
        <Modal
            visible={visible}
            transparent
            onRequestClose={() => { navigation.goBack() }}
            animationType='fade'
        >
            <View style={styles.mainScreen}>
                <Section height={hp(45)} spaceX={'5%'} bg={COLOR.GREY} fillX={'5%'} fillY={hp(1)} spaceY={hp(1)} radius={hp(2)}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Label text={'Select organizations'} style={styles.titleStyle} />
                        {orgData?.length > 0 ?
                            orgData?.map(({ id, first_name, last_name, profile_picture }, index) => {
                                return (
                                    <Pressable style={styles.itemContainer} onClick={() => { handleOrgSelect(id, `${first_name} ${last_name}`) }} key={index}>
                                        <Img imageUrl={profile_picture} style={styles.imageStyle} />
                                        <Label text={`${first_name} ${last_name}`} textColor={COLOR.BLACK} style={TEXT_STYLE.small_text_bold} />
                                    </Pressable>
                                )
                            })
                            :
                            <Section height={hp(30)} center justify={JUSTIFY.center}>
                                <Label text={`No Organization Found`} style={TEXT_STYLE.text} />
                            </Section>
                        }
                    </ScrollView>
                </Section>
            </View>
        </Modal>
    )
}

export default React.memo(SelectOrgModal)

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
    },
    itemContainer: {
        paddingVertical: hp(1),
        paddingHorizontal: '5%',
        backgroundColor: COLOR.LIGHT_GREY_2,
        borderRadius: hp(1),
        marginVertical: hp(0.5),
        alignItems: 'center',
        flexDirection: 'row',
    },
    titleStyle: {
        ...TEXT_STYLE.text_bold,
        marginVertical: hp(2),
        color: COLOR.YELLOW,
        textAlign: 'center',
    },
    imageStyle: {
        height: hp(5),
        width: hp(5),
        borderRadius: hp(3),
        marginRight: wp(3),
    },
})