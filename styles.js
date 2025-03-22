import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#4CAF50',    // Leafy Green
    secondary: '#FFFFFF',  // White
    accent: '#2E7D32',     // Dark Green
    text: '#333333',       // Charcoal
};

export const fonts = {
    heading: 'Poppins',  // Font for headings
    body: 'Roboto',      // Font for body text
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary,
    },
    heading: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.primary,
        marginBottom: 10,
    },
    text: {
        fontFamily: fonts.body,
        fontSize: 16,
        color: colors.text,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 8,
        margin: 5,
    },
    buttonText: {
        fontFamily: fonts.body,
        fontSize: 16,
        color: colors.secondary,
    },
});