import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Label, Pressable, Section } from '../widgets'
import { COLOR, hp, JUSTIFY, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { DeleteBlack, DoneBlack, DownBlack } from '../../assets/svg'
import Collapsible from 'react-native-collapsible';

const size = hp(2)

const ReportedItem = ({ item, index, delectCallBack }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    let { date, problem, username, id } = item
    return (
        <Section spaceY={hp(1)}>
            <Section bg={COLOR.LIGHT_GREY} style={[styles.header, isCollapsed ? styles.radius : styles.topRadius]}>
                <Label text={`issue # ${index}`} textColor={COLOR.BLACK} style={TEXT_STYLE.text_bold} />
                <Section row center>
                    {/* <DoneBlack height={size} width={size} style={{ marginHorizontal: wp(1) }} /> */}
                    <Pressable onClick={() => { delectCallBack(id) }} >
                        <DeleteBlack height={size} width={size} style={{ marginHorizontal: wp(1) }} />
                    </Pressable>
                    <Pressable onClick={() => { setIsCollapsed(!isCollapsed) }} >
                        <DownBlack height={size} width={size} style={{ marginHorizontal: wp(1) }} />
                    </Pressable>
                </Section>
            </Section>
            <Collapsible collapsed={isCollapsed}>
                <Section bg={COLOR.GREY} fillY={hp(1)} fillX={'2.5%'} spaceT={hp(0.3)}
                    style={styles.bottomRadius}
                >
                    <Label text={problem} style={TEXT_STYLE.small_text} />
                    <Section row center justify={JUSTIFY.between} spaceT={hp(1)}>
                        <Section row center>
                            <Label text={'Reported By : '} style={TEXT_STYLE.small_text_bold} />
                            <Label text={username} style={TEXT_STYLE.small_text} />
                        </Section>
                        <Section row center>
                            <Label text={'Date : '} style={TEXT_STYLE.small_text_bold} />
                            <Label text={date} style={TEXT_STYLE.small_text} />
                        </Section>
                    </Section>
                </Section>
            </Collapsible>
        </Section>
    )
}

export default React.memo(ReportedItem)

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: '2.5%', height: hp(6),
        alignItems: 'center', justifyContent: 'space-between',
        flexDirection: 'row',
    },
    topRadius: {
        borderTopLeftRadius: hp(1),
        borderTopRightRadius: hp(1),
    },
    radius: {
        borderRadius: hp(1),
    },
    bottomRadius: {
        borderBottomLeftRadius: hp(1),
        borderBottomRightRadius: hp(1),
    },
})