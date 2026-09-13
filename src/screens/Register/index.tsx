import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styles from './styles';

const Register: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Cadastro de Usuário</Text>
        <Text style={styles.text}>Tela de Cadastro de Usuário do MovieHub</Text>
      </View>
    </SafeAreaView>
  );
};

export default Register;