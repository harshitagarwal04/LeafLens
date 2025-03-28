import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles';

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 28,
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Buttons side by side with space
    marginVertical: 20,
    paddingHorizontal: 5, // Add spacing on sides
  },
  button: {
    width: '45%', // Make buttons take 45% width
    aspectRatio: 1, // Square buttons
    backgroundColor: colors.primary,
    justifyContent: 'center',
    width: 160, // Explicit width (optional)
    height: 100, // Explicit height (optional)
    marginHorizontal: 5, // Increase this
    marginVertical: 10,  // Add this
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.secondary,
    marginTop: 5,
  },
  versionText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text,
    marginTop: 40,
    textAlign: 'center',
  },
  linkText: {
    marginTop: 20,
    color: '#1E90FF',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default styles;
