import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Handleliste</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    borderBottomWidth: 1,
    borderBottomColor: '#14141430',
    zIndex: 5,
  },

  text: {
    fontSize: 24,
    fontWeight: '800',
  },
});
