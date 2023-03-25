import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../components/Header';

export default function Home() {
  const [groceriesList, setGroceriesList] = useState([]);
  const [grocerieItem, setGroceriesItem] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'groceries'), (doc) => {
      const groceries = [];
      doc.forEach((doc) => {
        groceries.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setGroceriesList(groceries);
    });
    return () => unsub();
  }, []);

  const addGrocerieItem = async () => {
    const doc = await addDoc(collection(db, 'groceries'), {
      title: grocerieItem,
      completed: false,
      userId: auth.currentUser.uid,
    });
    setGroceriesItem('');
  };

  const renderItem = ({ item }) => {
    const ref = doc(db, `groceries/${item.id}`);

    const toggleCompleted = async () => {
      updateDoc(ref, { completed: !item.completed });
    };
    const deleteItem = async () => {
      deleteDoc(ref);
      const updatedGroceries = [...groceriesList].filter(
        (item) => item.id != ref.id
      );
      setGroceriesList(updatedGroceries);
    };
    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity style={styles.task} onPress={toggleCompleted}>
          {item.completed && <Icon name='smile' size={30} color='#1d7948' />}
          {!item.completed && <Icon name='meh' size={30} />}
          <Text
            style={{
              ...styles.text,
              textDecorationLine: item.completed ? 'line-through' : 'none',
            }}
          >
            {item.title}
          </Text>
          <Icon
            style={{ marginRight: 5 }}
            name='trash'
            color='#C41A08'
            size={30}
            onPress={() => deleteItem()}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <FlatList
          data={groceriesList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.footer}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder='Legg til...'
            onChangeText={setGroceriesItem}
            value={grocerieItem}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => addGrocerieItem()}
          >
            <Icon name='plus' size={40} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1d7948',
    alignItems: 'center',
    justifyContent: 'center',
  },

  taskContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#fefefe',
    borderRadius: 8,
    borderColor: '#12121230',
    borderWidth: 1,
    shadowColor: '#12121230',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,

    elevation: 4,
  },

  task: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 8,
    margin: 8,
  },

  text: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    fontWeight: '500',
    color: '#06180e',
    marginLeft: 10,
  },

  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  body: {
    flex: 11,
    width: '100%',
    backgroundColor: '#d2e4da',
  },

  input: {
    fontFamily: 'Inter-Medium',
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 18,
    paddingTop: 18,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
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
    backgroundColor: '#ddea90',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 8,
    shadowColor: '#A31DD7',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,

    elevation: 4,
  },

  footer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#14141420',
    zIndex: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
