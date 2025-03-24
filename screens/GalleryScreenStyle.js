import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  header: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.primary,
    marginVertical: 8,
    backgroundColor: 'transparent',
  },
  noImages: {
    fontFamily: fonts.body,
    fontSize: 18,
    color: colors.text,
    margin: 20,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
  plusIcon: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    margin: 5,
    backgroundColor: colors.secondary,
  },
  uploadButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    alignSelf: 'center',
  },
  uploadText: {
    fontFamily: fonts.body,
    fontSize: 18,
    color: colors.secondary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  fullImage: {
    width: '90%',
    height: '70%',
    marginVertical: 20,
    borderRadius: 8,
  },
  analyzeButton: {
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
  },
  analyzeText: {
    fontFamily: fonts.body,
    fontSize: 18,
    color: colors.secondary,
  },
  fixedHeader: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.primary,
    marginVertical: 10,
    textAlign: 'center',
    backgroundColor: colors.secondary,
    padding: 10,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  lowerHalf: {
    flex: 1,
    width: '100%',
    paddingTop: 40,
  },
  blurredBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    opacity: 0.9,
},
plusIconText: {
    position: 'absolute',
},
});

export default styles;