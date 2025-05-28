import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles';

const GuideScreenStyle = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '96%',
    maxWidth: 420,
    maxHeight: '85%',
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
    elevation: 10,
    justifyContent: 'flex-start',
  },
  scrollContent: {
    paddingHorizontal: 6,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.heading,
    marginBottom: 14,
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: colors.shadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  sectionTitle: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.accent,
    marginTop: 18,
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 1,
  },
  cant: {
    color: '#e67e22',
    fontWeight: 'bold',
  },
  text: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.text,
    marginBottom: 7,
    lineHeight: 20,
    textAlign: 'center',
    opacity: 0.95,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
    gap: 8,
    paddingHorizontal: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 10,
    overflow: 'hidden',
    minWidth: 110,
    maxWidth: 160,
  },
});

export default GuideScreenStyle;
