import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { Text as PaperText } from 'react-native-paper'
import BackgroundAuth from '../components/AuthComponents/BackgroundAuth'
// import Logo from '../components/AuthComponents/Logo'
import Header from '../components/AuthComponents/Header'
import ButtonAuth from '../components/AuthComponents/ButtonAuth'
import TextInputAuth from '../components/AuthComponents/TextInputAuth'
import BackButton from '../components/AuthComponents/BackButton'
import { theme } from '../core/theme'

export default function Login({ navigation }) {

  if (auth.currentUser) {
    navigation.navigate("Home");
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
  }

  let [errorMessage, setErrorMessage] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");

  const login = () => {

    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate("Home", { user: userCredential.user });
          setErrorMessage("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          setErrorMessage(error.message)
        });

    } else if (email == "" || password == "") {
      setErrorMessage("Email or password cannot be blank");
    }
    else {
      setErrorMessage("Please enter an email and password");
    }
  }

  return (
    <BackgroundAuth>
      <BackButton goBack={navigation.goBack} />
      {/* <Logo /> */}
      <Header>Login</Header>
      <TextInputAuth
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={setEmail}
        error={!!errorMessage}
        errorText={errorMessage}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInputAuth
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={setPassword}
        error={!!errorMessage}
        errorText={errorMessage}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPassword')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <ButtonAuth mode="contained" onPress={login}>
        Login
      </ButtonAuth>
      <View style={styles.row}>
        <PaperText style={styles.forgot}>Don’t have an account? </PaperText>
        <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
          <PaperText style={styles.link}>Sign up</PaperText>
        </TouchableOpacity>
      </View>
    </BackgroundAuth>
  );
}
const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.text,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
