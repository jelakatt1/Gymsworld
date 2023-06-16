import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppHeader, Img, Label, OrganizationTestBox, Section, TestBox } from '../../components'
import { COLOR, commonStyles, hp } from '../../enums/StyleGuide'
import { MORE_DESIGN } from '../../enums/AppEnums'

const SeeAllScreen = ({ route }) => {
    const { title, DATA, design } = route?.params
    return (
        <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>
            <AppHeader
                title={title}
                LeftComp={
                    <Img src={require('../../assets/images/Logo.png')} height={hp(6)} width={hp(6)} contain />
                }
            />
            <ScrollView>
                {design == MORE_DESIGN.ORG_TEST &&
                    <View style={styles.itemContainer}>
                        {DATA?.slice(0, 10).map((item, index) => {
                            return (
                                <OrganizationTestBox
                                    item={item} key={index}
                                    style={[styles.itemStyle, index % 2 == 0 && styles.marginLeft]}
                                />
                            )
                        })}
                    </View>
                }
                {design == MORE_DESIGN.MY_TEST &&
                    <Section fillX={'5%'}>
                        {DATA?.map((item, index) => {
                            return <TestBox item={item} key={index} />
                        })}
                    </Section>
                }

            </ScrollView>
        </Section>
    )
}

export default SeeAllScreen

const styles = StyleSheet.create({
    itemStyle: {
        marginVertical: hp(1),
        marginHorizontal: 0,
        // backgroundColor: 'blue',
    },
    marginLeft: {
        marginLeft: '3%',
        // backgroundColor: 'green',
    },
    itemContainer: {
        width: '90%',
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        alignSelf: 'center',
        justifyContent: 'center',
    }
})