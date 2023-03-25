import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Constants from 'expo-constants';

export default function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.textContainer}>
        <Text
          style={{
            fontWeight: '800',
            color: '#ddea90',
            fontFamily: 'Righteous-Regular',
            fontSize: 24,
            paddingLeft: 50,
          }}
        >
          Handleliste
        </Text>
      </View>
      <Icon
        style={styles.icon}
        name='user'
        size={30}
        onPress={() => navigation.navigate('Account')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    borderBottomWidth: 1,
    borderBottomColor: '#14141430',
    zIndex: 5,
  },

  textContainer: {
    flexBasis: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
  },

  icon: {
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 1,
    color: '#ddea90',
    marginRight: 10,
  },
});
