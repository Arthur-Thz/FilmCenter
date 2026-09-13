import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Login() {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.formContainer, { alignItems: 'center' }]}>
        <Image 
          source={require('../../../assets/logo.png')} 
          style={{ width: 80, height: 80, marginBottom: 15, borderRadius: 7 }} 
          resizeMode="contain"
        />

        <Text style={styles.logoText}>
          Film<Text style={{ color: '#E50914' }}>Center</Text>
        </Text>
        <Text style={[styles.subtitle, { textAlign: 'center' }]}>
          Explore, favorite e gerencie seus filmes favoritos em um só lugar.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}