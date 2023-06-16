import React, { useEffect, useState, useRef, useCallback } from 'react'
import { ActivityIndicator, FlatList, View, LayoutAnimation } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { useSelector } from 'react-redux'
import { AppHeader, Label, Section, ScrollToTopButton } from '../../components'
import GetScoreBox from '../../components/scoreBoardScreen/GetScoreBox'
import { METHOD, ROUTES } from '../../data/remote/routes'
import apiRequest from '../../data/remote/webHandler'
import { En } from '../../enums/AppEnums'
import { COLOR, TEXT_STYLE, hp } from '../../enums/StyleGuide'
import { isIOS } from '../../utils/myUtils'


const ScoreBoardScreen = () => {

    const flatListRef = useRef(null)
    const user = useSelector(({ appReducer }) => appReducer.user);
    const [loading, setloading] = useState(true)
    const [markedDates, setMarkedDates] = useState({});
    const [userRecord, setuserRecord] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showSrollTopButton, setSrollTopShowButton] = useState(false);



    useEffect(() => {
        getPersonalScore()
    }, [])

    const handleScroll = useCallback((event) => {
        const { nativeEvent: { contentOffset } } = event;
        const isScrollTopButtonVisible = contentOffset.y > 450;
        setSrollTopShowButton(isScrollTopButtonVisible);
    }, []);

    const handleScrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    const getPersonalScore = async () => {
        try {
            const result = await apiRequest({
                method: METHOD.GET,
                url: ROUTES.GET_ADDED_USER_WORKOUT(user.id),
            });

            if (result.status === 200) {
                setuserRecord(result.data.data);

                const formattedData = {};
                result?.data?.data?.forEach((item) => {
                    formattedData[item?.personal_workout_data?.date] = { selected: true, selectedColor: COLOR.D_GREEN };
                });

                setMarkedDates(formattedData);
                setloading(false);

            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDayPress = (day) => {
        const filteredData = userRecord.filter((item) => item.personal_workout_data.date == day.dateString);
        const indices = filteredData.map((item) => userRecord.indexOf(item));

        indices.forEach((index, i) => {
            setTimeout(() => {
                flatListRef.current.scrollToIndex({ index });
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setSelectedIndex(index);
            }, i * 700);
        });

        setTimeout(() => setSelectedIndex(null), indices.length * 700);
    }

    const renderItem = ({ item, index }) => {
        const isSelected = selectedIndex === index;
        return (
            <GetScoreBox
                item={item}
                collapse
                isSelected={isSelected}
            />
        );
    };

    const listHeader = () => {
        return (
            <View>
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
                        [selectedDate]: { marked: true, selectedColor: COLOR.WHITE },
                        ...markedDates,
                    }}
                />
                {loading && <ActivityIndicator size="large" animating color={COLOR.RED} />}
                {userRecord?.length == 0 && loading == false && (
                    <Label
                        text={"No record found"}
                        style={[TEXT_STYLE.small_title, { textAlign: 'center', marginTop: hp(10) }]}
                        spaceR={wp(3)}
                        textColor={COLOR.LIGHT_GREY}
                    />
                )}
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <AppHeader title={'Score Calendar'} LeftComp={En.BackArrow} />
            <Section fillX={'5%'}>
                <FlatList
                    ref={flatListRef}
                    onScroll={handleScroll}
                    ListHeaderComponent={listHeader}
                    showsVerticalScrollIndicator={false}
                    data={userRecord}
                    style={{ height: isIOS() ? '85.8%' : '87%' }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
                {
                    showSrollTopButton &&
                    <ScrollToTopButton onPress={handleScrollToTop} />
                }
            </Section>

        </View>
    )
}

export default ScoreBoardScreen
