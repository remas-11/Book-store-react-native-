import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

export default function AddBookScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');  

  const addBook = async () => {
    if (title && author && price) {
      try {
         const bookPrice = parseFloat(price);
        if (isNaN(bookPrice)) {
          alert("Please enter a valid price.");
          return;
        }
        
         await addDoc(collection(db, 'Books'), { title, author, image, price: bookPrice });
        navigation.goBack();  
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Book Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"  
      />
      <Button title="Add Book" onPress={addBook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  input: {
    marginBottom: 15,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});
