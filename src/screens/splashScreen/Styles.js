import { StyleSheet } from 'react-native'
import { hp, TEXT_STYLE } from '../../enums/StyleGuide'

export const styles = StyleSheet.create({
    backgroundStyle: { flex: 1, justifyContent: 'space-around', opacity: 0.8 },
    headingText: {
        ...TEXT_STYLE.text_bold,
        textAlign:'center',
        textTransform:'uppercase',
    }
})