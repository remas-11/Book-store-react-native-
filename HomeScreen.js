import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { CartContext } from './CartContext';
import { db } from './firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function HomeScreen() {
  const { addToCart } = useContext(CartContext);
  const [books, setBooks] = useState([]);

   const staticBooks = [
    { id: '1', title: 'حياة في الادارة', author: 'غازي القصيبي', price: 50, image: require('./assets/book1.jpeg') },
    { id: '2', title: 'فاتتني الصلاة', author: 'اسلام جمال', price: 70, image: require('./assets/book2.jpeg') },
    { id: '3', title: 'حقبة من التاريخ', author: 'عثمان محمد', price: 40, image: require('./assets/imageA.jpg') },
    { id: '4', title: 'الاب الغني الاب الفقير', author: 'ربورت كي.كوساكي', price: 90, image: require('./assets/book4.jpeg') },
  ];

   const fetchBooks = async () => {
    try {
      const booksCollectionRef = collection(db, 'Books');
      const querySnapshot = await getDocs(booksCollectionRef);
      const dynamicBooks = querySnapshot.docs.map(doc => ({
        id: doc.id,  
        ...doc.data(),  
      }));
     
       setBooks([...staticBooks, ...dynamicBooks]);
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  };

   const deleteBook = async (id) => {
    try {
       if (!staticBooks.some(book => book.id === id)) {
        const bookDocRef = doc(db, 'Books', id);  
        await deleteDoc(bookDocRef);  
        setBooks(prevBooks => prevBooks.filter(book => book.id !== id));  
      } else {
        alert('Cannot delete static books.');
      }
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <Animated.View
            entering={FadeIn.duration(2500)}  
            style={styles.bookCard}
          >
            <Image
              source={item.image.uri ? { uri: item.image } : item.image}
              style={styles.bookImage}
              resizeMode="cover"
            />
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
            <Text style={styles.bookPrice}>${item.price || 'N/A'}</Text>
           
            { }
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addToCartText}>Add</Text>
            </TouchableOpacity>

            { }
            {!staticBooks.some(book => book.id === item.id) && ( 
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteBook(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  bookCard: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  bookTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
  bookPrice: {
    fontSize: 14,
    color: '#4CAF50',
    marginVertical: 5,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',  
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  addToCartText: {
    color: '#fff',  
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  deleteButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },




  deleteButtonText: {
    color: '#fff',

    fontSize: 16,

    fontWeight: 'bold',
  },
});







