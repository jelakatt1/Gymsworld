import { View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLOR, hp, JUSTIFY, KEYBOARDTYPE, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { Section, AppHeader, Label, Img, TextField, Button, SelectField } from '../../components'
import { En, MemberList } from '../../enums/AppEnums'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './Styles'
import { useSelector } from 'react-redux'
import apiRequest from '../../data/remote/webHandler'
import { METHOD, ROUTES } from '../../data/remote/routes'
import { showFlash } from '../../utils/myUtils'

const weightUnits = [
    { label: 'Kilogram', value: 'kilogram' },
    { label: 'Pound', value: 'pound' },
]

const SurveyScreen = ({ route, navigation }) => {
    const user = useSelector(({ appReducer }) => appReducer.user);
    let test_id = route?.params?.test_id;
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [weightUnit, setWeightUnit] = useState('')
    const [sets, setSets] = useState('')

    const handleSubmitTest = async () => {
        if (reps && weight && weightUnit && sets) {
            const form = new FormData()
            form.append("user_id", user?.id)
            form.append("test_id", test_id)
            form.append("reps", reps)
            form.append("weight", weight)
            form.append("weight_unit", weightUnit)
            form.append("sets", sets)

            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.SUBMIT_TEST,
                data: form
            }, { 'Content-Type': 'multipart/form-data' }
            ).catch((e) => {
                return false;
            });

            if (result?.status === 200 && result?.data?.success) {
                showFlash(result?.data?.message)
                navigation.goBack();
            }
        } else {
            showFlash('Plese fill all of the information')
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
                <AppHeader title={'Test'} LeftComp={En.BackArrow} RightComp={En.Setting} />

                <Section
                    height={hp(82)} radius={hp(2)} bg={COLOR.LIGHT_GREY_2}
                    spaceX={'5%'} spaceY={hp(2)}
                >
                    <Section height={hp(7)} center justify={JUSTIFY.center} bg={COLOR.GREY} style={styles.headerView} brBW={2} brBC={COLOR.BLACK}>
                        <Label text={'Submit Test'} size={16} />
                    </Section>

                    <Section fillX={'5%'}>
                 
                        <TextField
                            title={'Sets'} titleStyle={styles.textStyle}
                            placeholder={'How many sets you did?'}
                            style={styles.input} keyboardType={KEYBOARDTYPE.NUMERIC}
                            value={sets} onChangeText={(x) => { setSets(x) }}
                            color={COLOR.BLACK}

                        />
                        <TextField
                            title={'Reps'} titleStyle={styles.textStyle}
                            placeholder={'How many reps you did?'}
                            style={styles.input} keyboardType={KEYBOARDTYPE.NUMERIC}
                            value={reps} onChangeText={(x) => { setReps(x) }}
                            color={COLOR.BLACK}

                        />
                        <TextField
                            title={'Weight'} titleStyle={styles.textStyle}
                            placeholder={'Enter your weight'}
                            style={styles.input} keyboardType={KEYBOARDTYPE.NUMERIC}
                            value={weight} onChangeText={(x) => { setWeight(x) }}
                            color={COLOR.BLACK}

                        />
                        <SelectField
                            title={'Weight Unit'} titleStyle={styles.textStyle}
                            style={styles.input} data={weightUnits}
                            placeholder={'Select weight unit'}
                            color={COLOR.BLACK}
                            value={weightUnit} onSelect={(x) => { setWeightUnit(x) }}
                        />

                        <Button text={'Submit'} bg={COLOR.RED} onClick={() => { handleSubmitTest() }} />
                    </Section>


                </Section>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default SurveyScreen
