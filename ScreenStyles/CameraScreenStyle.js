import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary,
    },
    image: {
        width: 300,
        height: 400,
        marginTop: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 10,
        marginHorizontal: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontFamily: fonts.body,
        fontSize: 18,
        color: colors.secondary,
    },
});

export default styles;