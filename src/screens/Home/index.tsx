import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { POPULAR_MOVIES, ALL_MOVIES, CINEMA_MOVIES, MovieItem } from '../../data/movies';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
  const navigation = useNavigation<NavigationProps>();
  const [favorites, setFavorites] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('@favorites').then(data => {
        if (data) setFavorites(JSON.parse(data));
        else setFavorites([]);
      });
    }, [])
  );

  const toggleFavorite = async (id: string) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter(item => item !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('@favorites', JSON.stringify(updatedFavorites));
  };

  const renderMovieCard = (item: MovieItem) => (
    <View key={item.id} style={styles.movieCard}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('MovieDetails', { id: item.id })}
      >
        <Image source={item.cover} style={styles.movieCover} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.favButton}
        onPress={() => toggleFavorite(item.id)}
        activeOpacity={0.7}
      >
        <Text style={{ fontSize: 11 }}>{favorites.includes(item.id) ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('MovieDetails', { id: item.id })}
      >
        <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.movieRating}>⭐ {item.rating}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../../assets/logo.png')} 
            style={styles.logoImage} 
            resizeMode="contain"
          />
          <Text style={styles.logo}>
            Film<Text style={styles.logoHighlight}>Center</Text>
          </Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.headerButtonText}>🔍</Text>
          </TouchableOpacity>

          {/* Botão de Perfil com a foto redonda do GitHub */}
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image 
              source={{ uri: 'https://github.com/Arthur-Thz.png' }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#E50914',
              }} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Atalhos Rápidos */}
        <View style={styles.navGrid}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Movies')}>
            <Text style={styles.navText}> Filmes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Favorites')}>
            <Text style={styles.navText}> Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('gallery')}>
            <Text style={styles.navText}> Galeria</Text>
          </TouchableOpacity>
        </View>

        {/* Botão para Criar Filme */}
        <TouchableOpacity
          style={{
            backgroundColor: '#E50914',
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginHorizontal: 15,
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate('MovieCreate')}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }}>
             Adicionar Novo Filme
          </Text>
        </TouchableOpacity>

        {/* 1. Lançamentos Populares */}
        <Text style={styles.sectionTitle}>🔥 Lançamentos Populares</Text>
        <FlatList
          horizontal
          data={POPULAR_MOVIES}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderMovieCard(item)}
          style={{ marginBottom: 20 }}
        />

        {/* 2. Filmes */}
        <Text style={styles.sectionTitle}>🎥 Filmes</Text>
        <FlatList
          horizontal
          data={ALL_MOVIES}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderMovieCard(item)}
          style={{ marginBottom: 20 }}
        />

        {/* 3. Cinema */}
        <Text style={styles.sectionTitle}>🍿 Em Exibição no Cinema</Text>
        <FlatList
          horizontal
          data={CINEMA_MOVIES}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderMovieCard(item)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}