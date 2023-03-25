import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import {
  signOut,
  updatePassword,
  signInWithEmailAndPassword,
  deleteUser,
} from 'firebase/auth';
import { useState } from 'react';
import Header from '../components/Header';

export default function Account({ navigation }) {
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const logOut = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
  };

  const updateUserPassword = () => {
    signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updatePassword(user, newPassword)
          .then(() => {
            setNewPassword('');
            setErrorMessage('');
            setCurrentPassword('');
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const deleteUserAndItems = () => {
    if (currentPassword === '') {
      setErrorMessage('Fyll inn riktig passord for å slette kontoen');
    } else {
      signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
        .then((userCredential) => {
          const user = userCredential.user;

          let batch = writeBatch(db);
          const q = query(
            collection(db, 'groceries'),
            where('userId', '==', user.uid)
          );
          getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              batch.delete(doc.ref);
            });
            batch.commit();

            deleteUser(user)
              .then(() => {
                navigation.popToTop();
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });
          });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <TouchableOpacity style={styles.btnLogout} onPress={logOut}>
          <Text style={styles.btnLogoutText}>Logg ut</Text>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 15,
            color: '#C41A08',
            fontFamily: 'Inter-Medium',
          }}
        >
          {errorMessage}
        </Text>
        <View style={styles.newPasswordContainer}>
          <TextInput
            style={styles.input}
            placeholder='Passord'
            value={currentPassword}
            secureTextEntry={true}
            onChangeText={setCurrentPassword}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder='Nytt passord'
            value={newPassword}
            secureTextEntry={true}
            onChangeText={setNewPassword}
          ></TextInput>
          <TouchableOpacity
            style={styles.btnNewPassword}
            onPress={updateUserPassword}
          >
            <Text style={styles.btnNewPasswordText}>Oppdater passord</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.deleteUserContainer}>
          <TouchableOpacity
            style={styles.btnDeleteUser}
            onPress={deleteUserAndItems}
          >
            <Text style={styles.btnDeleteUserText}>Slett bruker</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btnGoBack}
          onPress={() => navigation.pop()}
        >
          <Text style={styles.btnGoBackText}>Tilbake</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1d7948',
  },
  body: {
    flex: 9,
    width: '100%',
    alignItems: 'center',
    marginTop: 60,
  },

  btnLogout: {
    marginTop: 20,
    backgroundColor: '#ddea90',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 12,
    paddingTop: 12,
    borderRadius: 10,
  },

  btnLogoutText: {
    color: '#121212',
    fontFamily: 'Inter-Medium',
    fontSize: 18,
  },

  input: {
    fontFamily: 'Inter-Medium',
    width: '90%',
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

  newPasswordContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },

  btnNewPasswordText: {
    fontFamily: 'Inter-Medium',
  },

  btnNewPassword: {
    marginTop: 12,
    backgroundColor: '#fefefe',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 12,
    paddingTop: 12,
    borderRadius: 10,
  },

  deleteUserContainer: {
    marginTop: 60,
    width: '100%',
    alignItems: 'center',
  },

  btnDeleteUser: {
    marginTop: 12,
    backgroundColor: '#b94429',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 12,
    paddingTop: 12,
    borderRadius: 10,
  },

  btnDeleteUserText: {
    fontFamily: 'Inter-Medium',
    color: '#fefefe',
  },

  btnGoBack: {
    marginTop: 100,
    backgroundColor: '#fefefe',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 12,
    paddingTop: 12,
    borderRadius: 10,
  },
  btnGoBackText: {
    fontFamily: 'Inter-Medium',
  },
});
