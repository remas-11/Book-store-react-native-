import React from 'react';
import {Button,Text, StyleSheet, View} from 'react-native';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';






const ReadersCommunityScreen = () => {
  
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Readers Community</Text>
        <Text style={styles.decription}>
          A community that brings together all readers who love reading books and
           enjoy sharing their wonderful opinions and criticisms. 
          We look forward to being a part of this community
          </Text>
          <StatusBar style='auto'/>
          <Button title='Join Us On Telegram' onPress={()=> Linking.openURL('https://t.me/+r4-sXzpsTFphYzNk')}/>
        
       
        
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
   fontSize:24,
   fontWeight:'bold',
   marginBottom:10,
  },
  decription: {
    fontSize:14,
    textAlign:'center',
    marginBottom:20,
   },

});

export default ReadersCommunityScreen;