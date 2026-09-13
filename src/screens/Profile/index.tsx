import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Profile() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}> Voltar</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Foto de Perfil e Nome */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://github.com/Arthur-Thz.png' }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Arthur</Text>
          <Text style={styles.userEmail}>arthur@email.com</Text>
        </View>

        {/* Estatísticas do Usuário */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>Assistidos</Text>
          </View>
        </View>

        {/* Lista de Opções */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favorites')}>
            <Text style={styles.menuItemText}>⭐ Meus Favoritos</Text>
            <Text style={styles.arrow}>❯</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('gallery')}>
            <Text style={styles.menuItemText}>🖼️ Galeria de Fotos</Text>
            <Text style={styles.arrow}>❯</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('config')}>
            <Text style={styles.menuItemText}>⚙️ Configurações</Text>
            <Text style={styles.arrow}>❯</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}