import styles from 'common/styles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: styles.colors.white,
    fontSize: 14,
    ...styles.fonts.reross,
    lineHeight: 18,
    letterSpacing: 2.8,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  subTitle: {
    color: styles.colors.light_gray,
    fontSize: 8,
    ...styles.fonts.semiBoldM,
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    lineHeight: 17,
  },
  logoView: { marginTop: 30 },
  txtTitle: {
    color: styles.colors.white,
    fontSize: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 3,
    lineHeight: 32,
    marginTop: 19,
    ...styles.fonts.semiBoldM,
  },
  bottonView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 50,
  },
  inputContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomContainer: { alignItems: 'center' },
});
