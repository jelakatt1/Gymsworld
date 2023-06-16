import React from 'react';
import { Modal, StatusBar, StyleSheet, View } from 'react-native';
import { En } from '../../enums/AppEnums';
import { COLOR, commonStyles, hp, TEXT_STYLE } from '../../enums/StyleGuide';
import Label from './Label';
import Pressable from './Pressable';
import Section from './Section';

const CustomAlert = ({ visible, onClose, modalData }) => {
    let buttonData = modalData.buttons;
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                onClose(!visible);
            }}
        >
            <View style={styles.centeredView}>
                <StatusBar backgroundColor={COLOR.MODAL_BACKGROUND} barStyle={'light-content'} />
                <Section bg={COLOR.GREY} style={[styles.modalView]}>
                    {modalData.message &&
                        <Label text={modalData.message} style={TEXT_STYLE.text_bold} center spaceY={hp(1)} />
                    }
                    <Section spaceT={hp(1)} center>
                        {buttonData?.map((item, index) => {
                            return (
                                <Pressable key={index} style={styles.button}
                                    bg={item.text === En.cancel ? COLOR.YELLOW : COLOR.LIGHT_GREY}
                                    onClick={() => {

                                        onClose(false)

                                        setTimeout(() => {
                                            item.onPress() && item.onPress();
                                        }, 600);


                                        




                                    }}
                                >
                                    <Label
                                        text={item.text} textColor={item.text === En.cancel ? COLOR.BLACK : COLOR.WHITE}
                                        style={{ fontSize: hp(1.8) }}
                                    />
                                </Pressable>
                            )
                        })
                        }
                    </Section>
                </Section>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLOR.MODAL_BACKGROUND,
    },
    modalView: {
        marginHorizontal: '15%',
        borderRadius: hp(2),
        paddingVertical: hp(2),
        paddingHorizontal: hp(3),
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        height: hp(5), width: '60%',
        marginVertical: hp(1), paddingHorizontal: '5%',
        borderRadius: hp(1.2), marginHorizontal: '2.5%',
        ...commonStyles.center,
    },
});

export default React.memo(CustomAlert);