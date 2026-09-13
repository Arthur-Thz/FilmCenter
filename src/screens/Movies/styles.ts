import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101014',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#1C1C22',
    borderRadius: 8,
    padding: 8,
    width: '48%',
    alignItems: 'center',
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginBottom: 8,
  },
  movieTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  rating: {
    color: '#FFD700',
    fontSize: 12,
    marginTop: 4,
  },
});

export default styles;