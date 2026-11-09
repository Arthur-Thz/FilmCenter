import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import MyMovies from '../screens/MyMovies';
import Home from '../screens/Home';
import Movies from '../screens/Movies';
import Favorites from '../screens/Favorites';
import Gallery from '../screens/gallery';
import MovieDetails from '../screens/MovieDetails';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import MovieCreate from '../screens/MovieCreate';
import MovieEdit from '../screens/MovieEdit';
import MovieDelete from '../screens/MovieDelete';
import Config from '../screens/config';
import { restoreSession } from '../services/authService';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MyMovies: undefined;
  Home: undefined;
  Movies: undefined;
  Favorites: undefined;
  gallery: undefined;
  Search: undefined;
  Profile: undefined;
  MovieDetails: { id: string };
  MovieCreate: undefined;
  MovieEdit: { movie: any };
  MovieDelete: { id: string; title?: string };
  config: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Home' | null>(null);

  // Valida a sessão salva antes de escolher a primeira tela.
  useEffect(() => {
    let mounted = true;
    restoreSession()
      .then((authenticated) => {
        if (mounted) setInitialRoute(authenticated ? 'Home' : 'Login');
      })
      .catch(() => {
        if (mounted) setInitialRoute('Login');
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, backgroundColor: '#101014', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#E50914" size="large" />
        <Text style={{ color: '#AAA', marginTop: 12 }}>Conectando...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="MyMovies" component={MyMovies} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Movies" component={Movies} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="gallery" component={Gallery} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MovieCreate" component={MovieCreate} />
      <Stack.Screen name="MovieEdit" component={MovieEdit} />
      <Stack.Screen name="MovieDelete" component={MovieDelete} />
      <Stack.Screen name="config" component={Config} />
    </Stack.Navigator>
  );
}
