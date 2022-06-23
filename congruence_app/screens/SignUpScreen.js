import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

import BackgroundAuth from '../components/AuthComponents/BackgroundAuth'
// import Logo from '../components/AuthComponents/Logo'
import Header from '../components/AuthComponents/Header'
import ButtonAuth from '../components/AuthComponents/ButtonAuth'
import TextInputAuth from '../components/AuthComponents/TextInputAuth'
import BackButton from '../components/AuthComponents/BackButton'
import { theme } from '../core/theme'

export default function SignUp({ navigation }) {
  const background = require("../assets/background.jpeg");

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");
  let [validationMessage, setValidationMessage] = React.useState("");

  let validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage("Passwords do not match.");
    } else {
      setValidationMessage("");
    }

    setValue(value);
  };

  let signUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser);
        navigation.navigate("Home", { user: userCredential.user });
      })
      .catch((error) => {
        setValidationMessage(error.message);
      });
    }
  }

  return (
    <BackgroundAuth>
      <BackButton goBack={navigation.goBack} />
      {/* <Logo /> */}
      <Header>Create Account</Header>
      <TextInputAuth
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={setEmail}
        error={!!validationMessage}
        errorText={validationMessage}
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
        error={!!validationMessage}
        errorText={validationMessage}
        secureTextEntry={true} 
        onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)}
      />
      <TextInputAuth
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        error={!!validationMessage}
        errorText={validationMessage}
        secureTextEntry={true} 
        onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)}
      />
      <ButtonAuth
        mode="contained"
        onPress={signUp}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </ButtonAuth>
      <View style={styles.row}>
        <Text style={{color: theme.colors.text}}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </BackgroundAuth>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})