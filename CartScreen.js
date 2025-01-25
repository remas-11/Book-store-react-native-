import React, {useContext} from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button, Alert} from 'react-native';
import { CartContext } from './CartContext';


  

export default function CartScreen() {
const { cart, removeFromCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>          
                <View style={styles.itemDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)} 
              >
              <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>Your cart is empty!</Text>
      )}

      { cart.length > 0 && (
      <View style={styles.emptyText}>
      </View>
      )}

      { cart.length > 0 && (
      <View style={styles.checkoutContainer}>
        <Button title='Checkout' onPress={() => handleCheckout()}/>
      </View>
      )}
      
    </View>
  );
}

function handleCheckout() {
  Alert.alert('The order was completed successfully. Thank you')
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  image: {
    width: 60,  
    height: 90, 
    marginRight: 15,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 16, color: '#4CAF50' },
  quantity: { fontSize: 14, color: '#555' },
  removeButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkoutContainer: {
     backgroundColor: '#a9a9a9',
     width: "100%",
     marginVertical: 10,
     borderRadius: 10,
  },
  emptyText: { 
    textalign: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: '#777'
    },
});

