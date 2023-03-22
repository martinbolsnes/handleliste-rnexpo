import { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../components/Card';
import Header from '../components/Header';

export default function Home() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');

  const addText = (text) => {
    if (value !== '') {
      setList((prev) => {
        return [...prev, { text: text, isSelected: false }];
      });
      setValue('');
    } else {
      alert('Du må skrive noe...');
    }
  };

  const setIsSelected = (index, value) => {
    let data = [];

    for (let i = 0; i < list.length; i++) {
      if (index === i) {
        data.push({ ...list[i], isSelected: value });
      } else {
        data.push(list[i]);
      }
    }

    setList(data);
  };

  const deleteItem = (idx) => {
    Alert.alert('Fjern', 'Vil du fjerne matvaren fra listen?', [
      {
        text: 'Oops...',
        style: 'cancel',
      },
      {
        text: 'Ja',
        onPress: () => {
          const data = list.filter((item, index) => index !== idx);
          setList(data);
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <FlatList
          data={list}
          renderItem={({ item, index }) => (
            <Card
              data={item}
              index={index}
              setIsSelected={setIsSelected}
              deleteItem={deleteItem}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.footer}
      >
        <TextInput
          style={styles.input}
          placeholder='Legg til...'
          onChangeText={(text) => setValue(text)}
          value={value}
        />
        <TouchableOpacity onPress={() => addText(value)}>
          <LinearGradient
            style={styles.button}
            colors={['rgba(173, 29, 235, 1)', 'rgba(110, 114, 252, 1)']}
          >
            <Icon name='plus-circle' size={44} style={styles.icon} />
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
  },

  body: {
    flex: 8,
    width: '100%',
    backgroundColor: '#F5f5f5',
  },

  input: {
    width: '75%',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    margin: 10,
    backgroundColor: '#F5f5f5',
    borderRadius: 8,
    borderColor: '#12121220',
    borderWidth: 1,
    shadowColor: '#121212',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,

    elevation: 4,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    margin: 8,
    borderRadius: '100%',
    shadowColor: '#A31DD7',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,

    elevation: 4,
  },

  icon: {
    color: '#fefefe',
  },

  footer: {
    flex: 2,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#14141420',
    zIndex: 5,
  },
});
