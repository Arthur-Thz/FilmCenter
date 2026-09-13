import React from 'react';
import { View, Text, FlatList, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOVIES_LIST } from '../Movies';
import styles from './styles';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3 - 10;

export default function Gallery() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Galeria de Cartazes</Text>
      <FlatList
        data={MOVIES_LIST}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={item.cover} style={{ width: ITEM_WIDTH, height: 160, margin: 5, borderRadius: 8 }} />
        )}
      />
    </SafeAreaView>
  );
}