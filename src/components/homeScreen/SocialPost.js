import { StyleSheet, ScrollView, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Img, Label, Pressable, Section } from '../widgets'
import { ActiveOpacity, COLOR, commonStyles, hp, JUSTIFY, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { Calender, CommentWhite, HeartRed, LikeWhite, ShareWhite } from '../../assets/svg'
import { onShare } from '../../utils/myUtils'
import { METHOD, ROUTES } from '../../data/remote/routes'
import apiRequest from '../../data/remote/webHandler'
import { SCREEN } from '../../enums/AppEnums'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setGymPosts } from '../../redux/actions/Actions'
import Video from 'react-native-video';


const size = hp(2)

const SocialPost = ({ profileImage, images, time, accountName, likes,
    video, userId, postId, description, feeds, index, comments, user_liked }) => {

    const [liked, setliked] = useState(user_liked)

    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [opacity, setOpacity] = useState(0)





    const likePost = async (key) => {

        try {
            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.LIKE_POST,
                data: { user_id: userId, post_id: postId }

            });

            if (result.status === 200) {
                const updatedPosts = [...feeds];
                updatedPosts[key].likes = (parseInt(updatedPosts[key].likes) + 1).toString();
                updatedPosts[key].likedByUser = true;
                setliked(updatedPosts[key].likedByUser)
                dispatch(setGymPosts(updatedPosts))


            }
        } catch (error) {
            console.log(error);
        }

    }

    const unlikePost = async (key) => {

        try {
            const result = await apiRequest({
                method: METHOD.POST,
                url: ROUTES.UNLIKE_POST,
                data: { user_id: userId, post_id: postId }

            });

            if (result.status === 200) {
                const updatedPosts = [...feeds];
                updatedPosts[key].likes = (parseInt(updatedPosts[key].likes) - 1).toString();
                updatedPosts[key].likedByUser = false;

                setliked(updatedPosts[key].likedByUser)
                dispatch(setGymPosts(updatedPosts))


            }
        } catch (error) {
            console.log(error);
        }

    }

    const onPressLike = async (index) => {
        if (liked) {
            unlikePost(index)
        }
        else {
            likePost(index)
        }
    }


    const onLoadStart = () => {
        setOpacity(1);
    }
    const onLoad = () => {
        setOpacity(0);
    }

    const onBuffer = ({ isBuffering }) => {
        isBuffering ? setOpacity(1) : setOpacity(0);
    }


    return (
        <View key={index}>

            <Section fillX={'5%'} fillY={hp(1.5)} bg={COLOR.GREY_2} radius={hp(1)} spaceY={hp(1)}>
                {/* Header */}
                <Section row>
                    <Img

                        imageUrl={profileImage}
                        contain
                        height={hp(5)} width={hp(5)} radius={150 / 2}
                    />
                    <Section spaceL={wp(3)} width={'85%'}>
                        <Section row center width={'100%'} style={commonStyles.flexWrap}>
                            <Label text={accountName} style={TEXT_STYLE.text_bold} spaceR={wp(2)} />

                        </Section>
                        <Section row center spaceY={hp(0.5)}>
                            <Label text={time} style={styles.greyText} spaceR={wp(2)} />
                            <Calender height={hp(1.5)} width={hp(1.5)} />
                        </Section>
                    </Section>
                </Section>
                <Section spaceY={hp(1)}>
                    <Label
                        text={description}
                        style={TEXT_STYLE.text} textColor={COLOR.BLUE}
                    />
                </Section>

                <Section row center spaceY={hp(1)}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode='never'>
                        {images?.map((item, index) => {
                            return (
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode='never'>

                                    <Img
                                        imageUrl={item}
                                        key={index}
                                        style={{ borderRadius: 5, marginEnd: 10 }}
                                        height={hp(22)} width={wp('70%')}
                                    />
                                </ScrollView>

                            )
                        })}

                    </ScrollView>

                </Section>
                {/* //Video */}


                <TouchableOpacity activeOpacity={1}
                    onPress={() => { }}>
                    {
                        video &&
                        <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0, left: 0, top: 0, bottom: 0 }}>
                            <ActivityIndicator
                                animating
                                size="large"
                                color={COLOR.RED}

                            />
                        </View>
                    }

                    {video && video != '' &&
                        <Video
                            resizeMode='cover'
                            source={{ uri: video }}
                            style={{ height: hp(22), width: wp('81.3%'), borderRadius: 5, marginTop: 1.5, marginBottom: 10 }}
                            
                            onLoad={onLoad}
                            onLoadStart={onLoadStart}
                            onBuffer={onBuffer}
                            controls={true}
                            ignoreSilentSwitch='obey'
                            playInBackground
                            paused={true}
                       

                        />
                    }
                </TouchableOpacity>
                {/* Footer View */}
                <Section>
                    <Section row center justify={JUSTIFY.between} brBW={1} brBC={COLOR.GREY} fillB={hp(1)}>
                        <Section row center>
                            <HeartRed height={size} width={size} />
                            <Label text={likes} style={styles.greyText_2} spaceX={wp(1)} />
                        </Section>
                    </Section>
                    <Section row center>
                        <Section height={hp(4)} style={styles.button}>
                            <TouchableOpacity activeOpacity={ActiveOpacity}
                                onPress={() => onPressLike(index)}
                            >
                                <LikeWhite height={size} width={size} style={commonStyles.mh_2} />
                            </TouchableOpacity>

                            <Label text={'Like'} style={styles.greyText_2} />
                        </Section>
                        <Section height={hp(4)} style={styles.button} justify={JUSTIFY.center}>


                            <TouchableOpacity activeOpacity={ActiveOpacity}
                                onPress={() => navigation.navigate(SCREEN.POST_COMMENTS, { comments, index, postId })}
                            >
                                <CommentWhite height={size} width={size} style={commonStyles.mh_2} />

                            </TouchableOpacity>
                            <Label text={'Comment'} style={styles.greyText_2} />

                        </Section>
                        <Pressable onClick={() => { onShare() }} style={styles.button} justify={JUSTIFY.end}>
                            <ShareWhite height={size} width={size} style={commonStyles.mh_2} />
                            <Label text={'Share'} style={styles.greyText_2} />
                        </Pressable>
                    </Section>
                </Section>
            </Section>
        </View>

    )
}

export default React.memo(SocialPost)

const styles = StyleSheet.create({
    greyText: {
        ...TEXT_STYLE.text,
        color: COLOR.LIGHT_GREY,
    },
    greyText_2: {
        ...TEXT_STYLE.text,
        color: COLOR.LIGHT_GREY,
        fontSize: 12,
    },
    button: {
        height: hp(4), width: '33%',
        flexDirection: 'row', alignItems: 'center',
    },
})