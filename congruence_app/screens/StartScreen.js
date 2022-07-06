import React from 'react'
import BackgroundAuth from '../components/AuthComponents/BackgroundAuth'
// import Logo from '../components/AuthComponents/Logo'
import Header from '../components/AuthComponents/Header'
import ButtonAuth from '../components/AuthComponents/ButtonAuth'
import Paragraph from '../components/AuthComponents/Paragraph'

export default function StartScreen({ navigation }) {
  return (
    <BackgroundAuth>
      {/* <Logo /> */}
      <Header>Congruence App</Header>
      <Paragraph>
        Welcome
      </Paragraph>
      <ButtonAuth
        mode="contained"
        onPress={() => navigation.navigate('Login')}
      >
        Login
      </ButtonAuth>
      <ButtonAuth
        mode="outlined"
        onPress={() => navigation.navigate('SignUp')}
      >
        Sign Up
      </ButtonAuth>
    </BackgroundAuth>
  )
}