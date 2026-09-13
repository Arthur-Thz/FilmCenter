import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function MovieCreate() {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('');
  const [youtubeId, setYoutubeId] = useState('');
  const [synopsis, setSynopsis] = useState('');

  const handleCreate = () => {
    if (!title.trim() || !category.trim()) {
      Alert.alert('Atenção', 'Preencha pelo menos o Título e a Categoria.');
      return;
    }

    Alert.alert('Sucesso', `Filme "${title}" cadastrado com sucesso!`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>⬅️ Voltar</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>➕ Adicionar Novo Filme</Text>

        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Homem-Aranha"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Categoria / Gênero</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Ação / Aventura"
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
          placeholder="Ex: d9MyW72ELxy"
          placeholderTextColor="#888"
          value={youtubeId}
          onChangeText={setYoutubeId}
        />

        <Text style={styles.label}>Sinopse</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escreva uma breve sinopse..."
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          value={synopsis}
          onChangeText={setSynopsis}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleCreate}>
          <Text style={styles.submitButtonText}>Cadastrar Filme</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}