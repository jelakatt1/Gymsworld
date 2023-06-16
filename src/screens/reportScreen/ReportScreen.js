import { ActivityIndicator, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLOR, hp, KEYBOARDTYPE, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { Label, Button, Section, TextField, AppHeader, Img, SelectField } from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { En } from '../../enums/AppEnums'
import { showFlash } from '../../utils/myUtils'
import apiRequest from '../../data/remote/webHandler'
import { METHOD, ROUTES } from '../../data/remote/routes'
import { useSelector } from 'react-redux'
import { getItem } from '../../utils/asyncStorage'
import { KEYS } from '../../utils/Keys'

const ReportScreen = () => {
    const [problem, setProblem] = useState('')
    const [organization, setOrganization] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(({ appReducer }) => appReducer.user)
    const [orgData, setOrgdata] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const result = await apiRequest({
                method: METHOD.GET,
                url: ROUTES.USER_ORGANIZATIONS(user?.id),
            });

            if (result.status === 200) {
                let data = result?.data?.data
                let array = []
                data.forEach(element => {
                    array.push({ label: `${element.first_name} ${element.last_name}`, value: element.id },)
                });
                setOrgdata(array)
            }
        } catch (error) {
            console.log(error);
        }

        // const data = await getItem(KEYS.USER_ORGANIZATIONS);
        // if (data) {
        //     console.log(data);
        //     let array = []
        //     data.forEach(element => {
        //         array.push({ label: `${element.first_name} ${element.last_name}`, value: element.id },)
        //     });
        //     setOrgdata(array)
        // }
    }

    const sendReport = async () => {
        if (problem && organization) {
            setIsLoading(true);
            const reportForm = {
                user_id: user?.id,
                org_id: organization,
                problem: problem,
            }

            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.REPORT_PROBLEM,
                data: reportForm,
            },
            ).catch((e) => {
                setIsLoading(false);
                return false;
            });

            if (result?.status === 200 && result?.data?.success) {
                setIsLoading(false)
                showFlash(result?.data?.message)
                setProblem('')
            }

        } else {
            showFlash('Please fill all of the information to proceed')
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
                <AppHeader title={'Report a Problem'} LeftComp={En.BackArrow} />

                <Section spaceX={'5%'} spaceT={hp(2)}>

                    <Img
                        height={hp(25)} width={wp(90)} contain spaceY={hp(1)}
                        src={require('../../assets/images/reportScreen/report.png')}
                    />

                    {orgData.length > 0 ?
                        <>
                            <Label text={'What is your issue ?'} center style={TEXT_STYLE.semi_title_light} />
                            <Section spaceY={hp(1)}>
                                <TextField
                                    placeholder={'Write and issue here'}
                                    keyboardType={KEYBOARDTYPE.EMAILADDRESS}
                                    radius={150 / 2}
                                    value={problem} onChangeText={(x) => { setProblem(x) }}
                                />
                                <SelectField
                                    placeholder={'Select Organization'}
                                    color={COLOR.LIGHT_GREY_3}
                                    style={{ borderRadius: 150 / 2 }}
                                    data={orgData}
                                    value={organization} onSelect={(x) => { setOrganization(x) }}
                                />
                            </Section>

                            <Button text={isLoading ? <ActivityIndicator color={COLOR.BLACK} /> : 'Submit'}
                                textColor={COLOR.BLACK} onClick={() => { sendReport() }}
                            />
                        </>
                        :
                        <Label text={'You do not have any organization joined'} center spaceY={hp(5)} style={TEXT_STYLE.text_bold} />
                    }
                </Section>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default ReportScreen
