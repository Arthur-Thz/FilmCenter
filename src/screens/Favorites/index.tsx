import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { POPULAR_MOVIES, ALL_MOVIES, CINEMA_MOVIES, MovieItem } from '../../data/movies';
import styles from './styles';

export default function Favorites() {
  const navigation = useNavigation<any>();
  const [favoriteMovies, setFavoriteMovies] = useState<MovieItem[]>([]);

  const allMoviesList = [...POPULAR_MOVIES, ...ALL_MOVIES, ...CINEMA_MOVIES];

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('@favorites');
      if (storedFavorites) {
        const favoriteIds: string[] = JSON.parse(storedFavorites);
        const uniqueIds = Array.from(new Set(favoriteIds));

        // Filtra os filmes e garante que o ID não se repita no resultado final
        const filtered = allMoviesList
          .filter(movie => uniqueIds.includes(movie.id))
          .filter((movie, index, self) => index === self.findIndex(m => m.id === movie.id));

        setFavoriteMovies(filtered);
      } else {
        setFavoriteMovies([]);
      }
    } catch (error) {
      console.log('Erro ao carregar favoritos', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Adicionado style={{ textAlign: 'center' }} aqui */}
      <Text style={[styles.title, { textAlign: 'center' }]}>Meus Favoritos ⭐</Text>
      
      {favoriteMovies.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum filme favoritado ainda.</Text>
      ) : (
        <FlatList
          data={favoriteMovies}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate('MovieDetails', { id: item.id })}
            >
              <Image source={item.cover} style={styles.cover} />
              <View style={styles.info}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.rating}>⭐ {item.rating}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}