import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';

export default function MovieEdit() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const movie = route.params?.movie || {};

  const [title, setTitle] = useState(movie.title || '');
  const [category, setCategory] = useState(movie.category || '');
  const [rating, setRating] = useState(movie.rating ? String(movie.rating) : '');
  const [youtubeId, setYoutubeId] = useState(movie.youtubeId || '');
  const [synopsis, setSynopsis] = useState(movie.synopsis || '');

  const handleUpdate = () => {
    if (!title.trim() || !category.trim()) {
      Alert.alert('Atenção', 'Preencha pelo menos o Título e a Categoria.');
      return;
    }

    Alert.alert('Sucesso', 'Filme atualizado com sucesso!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>⬅️ Cancelar</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>✏️ Editar Filme</Text>

        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Título do filme"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Categoria / Gênero</Text>
        <TextInput
          style={styles.input}
          placeholder="Categoria"
          placeholderTextColor="#888"
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Nota (Rating)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 4.8"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={rating}
          onChangeText={setRating}
        />

        <Text style={styles.label}>ID do Vídeo do YouTube</Text>
        <TextInput
          style={styles.input}
          placeholder="ID do YouTube"
          placeholderTextColor="#888"
          value={youtubeId}
          onChangeText={setYoutubeId}
        />

        <Text style={styles.label}>Sinopse</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Sinopse do filme..."
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          value={synopsis}
          onChangeText={setSynopsis}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
          <Text style={styles.submitButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}