import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';

export default function MovieDelete() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const movieTitle = route.params?.title || 'este filme';

  const handleDeleteConfirm = () => {
    Alert.alert('Sucesso', `O filme "${movieTitle}" foi removido do catálogo!`, [
      { text: 'OK', onPress: () => navigation.navigate('Home' as never) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>⚠️</Text>
        <Text style={styles.title}>Confirmar Exclusão</Text>
        <Text style={styles.message}>
          Tem certeza de que deseja excluir o filme <Text style={styles.movieHighlight}>"{movieTitle}"</Text>? Esta ação não poderá ser desfeita.
        </Text>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteConfirm}>
          <Text style={styles.deleteButtonText}>Sim, Excluir Filme</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}