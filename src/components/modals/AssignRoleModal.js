import { StyleSheet, Modal, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Label, Pressable, Section } from '../widgets'
import { COLOR, JUSTIFY, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'
import { SelectField } from '../fields'
import { showFlash } from '../../utils/myUtils'
import { METHOD, ROUTES } from '../../data/remote/routes'
import { useSelector } from 'react-redux'
import apiRequest from '../../data/remote/webHandler'

const DATA = [
    { label: 'Admin', value: 'admin' },
    { label: 'Fitness Trainer', value: 'fitness_trainer' },
];

const AssignRoleModal = ({ visible, setVisible, userId }) => {
    const user = useSelector(({ appReducer }) => appReducer.user);
    const [role, setRole] = useState('')
    const [showWarning, setShowWarning] = useState(false);

    const handleAssignRole = async () => {
        if (role) {
            const assignForm = {
                organization_user_id: user?.id, // this is the organization id
                user_id: userId, // this is the id of the user who is being asssigned a role
                user_role: role,
            }

            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.ASSIGN_ROLE,
                data: assignForm,
            },
            ).catch((e) => {
                return false;
            });

            if (result?.status === 200 && result?.data?.success) {
                setVisible(false);
                setShowWarning(false);
                setRole('');
                showFlash(result?.data?.message)
            }
        } else {
            setShowWarning(true);
            setTimeout(() => {
                setShowWarning(false);
            }, 2000);
        }
    }

    return (
        <Modal
            visible={visible}
            transparent
            onRequestClose={() => { setVisible(false) }}
            animationType='fade'
        >
            <View style={styles.mainScreen}>

                <Section spaceX={'5%'} bg={COLOR.GREY} fillX={'5%'} fillY={hp(1)} spaceY={hp(1)} radius={hp(2)}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Label
                            text={'Assign Role to this Member'} center
                            style={TEXT_STYLE.small_title}
                            spaceY={hp(1)} textColor={COLOR.YELLOW}
                        />
                        <SelectField
                            title={'Assign Role'} titleStyle={styles.titleStyle}
                            placeholder={'Select Role'}
                            color={COLOR.LIGHT_GREY_3}
                            style={styles.inputStyle}
                            data={DATA}
                            value={role} onSelect={(x) => { setRole(x) }}
                        />

                        {showWarning &&
                            <Label
                                text={'Please select role first'}
                                style={TEXT_STYLE.small_text}
                                spaceB={hp(0.5)} textColor={COLOR.RED}
                            />
                        }
                        <Section row center justify={JUSTIFY.end} spaceY={hp(1)}>
                            <Pressable
                                fillX={wp(2.5)} fillY={hp(0.3)}
                                radius={150 / 2} style={{ borderWidth: 1, borderColor: COLOR.LIGHT_GREY_3 }}
                                spaceR={wp(1.5)}
                                onClick={() => { setVisible(false) }}
                            >
                                <Label text={'Cancel'} textColor={COLOR.LIGHT_GREY_3} style={TEXT_STYLE.small_text} />
                            </Pressable>
                            <Pressable
                                fillX={wp(2.5)} fillY={hp(0.3)}
                                bg={COLOR.YELLOW} radius={150 / 2}
                                spaceR={wp(1.5)}
                                onClick={() => { handleAssignRole() }}
                            >
                                <Label text={'Assign'} textColor={COLOR.BLACK} style={TEXT_STYLE.small_text} />
                            </Pressable>
                        </Section>

                    </ScrollView>

                </Section>

            </View>



        </Modal>
    )
}

export default React.memo(AssignRoleModal)

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
    },
    titleStyle: {
        ...TEXT_STYLE.small_text, fontSize: 11
    },
    inputStyle: {
        height: hp(5.3), borderRadius: hp(2),
        borderWidth: 1, borderColor: COLOR.LIGHT_GREY,
    },
})