import React from 'react'
import { COLOR, hp, JUSTIFY, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { En, SCREEN } from '../../enums/AppEnums'
import { BackArrowLight, SettingIconLight } from '../../assets/svg'
import { useNavigation } from '@react-navigation/native';
import { Label, Pressable, Section } from '../widgets'
import { isIOS } from '../../utils/myUtils'

const AppHeader = (props) => {
    const navigation = useNavigation()
    const {
        title,
        LeftComp,
        RightComp,
        onLeftPress,
        onRightPress,
        centerComp,
        bg,
        style
    } = props

    const centerCompStyle = centerComp
        ? { alignItems: 'center', justifyContent: 'center' }
        : { flex: 1 }

    return (
        <Section
            height={hp(8)}
            row
            fillX={'5%'}
            center
            spaceY={hp(1)}
            bg={bg && bg}
            style={style}
            justify={JUSTIFY.between}
            spaceT={isIOS() ? hp(2.8) : hp(2)}
        >
            {LeftComp ? (
                LeftComp === En.BackArrow ? (
                    <Pressable onClick={() => navigation.goBack()}>
                        <BackArrowLight height={hp(2)} width={hp(2)} />
                    </Pressable>
                ) : (
                    <Pressable onClick={() => onLeftPress && onLeftPress()}>{LeftComp}</Pressable>
                )
            ) : (
                <Section width={wp(5)} />
            )}
            <Section style={centerCompStyle}>{centerComp ? centerComp : <Label text={title} style={[TEXT_STYLE.semi_title,{marginStart: 15}]} textColor={COLOR.YELLOW} />}</Section>
            {RightComp ? (
                RightComp === En.Setting ? (
                    <Pressable onClick={() => navigation.navigate(SCREEN.MENU)}>
                        <SettingIconLight height={hp(2.5)} width={hp(2.5)} />
                    </Pressable>
                ) : (
                    <Pressable onClick={() => onRightPress && onRightPress()}>{RightComp}</Pressable>
                )
            ) : (
                <Section width={wp(5)} />
            )}
        </Section>
    )
}

export default React.memo(AppHeader)
