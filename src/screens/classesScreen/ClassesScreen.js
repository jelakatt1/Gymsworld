import { View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { styles } from './Styles'
import { AppHeader, Button, ClassModal, Label, Pressable, SelectOrgModal } from '../../components'
import { COLOR, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'
import { En } from '../../enums/AppEnums'
import { Calendar } from 'react-native-calendars'
import WeekView from 'react-native-week-view'
import { ScrollView } from 'react-native-gesture-handler'
import apiRequest from '../../data/remote/webHandler'
import { METHOD, ROUTES } from '../../data/remote/routes'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { formatDate } from '../../utils/myUtils'
import { ACCOUNT_TYPE } from '../../utils/Keys'
import { useNavigation } from '@react-navigation/native'



const ClassesScreen = () => {
    const user = useSelector(({ appReducer }) => appReducer.user);
    const [showModal, setShowModal] = useState(user?.role == ACCOUNT_TYPE.USER ? true : false);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [markedDates, setMarkedDates] = useState();
    const [classData, setClassData] = useState([])
    const [orgName, setorgName] = useState()
    const navigation = useNavigation()

    useEffect(() => {
        const unsubsribe = navigation.addListener("focus", () => {
            if (user?.role == ACCOUNT_TYPE.ORGANIZATION) {
                getClasses(user?.id)
            }
        });
        return unsubsribe;
    }, [navigation]);



    const handleDayPress = (day) => {
        const filteredData = classData?.filter(item => item.date == day.dateString)
        if (filteredData) {
            setSelected(filteredData);
        }
    }


    const handleOrgSelect = useCallback((orgId, name) => {
        getClasses(orgId);
        setorgName(name)

        setShowModal(false);
    }, []);


    const getClasses = async (id) => {
        if (id) {
            setIsLoading(true);
            try {

                const result = await apiRequest({
                    method: METHOD.GET,
                    url: ROUTES.CLASS(id),
                });

                if (result.status === 200) {
                    setClassData(result?.data?.data?.data)
                    setSelected(result?.data?.data?.data)
                    let formattedData = {};
                    result?.data?.data?.data.forEach((item) => {
                        formattedData[item?.date] = { selected: true, selectedColor: COLOR.D_GREEN };
                    });
                    setMarkedDates(formattedData)
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(fasle);
            }
        }
    }

    const ClassItem = ({ item }) => {
        const { class_recurring, date, start_time, end_time, id, latitude, longitude, location, name, number_of_members } = item
        return (
            <View style={styles.itemContainer}>

                <View style={{ flexDirection: 'row', marginTop: 5, width: '90%' }}>
                    <Label size={13} text={'Class Name: '} />
                    <Label textColor={COLOR.YELLOW} size={13} text={name} />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 5, width: '90%' }}>
                    <Label size={13} text={'Date: '} />
                    <Label textColor={COLOR.YELLOW} size={13} text={date} />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 5, width: '90%' }}>
                    <Label size={13} text={'Start Time: '} />
                    <Label textColor={COLOR.YELLOW} size={13} text={start_time} />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 5, width: '90%' }}>
                    <Label size={13} text={'End Time: '} />
                    <Label textColor={COLOR.YELLOW} size={13} text={end_time} />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 5, width: '90%' }}>
                    <Label size={13} text={'Location: '} />
                    <Label style={{ flexWrap: 'wrap', width: '27%' }} textColor={COLOR.YELLOW} size={13} text={location} />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 5, width: '90%' }}>
                    <Label size={13} text={'Class Recurring: '} />
                    <Label textColor={COLOR.YELLOW} size={13} text={class_recurring} />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5, width: '90%' }}>
                    <Label size={13} text={'Members Allowed: '} />
                    <Label textColor={COLOR.YELLOW} size={13} text={number_of_members} />
                </View>

            </View>
        )
    }

    return (
        <View style={styles.mainScreen}>
            <AppHeader title={'Classes'} LeftComp={En.BackArrow} RightComp={En.Setting} />
            <ScrollView>
                <View style={{ paddingHorizontal: '5%' }}>
                    <Calendar
                        style={{ borderRadius: 20, paddingBottom: hp(1), marginBottom: hp(2) }}
                        theme={{
                            calendarBackground: COLOR.GREY_2,
                            todayTextColor: COLOR.WHITE,
                            todayButtonFontWeight: "bold",
                            todayDotColor: COLOR.WHITE,
                            dayTextColor: COLOR.WHITE,
                            textDisabledColor: COLOR.LIGHT_GREY,
                            arrowColor: COLOR.YELLOW,
                            monthTextColor: COLOR.YELLOW,
                            textMonthFontWeight: "bold",
                            selectedDotColor: COLOR.WHITE
                        }}
                        onDayPress={handleDayPress}

                        markedDates={{
                            ...markedDates,
                        }}
                    />

                    <View style={{ marginVertical: hp(1) }}>
                        {isLoading ?
                            <ActivityIndicator size={24} color={COLOR.YELLOW} />
                            :
                            <>
                                {selected.length > 0 ?
                                    selected?.map((item, index) => {
                                        return (
                                            <ClassItem key={index} item={item} />
                                        )
                                    })
                                    :
                                    <Label text={'No class data found'} style={{ textAlign: 'center' }} />
                                }
                            </>
                        }

                    </View>
                    {user?.role == ACCOUNT_TYPE.USER &&
                        <Button
                            text={'Select Organization'}
                            textColor={COLOR.BLACK}
                            onClick={() => { setShowModal(true) }}
                        />
                    }
                </View>

            </ScrollView>
            <SelectOrgModal
                visible={showModal} setVisible={setShowModal}
                handleOrgSelect={(id, name) => handleOrgSelect(id, name)}
            />
        </View>
    )
}

export default ClassesScreen
