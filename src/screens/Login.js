import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { auth } from '../../config/firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

export default function LoginComponent({ navigation }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Login = () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setErrorMessage('');
          setEmail('');
          setPassword('');
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage('Vennligst legg til mail og passord');
    }
  };
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Icon name='smile' style={styles.icon} size={50} />
        <Text style={styles.text}>Logg inn</Text>
        <KeyboardAvoidingView style={styles.form}>
          <Text
            style={{
              marginTop: 15,
              color: '#C41A08',
              fontFamily: 'Inter-Medium',
            }}
          >
            {errorMessage}
          </Text>
          <TextInput
            keyboardType='email-address'
            autoCapitalize='none'
            style={styles.input}
            placeholder='Mail'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder='Passord'
            autoCapitalize='none'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => Login(navigation.navigate('Home'))}
          >
            <Text style={styles.btnLoginText}>Logg inn</Text>
          </TouchableOpacity>
          <View style={styles.createUserContainer}>
            <Text style={styles.formText}>Har du ikke en konto?</Text>
            <TouchableOpacity
              style={styles.btnCreateUser}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.btnCreateUserText}>Lag bruker</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1d7948',
  },
  container: {
    flex: 9,
    width: '100%',
    alignItems: 'center',
    marginTop: 60,
  },

  icon: {
    marginBottom: 40,
    color: '#ddea90',
  },

  form: {
    width: '100%',
    alignItems: 'center',
  },

  formText: {
    color: '#ddea90',
    marginTop: 10,
    fontSize: 16,
  },

  createUserContainer: {
    alignItems: 'center',
    marginTop: 40,
  },

  btnCreateUserText: {
    fontFamily: 'Inter-Medium',
  },

  btnCreateUser: {
    marginTop: 12,
    backgroundColor: '#fefefe',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 12,
    paddingTop: 12,
    borderRadius: 10,
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

  text: {
    fontFamily: 'Righteous-Regular',
    fontSize: 24,
    color: '#ddea90',
  },

  btnLogin: {
    marginTop: 20,
    backgroundColor: '#ddea90',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 12,
    paddingTop: 12,
    borderRadius: 10,
  },

  btnLoginText: {
    color: '#121212',
    fontFamily: 'Inter-Medium',
    fontSize: 18,
  },
});
