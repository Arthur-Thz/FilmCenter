import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101014',
    paddingHorizontal: 20,
  },
  backButton: {
    paddingVertical: 10,
    marginBottom: 10,
  },
  backText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#E50914',
    marginBottom: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userEmail: {
    fontSize: 14,
    color: '#888888',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1C1C22',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 25,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E50914',
  },
  statLabel: {
    fontSize: 13,
    color: '#AAA',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#333',
  },
  menuContainer: {
    width: '100%',
    backgroundColor: '#1C1C22',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#282830',
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  arrow: {
    color: '#666',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#281416',
    borderRadius: 8,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E50914',
  },
  logoutText: {
    color: '#E50914',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default styles;