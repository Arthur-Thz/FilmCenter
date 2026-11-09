import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { logout } from '../../services/authService';
import { getProfile, Profile as UserProfile } from '../../services/userService';
import { getMovies } from '../../services/movieService';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Profile() {
  const navigation = useNavigation<NavigationProps>();
  const [favoritesCount, setFavoritesCount] = useState<number>(0);
  const [watchedCount, setWatchedCount] = useState<number>(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const loadProfileData = useCallback(async () => {
    try {
      const [profile, movies] = await Promise.all([getProfile(), getMovies()]);
      setUserProfile(profile);
      setWatchedCount(movies.filter(movie => movie.status === 'watched').length);
    } catch (error) {
      console.warn('Não foi possível carregar os dados do perfil:', error);
    }
  }, []);

  const loadFavoritesCount = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('@favorites');
      const favoriteIds: string[] = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavoritesCount(new Set(favoriteIds).size);
    } catch (error) {
      console.warn('Erro ao carregar contagem de favoritos:', error);
      setFavoritesCount(0);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProfileData();
      loadFavoritesCount();
    }, [loadProfileData, loadFavoritesCount])
  );

  const displayName = userProfile?.nome?.trim() || userProfile?.email?.split('@')[0] || 'Meu perfil';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0F" />

      <LinearGradient colors={['#1A1A24', '#0B0B0F']} style={styles.headerGradient}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
            <Text style={styles.backText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
          <View style={{ width: 60 }} />
        </View>

        <View style={styles.profileHeader}>
          <Image source={{ uri: userProfile?.foto_url || 'https://github.com/Arthur-Thz.png' }} style={styles.avatar} />
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{userProfile?.email || 'Carregando e-mail...'}</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{favoritesCount}</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{watchedCount}</Text>
            <Text style={styles.statLabel}>Assistidos</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favorites')} activeOpacity={0.7}>
            <Text style={styles.menuItemText}>⭐ Meus Favoritos</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('gallery')} activeOpacity={0.7}>
            <Text style={styles.menuItemText}>🖼️ Galeria de Fotos</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyMovies')} activeOpacity={0.7}>
            <Text style={styles.menuItemText}>🎬 Minha Coleção (Banco de Dados)</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => navigation.navigate('config')} activeOpacity={0.7}>
            <Text style={styles.menuItemText}>⚙️ Sobre o Aplicativo</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            await logout();
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          }}
          activeOpacity={0.8}
        >
          <View style={styles.logoutContent}>
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
