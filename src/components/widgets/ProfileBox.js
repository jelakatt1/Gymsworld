import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { AddFriendWhite, RemoveFriendRed, Tick } from '../../assets/svg'
import { ActiveOpacity, COLOR, hp, JUSTIFY, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { ACCOUNT_TYPE } from '../../utils/Keys'
import Img from './Img'
import Label from './Label'
import Section from './Section'


const size = hp(2.2)


const ProfileBox = ({ name, location, rank, disc, image, addFriend,
    addFriendCallback, friendId, removeFriendCallback, role,
    acceptRequestCallback }) => {
    return (
        <Section row center fillY={hp(1.1)} justify={JUSTIFY.between}>
            <Section row center>


                <Img
                    imageUrl={image}
                    // src={image}
                    contain
                    style={{ marginEnd: 10, backgroundColor: COLOR.GREY }}
                    height={hp(6)} width={hp(6)} radius={hp(6 / 2)}
                />


                <Section width={'75%'}>
                    <View style={{ flexDirection: 'row' }}>
                        <Label text={name} style={TEXT_STYLE.text_bold} />
                        {
                            role == ACCOUNT_TYPE.ORGANIZATION &&
                            <Img
                                src={require('../../assets/images/Logo.png')}
                                contain
                                height={hp(1)} width={wp(2.5)}
                                style={{ marginStart: 7, marginTop: 2.5 }}
                            />
                        }

                    </View>

                    {rank &&
                        <Label text={rank} style={TEXT_STYLE.small_text} spaceR={wp(3)} textColor={COLOR.LIGHT_GREY} />
                    }
                    {disc &&
                        <Label text={disc} style={TEXT_STYLE.small_text} spaceR={wp(3)} textColor={COLOR.LIGHT_GREY} />
                    }
                    {location &&
                        <Label text={location} style={TEXT_STYLE.small_text} spaceR={wp(3)} textColor={COLOR.LIGHT_GREY} />
                    }
                </Section>
            </Section>

            {
                <TouchableOpacity activeOpacity={ActiveOpacity}
                    onPress={() => acceptRequestCallback(friendId)}>

                    {acceptRequestCallback && <Tick height={hp(2.2)} width={hp(2.2)} />}
                </TouchableOpacity>

            }

            {addFriend &&
                <TouchableOpacity activeOpacity={ActiveOpacity}
                    onPress={() => addFriendCallback(friendId)}>
                    <AddFriendWhite height={size} width={size} />
                </TouchableOpacity>
            }

            {
                removeFriendCallback &&
                <TouchableOpacity activeOpacity={ActiveOpacity}
                    onPress={() => removeFriendCallback(friendId)}>
                    <RemoveFriendRed height={size} width={size} />
                </TouchableOpacity>
            }


        </Section>
    )
}

export default React.memo(ProfileBox)

