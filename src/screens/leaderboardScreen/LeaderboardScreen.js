import { View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLOR, hp, JUSTIFY, KEYBOARDTYPE, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { Section, AppHeader, Label, Button, TextField, LeaderItem, SelectField } from '../../components'
import { En, genderData } from '../../enums/AppEnums'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './Styles'
import { FilterGrey } from '../../assets/svg'
import { METHOD, ROUTES } from '../../data/remote/routes'
import { useSelector } from 'react-redux'
import apiRequest from '../../data/remote/webHandler'
import { showFlash } from '../../utils/myUtils'

const LeaderboardData = [
    { text: 'Total Score', number: '103' },
    { text: 'Total Exercises', number: '86' },
    { text: 'Total Hours', number: '45' },
]

const VideosData = [
    { title: 'Today my workout Today my workout', date: '12-Mar-2023', src: require('../../assets/images/homeScreen/image_1.png'), },
    { title: 'Today my workout', date: '12-Mar-2023', src: require('../../assets/images/homeScreen/image_1.png'), },
    { title: 'Today my workout', date: '12-Mar-2023', src: require('../../assets/images/homeScreen/image_1.png'), },
]


const LeaderboardScreen = () => {
    const user = useSelector(({ appReducer }) => appReducer.user)

    const [workout, setWorkout] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [leaderData, setLeaderData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetData = async () => {
        if (age && user?.id) {
            setIsLoading(true)
            setLeaderData([])
            const leaderForm = {
                user_id: 20,
                age: age,
                workout_name: workout,
                gender: gender,
                weight: weight,
                reps: reps,
            }
            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.LEADERBOARD,
                data: leaderForm,
            },
            ).catch((e) => {
                setIsLoading(false)
                return false;
            });

            showFlash(result?.data?.message)
            setIsLoading(false)
            if (result?.status === 200 && result?.data?.success) {
                setLeaderData(result?.data?.data)
            }

        } else {
            showFlash('Please fill all of the information to proceed')
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
                <AppHeader title={'Leaderboard'} LeftComp={En.BackArrow} RightComp={En.Setting} />

                <Section fillX={'5%'} spaceY={hp(1)}>
                    <Section row center>

                        {LeaderboardData.map((item, index) => {
                            const { text, number } = item
                            return (
                                <Section key={index} width={'33%'} brRC={COLOR.LIGHT_GREY_3} fillL={wp(3)}
                                    brRW={index === (LeaderboardData.length - 1) ? 0 : 1}
                                >
                                    <Label text={number} style={TEXT_STYLE.text_bold} spaceB={hp(1)} />
                                    <Label text={text} size={12} textColor={COLOR.LIGHT_GREY} />
                                </Section>
                            )
                        })}
                    </Section>

                    <Label text={'Live Leaderboard'} style={TEXT_STYLE.small_title} spaceT={hp(2)} />

                    <Section row center justify={JUSTIFY.between} spaceY={hp(1)}>
                        <Label text={'Search Test / Workout'} style={TEXT_STYLE.text_bold} />
                        <FilterGrey />
                    </Section>
                    <TextField
                        placeholder={'Search here'}
                        placeholderColor={COLOR.LIGHT_GREY}
                        color={COLOR.LIGHT_GREY} size={13} bg={COLOR.GREY_2}
                        titleStyle={styles.textStyle} radius={150 / 2} height={hp(5)}
                        value={workout} onChangeText={(x) => { setWorkout(x) }}
                    />
                    <Section bg={COLOR.GREY_2} fillX={'5%'} radius={hp(1)} spaceT={hp(0.5)}>
                        <Section row justify={JUSTIFY.between}>
                            <TextField
                                title={'Age'} placeholder={'Enter age'}
                                placeholderColor={COLOR.LIGHT_GREY} size={12}
                                style={styles.input} keyboardType={KEYBOARDTYPE.NUMERIC}
                                value={age} onChangeText={(x) => { setAge(x) }}

                            />
                            <SelectField
                                title={'Gender'} placeholder={'Select gender'}
                                color={COLOR.LIGHT_GREY} size={12} data={genderData}
                                style={styles.input}
                                value={gender} onSelect={(x) => { setGender(x) }}
                            />
                        </Section>
                        <Section row justify={JUSTIFY.between}>
                            <TextField
                                title={'Reps'} placeholder={'Enter reps'}
                                placeholderColor={COLOR.LIGHT_GREY} size={12}
                                style={styles.input} keyboardType={KEYBOARDTYPE.NUMERIC}
                                value={reps} onChangeText={(x) => { setReps(x) }}
                            />
                            <TextField
                                title={'Weight'} placeholder={'Enter Weight'}
                                placeholderColor={COLOR.LIGHT_GREY} size={12}
                                style={styles.input} keyboardType={KEYBOARDTYPE.NUMERIC}
                                value={weight} onChangeText={(x) => { setWeight(x) }}
                            />
                        </Section>
                    </Section>

                    <Section spaceT={hp(1)}>
                        <Button text={isLoading ? <ActivityIndicator color={COLOR.BLACK} /> : 'Search'} textColor={COLOR.BLACK} onClick={() => { handleGetData() }} />
                    </Section>
                    {leaderData.length > 0 ?
                        leaderData?.map((item, index) => {
                            return (
                                <LeaderItem item={item} key={index} />
                            )
                        })
                        :
                        <Label text={'No Data found'} center spaceY={hp(2)} />
                    }
                    {/* <LeaderItem name={'David Roy'} rank={'1st'} cals={'6588 Cals'} bg={COLOR.RED} videosData={VideosData} />
                    <LeaderItem name={'David Roy'} rank={'2nd'} cals={'6588 Cals'} bg={COLOR.YELLOW} videosData={VideosData} />
                    <LeaderItem name={'David Roy'} rank={'3rd'} cals={'6588 Cals'} bg={COLOR.GREY} />
                    <LeaderItem name={'David Roy'} rank={'5th'} cals={'6588 Cals'} /> */}

                </Section>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default LeaderboardScreen
