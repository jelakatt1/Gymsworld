import React from 'react'
import { COLOR, commonStyles, hp, JUSTIFY, TEXT_STYLE, wp } from '../../../enums/StyleGuide'
import { AppHeader, Label, Pressable, Section, TextField } from '../../../components'
import { En } from '../../../enums/AppEnums'
import { styles } from './Styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const CreateChart = () => {
    return (
        <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>
            <AppHeader title={'Add New Chart'} LeftComp={En.BackArrow} RightComp={En.Setting} />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} overScrollMode={'never'}>
                <Section spaceX={'5%'} bg={COLOR.GREY} fillX={'5%'} fillY={hp(1)} spaceY={hp(1)} radius={hp(2)}>
                    <TextField
                        title={'Workout'} titleStyle={styles.titleStyle}
                        placeholder={'Select Workout'} placeholderColor={COLOR.LIGHT_GREY}
                        style={[styles.inputStyle, { width: '100%' }]}
                    />
                    <Section row center justify={JUSTIFY.between}>
                        <TextField
                            title={'Enter Age'} titleStyle={styles.titleStyle}
                            placeholder={'Enter your age'} placeholderColor={COLOR.LIGHT_GREY}
                            style={styles.inputStyle}
                        />
                    </Section>
                    <Section row center justify={JUSTIFY.between}>
                        <TextField
                            title={'Min Reps'} titleStyle={styles.titleStyle}
                            placeholder={'Enter min reps'} placeholderColor={COLOR.LIGHT_GREY}
                            style={styles.inputStyle}
                        />
                        <TextField
                            title={'Max Reps'} titleStyle={styles.titleStyle}
                            placeholder={'Enter max reps'} placeholderColor={COLOR.LIGHT_GREY}
                            style={styles.inputStyle}
                        />
                    </Section>
                    <Section row center justify={JUSTIFY.between}>
                        <TextField
                            title={'Min Points'} titleStyle={styles.titleStyle}
                            placeholder={'Enter min points'} placeholderColor={COLOR.LIGHT_GREY}
                            style={styles.inputStyle}
                        />
                        <TextField
                            title={'Max Points'} titleStyle={styles.titleStyle}
                            placeholder={'Enter max points'} placeholderColor={COLOR.LIGHT_GREY}
                            style={styles.inputStyle}
                        />
                    </Section>

                    <Section row center justify={JUSTIFY.end} spaceY={hp(1)}>
                        <Pressable fillX={wp(2.5)} fillY={hp(0.3)} bg={COLOR.YELLOW} radius={150 / 2} spaceR={wp(1.5)}>
                            <Label text={'Save'} textColor={COLOR.BLACK} style={TEXT_STYLE.small_text} />
                        </Pressable>
                        <Pressable fillX={wp(2)} fillY={hp(0.3)} radius={150 / 2} brW={1} brC={COLOR.BLACK}>
                            <Label text={'Cancel'} textColor={COLOR.BLACK} style={TEXT_STYLE.small_text} />
                        </Pressable>
                    </Section>

                </Section>
            </KeyboardAwareScrollView>
        </Section>
    )
}

export default CreateChart