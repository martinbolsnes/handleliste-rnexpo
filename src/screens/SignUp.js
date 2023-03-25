import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native';
import { auth } from '../../config/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage('Passordene er ikke like');
    } else {
      setValidationMessage('');
    }
    setValue(value);
  };

  const signUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser);
          Alert.alert(
            'Verifiser din mail',
            'Din konto må verifiseres før du kan bruke appen. Sjekk din innboks',
            {
              text: 'OK',
              onPress: () =>
                navigation.navigate('Login', { user: userCredential.user }),
            }
          );
        })
        .catch((error) => {
          setValidationMessage(error.message);
        });
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Icon name='smile' style={styles.icon} size={50} />
        <Text style={styles.text}>Ny konto</Text>
        <KeyboardAvoidingView style={styles.form}>
          <Text style={styles.errorText}>{validationMessage}</Text>
          <TextInput
            style={styles.input}
            placeholder='Mail'
            keyboardType='email-address'
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder='Passord'
            autoCapitalize='none'
            value={password}
            onChangeText={(value) =>
              validateAndSet(value, confirmPassword, setPassword)
            }
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder='Bekreft passord'
            autoCapitalize='none'
            value={confirmPassword}
            onChangeText={(value) =>
              validateAndSet(value, password, setConfirmPassword)
            }
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.btnLogin} onPress={signUp}>
            <Text style={styles.btnLoginText}>Lag bruker</Text>
          </TouchableOpacity>
          <View style={styles.createUserContainer}>
            <Text style={styles.formText}>Har du allerede en konto?</Text>
            <TouchableOpacity
              style={styles.btnCreateUser}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.btnCreateUserText}>Logg inn</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        {/* <TouchableOpacity style={styles.btnGoogle}>
          <Text style={styles.btnGoogleText}>Google</Text>
        </TouchableOpacity> */}
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

  errorText: {
    marginTop: 15,
    color: '#C41A08',
    fontFamily: 'Inter-Medium',
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

  btnGoogle: {
    marginTop: 120,
    backgroundColor: '#ddea90',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 12,
    paddingTop: 12,
    borderRadius: 10,
  },

  btnGoogleText: {
    color: '#121212',
    fontFamily: 'Inter-Medium',
    fontSize: 18,
  },
});
