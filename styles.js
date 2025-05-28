import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#181C24',    // Deep dark blue-grey
    secondary: '#232A34',  // Slightly lighter dark for cards
    accent: '#FFB300',     // Vibrant orange
    text: '#F8F8F8',       // Almost white
    green: '#43A047',      // Vibrant dark green
    blue: '#29B6F6',       // Accent blue for highlights
    border: '#263238',     // Subtle border color
    shadow: '#000A',       // Shadow with alpha
};

export const fonts = {
    heading: 'Poppins',
    body: 'Roboto',
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontFamily: fonts.heading,
        fontSize: 26,
        color: colors.accent,
        marginBottom: 12,
        letterSpacing: 1,
    },
    text: {
        fontFamily: fonts.body,
        fontSize: 16,
        color: colors.text,
    },
    button: {
        backgroundColor: colors.green,
        padding: 12,
        borderRadius: 10,
        margin: 6,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        fontFamily: fonts.body,
        fontSize: 16,
        color: colors.text,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});