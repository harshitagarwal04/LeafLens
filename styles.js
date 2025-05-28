import { StyleSheet } from 'react-native';

export const colors = {
    primary: 'rgba(24,28,36,0.3)', // Overlay, not used directly as bg
    card: 'rgba(30,34,40,0.85)',   // Card/container bg
    accent: '#FFB300',             // Vibrant orange
    text: '#F5F5F5',               // Soft white for body text
    heading: '#FFFFFF',            // Pure white for headings
    green: '#388E3C',              // Deep green for secondary buttons
    blue: '#29B6F6',               // Accent blue for links
    border: '#4CAF50',             // Subtle green border
    shadow: '#000A',               // Shadow with alpha
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
        color: colors.heading,
        marginBottom: 12,
        letterSpacing: 1,
    },
    text: {
        fontFamily: fonts.body,
        fontSize: 16,
        color: colors.text,
    },
    button: {
        backgroundColor: colors.accent,
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
        color: colors.heading,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});