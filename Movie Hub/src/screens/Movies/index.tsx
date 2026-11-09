import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const MOVIES_LIST = [
  { 
    id: '1', 
    title: 'Pearl Harbor', 
    category: 'Ação / Drama', 
    rating: 4.7, 
    cover: require('../../../assets/pearl.webp'), 
    synopsis: 'Rafe McCawley e Danny Walker são dois amigos de infância que cresceram juntos treinando como pilotos de caça. Em meio aos desdobramentos da Segunda Guerra Mundial, Rafe se apaixona pela enfermeira Evelyn antes de partir para combater na Europa. Quando ele é dado como morto em ação, Evelyn e Danny encontram conforto um no outro no Havaí. Contudo, o reaparecimento inesperado de Rafe e o devastador ataque aéreo das forças japonesas à base de Pearl Harbor forçam os dois aviadores a colocarem os dilemas pessoais de lado para encarar uma das batalhas mais decisivas e trágicas da história.', 
    youtubeId: 'TcMBFSGVi1c' 
  },
  { 
    id: '2', 
    title: 'Vingadores: Guerra Infinita', 
    category: 'Ação / Aventura', 
    rating: 4.6, 
    cover: require('../../../assets/vingadores.jpg'), 
    synopsis: 'Em uma jornada épica sem precedentes que durou dez anos para ser construída, o tirano alienígena Thanos emerge das sombras com um objetivo estarrecedor: coletar todas as seis Joias do Infinito para redefinir o equilíbrio do universo dizimando metade de todos os seres vivos. Para conter essa ameaça cósmica inimaginável, os Vingadores precisam superar suas divergências passadas e unir forças com os Guardiões da Galáxia, Doutor Estranho e o exército de Wakanda em uma corrida desesperada contra o tempo, onde o custo da vitória pode exigir os maiores sacrifícios já feitos.', 
    youtubeId: '6ZfuNTqbHE8' 
  },
  { 
    id: '3', 
    title: 'Obsessão', 
    category: 'Terror / Suspense', 
    rating: 4.8, 
    cover: require('../../../assets/obssessao.webp'), 
    synopsis: 'Frances é uma jovem ingênua que tenta lidar com o luto da perda recente de sua mãe enquanto busca construir uma vida nova em Nova York. Ao encontrar uma bolsa de mão esquecida em um assento do metrô, ela decide devolvê-la pessoalmente à dona, Greta, uma viúva solitária e elegante apreciadora de música clássica. O que começa como uma amizade reconfortante baseada na solidão mútua rapidamente toma um rumo sinistro quando Frances descobre um segredo perturbador escondido na casa de Greta, desencadeando uma perseguição psicológica sufocante e perigosa.', 
    youtubeId: 'TcMBFSGVi1c'
  },
  { 
    id: '4', 
    title: 'Shrek 3', 
    category: 'Comédia / Fantasia', 
    rating: 4.7, 
    cover: require('../../../assets/shrek.jpg'), 
    synopsis: 'Após o declínio da saúde do Rei Harold, o ogro Shrek é subitamente forçado a assumir os deveres reais ao lado da Princesa Fiona em Tão Tão Distante. Sentindo-se completamente inadequado para a coroa e desejando apenas retornar ao sossego do seu amado pântano, Shrek parte em uma com jornada com o Burro e o Gato de Botas para encontrar o único outro herdeiro legítimo: o jovem e rebelde Arthur, primo de Fiona. Enquanto o grupo tenta convencer o rapaz a assumir o reino, o vingativo Príncipe Encantado articula um golpe de estado recrutando todos os vilões dos contos de fadas para dominar o castelo.', 
    youtubeId: 'TcMBFSGVi1c' 
  },
  { 
    id: '5', 
    title: 'Gigantes de Aço', 
    category: 'Ação / Drama', 
    rating: 4.9, 
    cover: require('../../../assets/gigantes.webp'), 
    synopsis: 'Em um futuro próximo onde o boxe entre atletas humanos foi proibido por ser considerado violento demais, o esporte foi dominado por robôs de combate de alta tecnologia controlados por humanos. Charlie Kenton, um ex-boxeador decadente que vive de construir e apostar em máquinas sucateadas, se vê endividado e sem rumo. Tudo muda quando ele é encarregado de cuidar do seu filho afastado, Max. Juntos, pai e filho encontram no ferro-velho o esqueleto de um antigo robô de treino chamado Atom e decidem restaurá-lo, iniciando uma incrível jornada de superação e reconexão familiar até o campeonato mundial.', 
    youtubeId: 'TcMBFSGVi1c' 
  },
  { 
    id: '6', 
    title: 'Gente Grande 2', 
    category: 'Comédia', 
    rating: 4.8, 
    cover: require('../../../assets/OIP.webp'), 
    synopsis: 'Buscando afastar sua família do ritmo frenético de Los Angeles e proporcionar uma infância mais calma aos filhos, Lenny Feder decide se mudar de volta para a pequena cidade natal onde cresceu. Ele se reencontra com seus melhores amigos de infância em pleno último dia de aula das crianças. No entanto, o plano de ter uma rotina pacífica cai por terra rapidamente quando o grupo enfrenta antigos valentões da escola, policiais excêntricos, um urso invadindo a casa e um confronto com uma fraternidade de universitários arrogantes, transformando o início do verão em um caos hilário.', 
    youtubeId: 'TcMBFSGVi1c' 
  },
  { 
    id: '7', 
    title: 'Diário de uma Paixão', 
    category: 'Romance', 
    rating: 4.9, 
    cover: require('../../../assets/diario.jpg'), 
    synopsis: 'Na década de 1940, na Carolina do Norte, o operário Noah Calhoun e a rica herdeira Allie Hamilton vivem um amor avassalador durante um verão inesquecível. Apesar da paixão intensa, as rigorosas diferenças sociais e a oposição severa dos pais de Allie forçam a separação do casal, distância que se amplia ainda mais com a eclosão da Segunda Guerra Mundial. Anos depois, prestes a se casar com outro homem, Allie reencontra Noah ao ver uma matéria sobre a casa que ele prometera reformar para ela. Toda essa inesquecível história de amor é lida no presente por um idoso para uma paciente com Alzheimer em uma clínica de repouso.', 
    youtubeId: 'TcMBFSGVi1c' 
  },
  { 
    id: '8', 
    title: 'A Odisseia', 
    category: 'Aventura / Ação', 
    rating: 4.9, 
    cover: require('../../../assets/odisseia.jpg'),
    synopsis: 'O poema começa após o fim da Guerra de Troia, quando Odisseu, rei de Ítaca, tenta voltar para casa. Sua jornada é marcada por diversos obstáculos sobrenaturais e humanos.',
    youtubeId: 'TcMBFSGVi1c'
  },
  { 
    id: '9', 
    title: 'As Branquelas', 
    category: 'Comédia', 
    rating: 4.6, 
    cover: require('../../../assets/branquelas.webp'),
    synopsis: 'As Branquelas segue a história de dois agentes do FBI, Kevin e Marcus Copeland, que se disfarçam como duas socialites brancas para proteger duas herdeiras de um plano de sequestro.',
    youtubeId: 'TcMBFSGVi1c'
  },
  { 
    id: '10', 
    title: 'Top Gun: Maverick', 
    category: 'Ação / Drama', 
    rating: 4.8, 
    cover: require('../../../assets/topgun.webp'),
    synopsis: 'Após décadas de serviço, Maverick continua voando ativamente, recusando-se a aceitar promoções que o manteriam em terra, pois prefere seguir pilotando.',
    youtubeId: 'TcMBFSGVi1c'
  },
  { 
    id: '11', 
    title: 'Carros', 
    category: 'Animação', 
    rating: 4.7, 
    cover: require('../../../assets/carros.webp'),
    synopsis: 'Relâmpago McQueen é um estreante talentoso e confiante que sonha em vencer a Copa Pistão e conquistar o patrocínio da Dinoco.',
    youtubeId: 'TcMBFSGVi1c'
  },
  { 
    id: '19', 
    title: 'Carros 3', 
    category: 'Animação', 
    rating: 4.4, 
    cover: require('../../../assets/carros3.webp'),
    synopsis: 'Carros 3 segue a história de Relâmpago McQueen, que, após um grave acidente, precisa demonstrar que ainda é competitivo contra uma nova geração de pilotos tecnologicamente avançados.',
    youtubeId: 'BuvJZGLclAU'
  },
  { 
    id: '12', 
    title: 'Interestelar', 
    category: 'Ficção / Aventura', 
    rating: 4.8, 
    cover: require('../../../assets/interestelar.jpg'),
    synopsis: 'Em um futuro distópico, a Terra enfrenta crises ambientais severas, como a diminuição das reservas naturais, tempestades de poeira e pragas que prejudicam as colheitas, tornando o planeta cada vez mais inabitável.',
    youtubeId: 'TcMBFSGVi1c'
  },
  { 
    id: '13', 
    title: 'Homem de Ferro 3', 
    category: 'Ação', 
    rating: 4.8, 
    cover: require('../../../assets/homemdeferro.jpg'),
    synopsis: 'Após os eventos de Os Vingadores, Tony Stark/Homem de Ferro lida com traumas, insônia e pesadelos relacionados à batalha em Nova York.',
    youtubeId: 'TcMBFSGVi1c'
  },
  { 
    id: '14', 
    title: 'Homem Aranha: Um novo dia', 
    category: 'Ação', 
    rating: 4.7, 
    cover: require('../../../assets/aranha.webp'),
    synopsis: 'Com sua identidade apagada da memória de todos, ele vive de forma anônima em Nova York, equilibrando a rotina universitária com a missão de proteger a cidade como Homem-Aranha.',
    youtubeId: 'PlulyWs1kS4'
  },
  { 
    id: '15', 
    title: 'Vingadores: Ultimato', 
    category: 'Ação / Drama', 
    rating: 4.8, 
    cover: require('../../../assets/ultimato.webp'),
    synopsis: 'Após os eventos devastadores de Vingadores: Guerra Infinita, o universo está em ruínas devido às ações do Titã Louco, Thanos, que eliminou metade de todas as criaturas vivas, incluindo heróis como Homem-Aranha, Doutor Estranho, Star-Lord, Feiticeira Escarlate e Groot.',
    youtubeId: 'LMOqLeoP2yw'
  },
  { 
    id: '16', 
    title: 'Toy Story 5', 
    category: 'Animação', 
    rating: 4.5, 
    cover: require('../../../assets/toystory.jpg'),
    synopsis: 'O filme se passa dois anos após Toy Story 4 e acompanha Bonnie, agora com 8 anos, que descobre um novo passatempo: o tablet Lilypad, capaz de criar mundos virtuais que prendem sua atenção, afastando-a dos brinquedos tradicionais.',
    youtubeId: '-YbiBclEEgo'
  },
  { 
    id: '17', 
    title: 'Invocação Do Mal 4', 
    category: 'Terror', 
    rating: 4.6, 
    cover: require('../../../assets/invocacao.jpg'),
    synopsis: 'Neste quarto capítulo da franquia de terror iniciada em 2013, Ed e Lorraine Warren, interpretados por Patrick Wilson e Vera Farmiga, se veem diante de entidades sobrenaturais que desafiam a experiência do casal de investigadores paranormais.',
    youtubeId: 'n0sq-r0mBXQ'
  },
  { 
    id: '18', 
    title: 'Outra Mamãe', 
    category: 'Terror', 
    rating: 4.5, 
    cover: require('../../../assets/mae.jpg'),
    synopsis: 'A trama gira em torno de Bela, que enfrenta constantes discussões familiares. A situação toma um rumo aterrorizante quando uma criatura manipuladora que se parece exatamente com sua mãe começa a surgir em seu quarto.',
    youtubeId: 'F1WJQbXIIwk'
  },
  { 
    id: '20', 
    title: 'Resident Evil', 
    category: 'Terror', 
    rating: 4.6, 
    cover: require('../../../assets/resident.webp'),
    synopsis: 'Em uma história totalmente inédita, Resident Evil acompanha Bryan (Austin Abrams), um entregador médico que, sem querer, se vê em uma corrida frenética e cheia de ação pela sobrevivência, enquanto uma noite fatídica e horripilante desmorona ao seu redor.',
    youtubeId: 'M-WFfF2ETgk'
  },
  { 
    id: '21', 
    title: 'Demon Slayer: Castelo Infinito', 
    category: 'Ação / Fantasia', 
    rating: 4.6, 
    cover: require('../../../assets/demon.webp'),
    synopsis: 'O filme marca o início da trilogia final que adapta os capítulos finais do mangá "Demon Slayer" de Koyoharu Gotouge Tanjiro, juntamente com os Hashira e seus companheiros Zenitsu e Inosuke, corre para proteger seu líder, mas são lançados por Muzan Kibutsuji em uma descida misteriosa rumo ao Castelo Infinito.',
    youtubeId: '3UiP4GwWNv0'
  }
  
];

export default function Movies() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0F" />
      
      {/* Cabeçalho Customizado */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Filmes</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>🎬</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Filmes Do Catálogo</Text>

      <FlatList
        data={MOVIES_LIST}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('MovieDetails', { id: item.id })}
          >
            <View style={styles.imageContainer}>
              <Image source={item.cover} style={styles.cover} />
              
              {/* Badge de Nota Flutuante */}
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {item.rating}</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.categoryText} numberOfLines={1}>{item.category}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}