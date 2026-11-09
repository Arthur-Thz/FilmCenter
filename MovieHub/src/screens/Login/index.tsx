import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import styles from './styles';
import { login, restoreSession } from '../../services/authService';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Login() {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  // Ao abrir o app, reaproveita a sessão salva (renovando o token se necessário).
  useEffect(() => {
    let active = true;
    restoreSession().then(ok => {
      if (!active) return;
      if (ok) navigation.replace('Home');
      else setChecking(false);
    });
    return () => { active = false; };
  }, [navigation]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Campos vazios', 'Por favor, preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Não foi possível entrar', error instanceof Error ? error.message : 'Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color="#E50914" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#101014" />
      <View style={styles.formContainer}>
        <View style={styles.logoWrapper}>
        <Image 
          source={require('../../../assets/logo.png')} 
          style={styles.logoImage} 
          resizeMode="cover"
          />
        </View>

        <Text style={styles.logoText}>
          Film<Text style={styles.logoAccent}>Center</Text>
        </Text>
        <Text style={styles.subtitle}>
          Explore, favorite e gerencie seus filmes favoritos em um só lugar.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#666675"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#666675"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register' as never)} style={{ marginTop: 18 }}>
          <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Não tem conta? <Text style={{ color: '#E50914', fontWeight: 'bold' }}>Cadastre-se</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}