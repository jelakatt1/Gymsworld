import { StyleSheet, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppHeader, Button, Img, Label, LogoHeader, Pressable, Section } from '../../../components'
import { En, SCREEN } from '../../../enums/AppEnums'
import { COLOR, hp, JUSTIFY, TEXT_STYLE, wp } from '../../../enums/StyleGuide'
import { Clock } from '../../../assets/svg'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import apiRequest from '../../../data/remote/webHandler'
import { METHOD, ROUTES } from '../../../data/remote/routes'

const size = hp(2)
// const workoutList = [
//     { title: 'Pushups', maxTime: '5 min', restTime: '1min', image: require('../../../assets/images/admin/exercise_1.png'), },
//     { title: 'Pullups', maxTime: '5 min', restTime: '1min', image: require('../../../assets/images/admin/exercise_2.png'), },
//     { title: 'Planks', maxTime: '5 min', restTime: '1min', image: require('../../../assets/images/admin/exercise_3.png'), },
//     { title: 'Running', maxTime: '5 min', restTime: '1min', image: require('../../../assets/images/admin/exercise_4.png'), },
//     { title: 'MTC', maxTime: '5 min', restTime: '1min', image: require('../../../assets/images/admin/exercise_5.png'), },
// ]

const WorkoutScreen = () => {

    const navigation = useNavigation()

    const user = useSelector(({ appReducer }) => appReducer.user);
    const [workoutData, setWorkoutData] = useState([])
 

    useEffect(() => {
        const unsubsribe = navigation.addListener("focus", () => {
        getAllTests();
          
        });
        return unsubsribe;
    }, [navigation]);

    const getAllTests = async () => {
        if (user?.id) {
            try {
                const result = await apiRequest({
                    method: METHOD.GET,
                    url: ROUTES.TEST_WORKOUT(user.id),
                });
                if (result.status === 200) {
                    setWorkoutData(result?.data?.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    const handleNavigation = (item) => {
        navigation.navigate(SCREEN.TEST_SCREEN,
            { data: item }
        )
    }


    const WorkoutItem = ({ item }) => {
        const { name, image, max_time, rest_time } = item
        return (
            <Pressable height={hp(30)} spaceY={hp(0.5)} onClick={() => { handleNavigation(item) }}>
                <Section height={'82%'} bg={COLOR.BLACK} >
                    <Img
                        imageUrl={image}
                        height={'100%'} width={'100%'}
                        style={{ opacity: 0.7, borderRadius: hp(1.5) }}
                    />
                    <Section style={{ position: 'absolute', height: '100%', width: '100%' }} center justify={JUSTIFY.center}>
                        <Label text={name} style={TEXT_STYLE.semi_title} />
                    </Section>
                </Section>
                <Section spaceT={'4%'} center row justify={JUSTIFY.between}>
                    <Section row center>
                        <Clock height={size} width={size} />
                        <Label text={`Max Time : ${max_time} min`} spaceL={wp(3)} style={TEXT_STYLE.small_text} />
                    </Section>
                    <Section row center>
                        <Clock height={size} width={size} />
                        <Label text={`Rest Time : ${rest_time} min`} spaceL={wp(3)} style={TEXT_STYLE.small_text} />
                    </Section>
                </Section>
            </Pressable>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <AppHeader title={'Workout Test'} LeftComp={En.BackArrow} RightComp={En.Setting} />
            <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never'>
                <LogoHeader
                    title={'Physical Fitness Tests'} spaceT={0}
                    textColor={COLOR.WHITE} titleStyle={TEXT_STYLE.semi_title_light}
                />
                <Section fillX={'5%'}>
                    <Button onClick={() => navigation.navigate(SCREEN.ADD_WORKOUT)} text={'Add New Workout'} textColor={COLOR.BLACK} />
                    {workoutData.length <= 0 ?
                        <Label text={'No data found'} center spaceY={hp(1)} />
                        :
                        workoutData?.map((item, index) => {
                            return (
                                <WorkoutItem key={index} item={item} />
                            )
                        })}

                </Section>
            </ScrollView>
        </View>
    )
}

export default WorkoutScreen

const styles = StyleSheet.create({})