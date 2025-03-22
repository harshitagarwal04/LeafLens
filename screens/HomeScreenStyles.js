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
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
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
    marginLeft: 8,
  },
  versionText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text,
    marginTop: 40,
  },
});

export default styles;