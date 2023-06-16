import React, { useState } from 'react'
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Close, PhotoIcon } from '../../../assets/svg'
import { AppHeader, Button, CustomAlert, Img, Label, Pressable, Section, TextField } from '../../../components'
import { METHOD, ROUTES } from '../../../data/remote/routes'
import apiRequest from '../../../data/remote/webHandler'
import { En, SCREEN } from '../../../enums/AppEnums'
import { ActiveOpacity, COLOR, commonStyles, hp, JUSTIFY, TEXT_STYLE, wp } from '../../../enums/StyleGuide'
import { isIOS, openCamera, openGallery, showFlash } from '../../../utils/myUtils'
import { styles } from './Styles'




const size = hp(2)

const CreatePost = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData, setModalData] = useState({})
    const handleImagePicker = () => {
        setModalVisible(true)
        setModalData({
            message: 'Choose from:',
            buttons: [
                // {
                //     text: 'Camera',
                //     onPress: () => {

                //         openCamera(setImage);
                //     },
                // },
                {
                    text: 'Select Images',
                    onPress: () => {
                        openGallery(setImage, null, null, En.multiImage);
                    },
                },
                {
                    text: 'Select Video',
                    onPress: () => {
                        openGallery(setVideo, null, null, En.video);
                    },
                },
                {
                    text: En.cancel,
                    onPress: () => { },
                },
            ]
        })
    }




    const user = useSelector(({ appReducer }) => appReducer.user);
    const [selectOrg, setselectOrg] = useState({})
    const [postDescription, setpostDescription] = useState('')
    const [image, setImage] = useState([])
    const [video, setVideo] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    const createPost = async () => {


        if (!selectOrg?.id) {
            showFlash('Please select organization.')
        }

        if (postDescription == '') {
            showFlash('Please enter post description.')
            return
        }
        setIsLoading(true)

        const form = new FormData()
        form.append("description", postDescription)
        form.append("user_id", user.id)
        form.append("org_id", selectOrg.id)

        if (image.length > 0) {
            image?.forEach((item, index) => {
                let uri = item?.path
                const uploadUri = isIOS() ? uri?.replace('file://', '') : uri;

                form.append(`file[${index}]`, { uri: uploadUri, type: item?.mime, name: item.mime?.replace('/', '.') });


            })
        }
        if (video.length > 0) {
            let uri = video?.path
            const uploadUri = isIOS() ? uri?.replace('file://', '') : uri;
            form.append(`video`, { uri: uploadUri, type: video?.mime, name: video.mime?.replace('/', '.') });
        }
        console.log('====>', JSON.stringify(form))

        const result = await apiRequest({
            method: METHOD.POST,
            url: ROUTES.CREATE_POST,
            data: form
        }, { 'Content-Type': 'multipart/form-data' }
        ).catch((e) => {
            console.log('ERROR', e);
            setIsLoading(false)
            return false;
        });
        setIsLoading(false)
        console.log(result.data)
        if (result?.status === 200 && result?.data?.success) {
            showFlash('Post Created Successfully')
            navigation.goBack()
        }
        else {
            showFlash('Some error occured.')
        }

    }


    return (
        <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>
            {/* Header */}
            <Section fillX={'5%'}>

                <AppHeader
                    style={styles.headerView}
                    title={'Create Post'} LeftComp={En.BackArrow}

                />
            </Section>
            <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never'>

                <Section fillX={'5%'}>


                    <Section height={image?.length != 0 ? hp(45) : hp(30)} bg={COLOR.GREY} fillX={'5%'} fillY={hp(1)} spaceY={hp(1)} radius={hp(2)}>
                        <Section row center>
                            <Img
                                imageUrl={user.profile_picture}
                                contain
                                height={hp(8)} width={hp(8)} radius={150 / 2} spaceR={wp(2)}

                            />
                            <Section>
                                <Label text={user.first_name + ' ' + user.last_name} style={TEXT_STYLE.text} textColor={COLOR.WHITE} />
                                <TouchableOpacity activeOpacity={ActiveOpacity}
                                    onPress={() => navigation.navigate(SCREEN.SELECT_ORGANIZATION, { setselectOrg })}
                                    style={[styles.selectView, { backgroundColor: COLOR.GREY_2, alignItems: 'center', justifyContent: 'center', width: wp(35) }]}>
                                    <Label text={selectOrg?.firstName === undefined ? 'Select Organization' : selectOrg?.firstName + ' ' + selectOrg?.lastName} style={TEXT_STYLE.small_text} />
                                </TouchableOpacity>

                            </Section>
                        </Section>

                        <View style={{ flexDirection: 'row' }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode='never'>
                                {image &&
                                    image?.map((item, index) => (
                                        <View key={index}>
                                            <Img
                                                imageUrl={item?.path} spaceY={hp(1)}
                                                height={hp(10)} width={hp(10)} radius={hp(1)}
                                                style={{ marginEnd: 5 }}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    const filtered = image?.filter((img) => img != item);
                                                    setImage(filtered);
                                                }}
                                                style={styles.img_top}
                                            >
                                                <Close height={hp(1)} width={hp(1)} />
                                            </TouchableOpacity>
                                        </View>

                                    ))
                                }
                            </ScrollView>

                        </View>


                        <TextField
                            placeholder={"What’s on your mind ?"} placeholderColor={COLOR.WHITE} size={16}
                            style={styles.input} inputStyle={{ height: '100%' }} multiline
                            onChangeText={(e) => setpostDescription(e)}
                        />
                    </Section>

                    <Section row center justify={JUSTIFY.between} spaceY={hp(1)}>
                        <Pressable onClick={() => { handleImagePicker() }} row center>
                            <PhotoIcon height={size} width={size} style={{ marginEnd: wp(2) }} />
                            <Label text={'Photo / Video'} style={TEXT_STYLE.text} />
                        </Pressable>
                    </Section>


                    {
                        video.length != 0 &&
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <Label text={'Video: '} style={TEXT_STYLE.text} textColor={COLOR.WHITE} />
                            <Label text={video?.filename} style={TEXT_STYLE.text} textColor={COLOR.RED} />
                        </View>

                    }


                    <Button onClick={createPost}
                        text={isLoading ? (<ActivityIndicator size={24} color={COLOR.BLACK} />) : 'Create Post'}
                        textColor={COLOR.BLACK} />

                </Section>
            </ScrollView>

            <CustomAlert visible={modalVisible} onClose={setModalVisible} modalData={modalData} />

        </Section>
    )
}

export default CreatePost