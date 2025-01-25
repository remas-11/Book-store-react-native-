 // LoginScreen.js 
 
import React, { useState } from 'react'; 
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from './firebaseConfig'; 
 
const LoginScreen = ({ navigation }) => { 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
 
  const handleLogin = async () => { 
    try { 
      await signInWithEmailAndPassword(auth, email, password); 
      // Navigate to the Main Tab Navigator and open the Home screen 
      navigation.navigate('Main', { 
        screen: 'Home',  
      }); 
    } catch (error) { 
      Alert.alert('Login Failed', error.message); 
    } 
  }; 
 
  return ( 
    <View style={styles.container}> 
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
      /> 
      <TextInput 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input} 
      /> 
      <Button title="Login" onPress={handleLogin} /> 
      <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} /> 
    </View> 
  ); 
}; 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 16, 
  }, 
  input: { 
    borderBottomWidth: 1, 
    marginBottom: 16, 
    padding: 8, 
  }, 
}); 
 
export default LoginScreen;