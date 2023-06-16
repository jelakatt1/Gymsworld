import { View } from 'react-native'
import React, { useState } from 'react'
import { COLOR, commonStyles, hp, JUSTIFY, KEYBOARDTYPE, TEXT_STYLE, wp } from '../../../enums/StyleGuide'
import { AppHeader, CreateWorkoutModal, CustomAlert, Img, Label, Pressable, Section, SelectField, TextField } from '../../../components'
import { En, genderData } from '../../../enums/AppEnums'
import { styles } from './Styles'
import { ImageIcon } from '../../../assets/svg'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { isIOS, openCamera, openGallery, showFlash } from '../../../utils/myUtils'
import { useSelector } from 'react-redux'
import { METHOD } from '../../../data/remote/routes'
import { ROUTES } from '../../../data/remote/routes'
import apiRequest from '../../../data/remote/webHandler'

const weightUnits = [
    { label: 'Kilogram', value: 'kilogram' },
    { label: 'Pound', value: 'pound' },
]

const AddWorkout = () => {
    const user = useSelector(({ appReducer }) => appReducer.user);
    const [name, setName] = useState('');
    const [sets, setSets] = useState('');
    const [maxTime, setMaxTime] = useState('');
    const [restTime, setRestTime] = useState('');
    const [disc, setDisc] = useState('');
    const [weight, setWeight] = useState('');
    const [weightUnit, setWeightUnit] = useState('');
    const [gender, setGender] = useState('');
    const [showWorkout, setShowWorkout] = useState(false)

    const [ageArray, setAgeArray] = useState([])

    const onSelectAgeDetails = (minAge, maxAge, miniReps, maxReps, miniPoints, maxPoints) => {
        const exists = ageArray?.find((x) => x.minAge == minAge && x.maxAge == maxAge)
        if (exists) {
            alert('This age range already exists')
        } else {
            let data = ageArray
            data.push({ minAge: minAge, maxAge: maxAge, miniReps: miniReps, maxReps: maxReps, miniPoints: miniPoints, maxPoints: maxPoints })
            setAgeArray(data);
            setShowWorkout(false);
        }
    }

    const [image, setImage] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData, setModalData] = useState({})
    const handleImagePicker = () => {
        setModalVisible(true)
        setModalData({
            message: 'Choose image from:',
            buttons: [
                {
                    text: 'Camera',
                    onPress: () => { openCamera(setImage) },
                },
                {
                    text: 'Gallery',
                    onPress: () => { openGallery(setImage) },
                },
                {
                    text: En.cancel,
                    onPress: () => { },
                },
            ]
        })
    }
    const handleSavePress = async () => {
        if (name && sets && ageArray.length != 0 && disc && image && maxTime && restTime && weight && weightUnit && gender) {
            const form = new FormData()
            form.append("org_id", user?.id)
            form.append("name", name)
            form.append("sets", sets)
            form.append("max_time", maxTime)
            form.append("rest_time", restTime)
            form.append("description", disc)
            form.append("weight", weight)
            form.append("weight_unit", weightUnit)
            form.append("gender", gender)

            ageArray?.forEach((item, index) => {
                form.append(`test_workout_age_ranges[${index}][min_age]`, item.minAge)
                form.append(`test_workout_age_ranges[${index}][max_age]`, item.maxAge)
                form.append(`test_workout_age_ranges[${index}][min_reps]`, item.miniReps)
                form.append(`test_workout_age_ranges[${index}][max_reps]`, item.maxReps)
                form.append(`test_workout_age_ranges[${index}][min_points]`, item.miniPoints)
                form.append(`test_workout_age_ranges[${index}][max_points]`, item.maxPoints)
            })

            if (image.path) {
                let uri = image?.path
                const uploadUri = isIOS() ? uri.replace('file://', '') : uri;
                form.append("image", { uri: uploadUri, type: 'multipart/form-data', name: "image" })
            }

            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.CREATE_TEST_WORKOUT,
                data: form
            }, { 'Content-Type': 'multipart/form-data' }
            ).catch((e) => {
                return false;
            });
            // console.log(result?.data)
            showFlash(result?.data?.message)
            if (result?.status === 200 && result?.data?.success) {
            }
        }
        else {
            showFlash('Please enter all of the required fields')
        }
    }
    return (
        <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>
            <AppHeader title={'Create Test'} LeftComp={En.BackArrow} RightComp={En.Setting} />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} overScrollMode={'never'}>
                <Section spaceX={'5%'} bg={COLOR.GREY} fillX={'5%'} fillY={hp(1)} spaceY={hp(1)} radius={hp(2)}>
                    <Section row center justify={JUSTIFY.between}>
                        <TextField
                            title={'Workout Name'} titleStyle={styles.titleStyle}
                            style={styles.inputStyle}
                            value={name} onChangeText={(x) => { setName(x) }}
                        />
                        <TextField
                            title={'Sets / Exercises'} titleStyle={styles.titleStyle}
                            style={styles.inputStyle} keyboardType={KEYBOARDTYPE.NUMERIC}
                            value={sets} onChangeText={(x) => { setSets(x) }}
                        />
                    </Section>

                    <Section row center justify={JUSTIFY.between}>
                        <TextField
                            title={'Rest Time (in minutes)'} titleStyle={styles.titleStyle}
                            style={styles.inputStyle} keyboardType={KEYBOARDTYPE.NUMERIC}
                            value={restTime} onChangeText={(x) => { setRestTime(x) }}
                        />
                        <TextField
                            title={'Max Time (in minutes)'} titleStyle={styles.titleStyle}
                            style={styles.inputStyle} keyboardType={KEYBOARDTYPE.NUMERIC}
                            value={maxTime} onChangeText={(x) => { setMaxTime(x) }}
                        />
                    </Section>
                    <Section row center justify={JUSTIFY.between}>
                        <TextField
                            title={'Weight'} titleStyle={styles.titleStyle}
                            style={styles.inputStyle} keyboardType={KEYBOARDTYPE.NUMERIC}
                            value={weight} onChangeText={(x) => { setWeight(x) }}
                        />
                        <SelectField
                            title={'Weight Unit'} titleStyle={styles.titleStyle}
                            style={styles.inputStyle} data={weightUnits}
                            value={weightUnit} onSelect={(x) => { setWeightUnit(x) }}
                        />
                    </Section>
                    <Section row center justify={JUSTIFY.between}>
                        <SelectField
                            title={'Gender'} titleStyle={styles.titleStyle}
                            style={styles.inputStyle} data={genderData}
                            value={gender} onSelect={(x) => { setGender(x) }}
                        />
                    </Section>
                    <TextField
                        title={'Workout Description'} titleStyle={styles.titleStyle}
                        style={styles.multiInputContainer} inputStyle={styles.multiInput}
                        value={disc} onChangeText={(x) => { setDisc(x) }}
                    />

                    <Pressable onClick={() => { handleImagePicker() }} bg={COLOR.WHITE} style={styles.imageContainer}>
                        {image ?
                            <Img imageUrl={image.path} height={hp(12)} width={wp(80)} />
                            :
                            <>
                                <ImageIcon height={hp(6)} width={hp(6)} />
                                <Label text={'Browse from photo gallery'} textColor={COLOR.BLUE} spaceT={hp(0.5)} />
                            </>
                        }
                    </Pressable>
                    <Pressable onClick={() => { setShowWorkout(true) }} style={styles.buttonStyle}>
                        <Label text={'Select Age Range'} textColor={COLOR.BLACK} style={TEXT_STYLE.small_text} />
                    </Pressable>
                    {ageArray.map((item, index) => {
                        const { minAge, maxAge, miniReps, maxReps, miniPoints, maxPoints } = item
                        return (
                            <Section style={styles.itemContainer} key={index}>
                                <Section row center justify={JUSTIFY.between}>
                                    <Label text={`Min Age : ${minAge}`} />
                                    <Label text={`Max Age : ${maxAge}`} />
                                </Section>
                                <Section row center justify={JUSTIFY.between}>
                                    <Label text={`Min Reps : ${miniReps}`} />
                                    <Label text={`Max Reps : ${maxReps}`} />
                                </Section>
                                <Section row center justify={JUSTIFY.between}>
                                    <Label text={`Min Points : ${miniPoints}`} />
                                    <Label text={`Max Points : ${maxPoints}`} />
                                </Section>
                            </Section>
                        )
                    })}

                    <Section row center justify={JUSTIFY.end} spaceY={hp(1)}>
                        <Pressable
                            onClick={() => { handleSavePress() }}
                            style={styles.smallButtonStyle} spaceR={wp(2)}
                        >
                            <Label text={'Save'} textColor={COLOR.BLACK} style={TEXT_STYLE.small_text} />
                        </Pressable>
                        <Pressable style={[styles.smallButtonStyle, { backgroundColor: COLOR.RED }]}>
                            <Label text={'Cancel'} textColor={COLOR.WHITE} style={TEXT_STYLE.small_text} />
                        </Pressable>
                    </Section>

                </Section>
            </KeyboardAwareScrollView>
            <CustomAlert visible={modalVisible} onClose={setModalVisible} modalData={modalData} />
            <CreateWorkoutModal
                visible={showWorkout}
                setVisible={setShowWorkout}
                onPress={(minAge, maxAge, miniReps, maxReps, miniPoints, maxPoints) =>
                    onSelectAgeDetails(minAge, maxAge, miniReps, maxReps, miniPoints, maxPoints)
                }
            />
        </Section>
    )
}

export default AddWorkout