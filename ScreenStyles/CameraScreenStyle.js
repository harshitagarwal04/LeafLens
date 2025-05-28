import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 400,
        marginTop: 20,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: colors.green,
        backgroundColor: colors.secondary,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    button: {
        backgroundColor: colors.green,
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
        marginHorizontal: 10,
        alignItems: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        fontFamily: fonts.body,
        fontSize: 18,
        color: colors.text,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});

export default styles;