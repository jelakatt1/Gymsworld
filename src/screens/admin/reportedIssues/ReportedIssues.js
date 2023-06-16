import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR, hp, wp } from '../../../enums/StyleGuide'
import { Button, Section, AppHeader, Img, ReportedItem, CustomAlert } from '../../../components'
import { En } from '../../../enums/AppEnums'
import apiRequest from '../../../data/remote/webHandler'
import { METHOD, ROUTES } from '../../../data/remote/routes'
import { useSelector } from 'react-redux'
import { showFlash } from '../../../utils/myUtils'

const ReportedIssues = () => {
    const user = useSelector(({ appReducer }) => appReducer.user)
    const [problems, setProblems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    useEffect(() => {
        getReportedIssues()
    }, [])

    const handleDeleteProblem = (_id) => {
        setModalVisible(true)
        setModalData({
            message: 'Are your sure you want to delect this issue',
            buttons: [
                {
                    text: 'Delete',
                    onPress: () => { deleteProblem(_id) },
                },
                {
                    text: En.cancel,
                    onPress: () => { },
                },
            ]
        })
    }

    const deleteProblem = async (_id) => {
        try {
            const result = await apiRequest({
                method: METHOD.GET,
                url: ROUTES.DELETE_PROBLEM(_id),
            });
            if (result.status === 200) {
                showFlash(result?.data?.message)
                getReportedIssues();
            }
        } catch (error) {
            console.log('ERROR=>', error);
        }
    }

    const getReportedIssues = async () => {
        try {
            const result = await apiRequest({
                method: METHOD.GET,
                url: ROUTES.REPORTED_PROBLEM(user?.id),
                // this is organization id
            });
            if (result.status === 200) {
                setProblems(result?.data?.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <ScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
                <AppHeader title={'Reported Issues'} LeftComp={En.BackArrow} />

                <Section spaceX={'5%'} spaceT={hp(2)}>

                    <Img
                        height={hp(15)} width={wp(90)} contain spaceY={hp(1)}
                        src={require('../../../assets/images/reportScreen/report.png')}
                    />
                    {problems?.map((item, index) => {
                        return (
                            <ReportedItem
                                key={index} item={item}
                                index={index + 1}
                                delectCallBack={(id) => { handleDeleteProblem(id) }}
                            />
                        )
                    })}

                    <Button text={'Submit'} textColor={COLOR.BLACK} />
                </Section>
            </ScrollView>
            <CustomAlert visible={modalVisible} onClose={setModalVisible} modalData={modalData} />
        </View>
    )
}

export default ReportedIssues
