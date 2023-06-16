import { ScrollView } from 'react-native'
import React from 'react'
import { COLOR, commonStyles, hp } from '../../enums/StyleGuide'
import { Button, Section, AppHeader, TextField, ProfileBox } from '../../components'
import { En, MemberList, SCREEN } from '../../enums/AppEnums'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SearchWhite } from '../../assets/svg'

const MemberListScreen = () => {
    return (
        <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>
            <KeyboardAwareScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
                <AppHeader title={'Member List'} LeftComp={En.BackArrow} RightComp={En.Setting} />

                <Section spaceX={'5%'} spaceY={hp(1)}>
                    <TextField
                        radius={150 / 2} endSvg={<SearchWhite />}
                        placeholder={'Search here'}
                    />
                </Section>

                <Section
                    height={hp(60)} radius={hp(1)} bg={COLOR.GREY_2} fillX={'5%'} fillY={hp(1)}
                    spaceX={'5%'} spaceY={hp(1)} brW={0.5} brC={COLOR.YELLOW}
                >
                    <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never'>
                    {MemberList.map((item, index) => {
                        const { name, location, src, time } = item
                        return (
                            <ProfileBox
                                name={name} time={time} key={index} addFriend
                                location={location} image={src}
                            />
                        )
                    })}
                    </ScrollView>
                </Section>

                <Section spaceX={'5%'}>
                    <Button
                        text={'Send'} textBold textColor={COLOR.BLACK}
                    />
                    <Button
                        text={'Cancel'} textBold borderColor={COLOR.YELLOW}
                        bg={COLOR.BLACK} textColor={COLOR.YELLOW}
                        onClick={() => { navigation.goBack() }}
                    />
                </Section>
            </KeyboardAwareScrollView>
        </Section>
    )
}

export default MemberListScreen
