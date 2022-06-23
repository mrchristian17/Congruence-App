import React from 'react';
import { auth } from "../firebase";
import { sendPasswordResetEmail } from 'firebase/auth';

import BackgroundAuth from '../components/AuthComponents/BackgroundAuth'
// import Logo from '../components/AuthComponents/Logo'
import Header from '../components/AuthComponents/Header'
import ButtonAuth from '../components/AuthComponents/ButtonAuth'
import TextInputAuth from '../components/AuthComponents/TextInputAuth'
import BackButton from '../components/AuthComponents/BackButton'
import { theme } from '../core/theme'

export default function ResetPassword({ navigation }) {
  let [email, setEmail] = React.useState("");
  let [errorMessage, setErrorMessage] = React.useState("");

  let resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.popToTop();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  return (
    <BackgroundAuth>
      <BackButton goBack={navigation.goBack} />
      {/* <Logo /> */}
      <Header>Reset Password</Header>
      <TextInputAuth
        label="E-mail address"
        returnKeyType="done"
        value={email}
        onChangeText={setEmail}
        error={!!errorMessage}
        errorText={errorMessage}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive an email with password reset link"
      />
      <ButtonAuth
        mode="contained"
        onPress={resetPassword}
        style={{ marginTop: 16 }}
      >
        Send Link
      </ButtonAuth>
    </BackgroundAuth>
  );
}