import { ImageSourcePropType } from 'react-native';

export type MovieItem = {
  id: string;
  title: string;
  category: string;
  rating: number;
  cover: ImageSourcePropType;
  synopsis: string;
  youtubeId?: string;
  trailerUrl?: string;
};

// 1. Fonte única da verdade para todos os filmes
export const ALL_MOVIES: MovieItem[] = [
  { 
    id: '1', 
    title: 'Pearl Harbor', 
    category: 'Ação / Drama', 
    rating: 4.7, 
    cover: require('../../assets/pearl.webp'), 
    synopsis: 'Rafe McCawley e Danny Walker são dois amigos de infância que cresceram juntos treinando como pilotos de caça em meio aos desdobramentos da Segunda Guerra Mundial.', 
    youtubeId: 'oGYcxjywx0o' 
  },
  { 
    id: '2', 
    title: 'Vingadores: Guerra Infinita', 
    category: 'Ação / Aventura', 
    rating: 4.6, 
    cover: require('../../assets/vingadores.jpg'),
    synopsis: 'Os Vingadores e seus aliados super-heróis devem estar dispostos a sacrificar tudo para tentar derrotar o poderoso Thanos antes que sua campanha de destruição em massa leve à ruína do universo.',
    youtubeId: 'htQch8jDZ4s'
  },
  { 
    id: '3', 
    title: 'Obsessão', 
    category: 'Terror / Drama', 
    rating: 4.8, 
    cover: require('../../assets/obssessao.webp'),
    synopsis: 'O filme segue Bear Bailey, um jovem apaixonado por sua amiga de infância Nikki Freeman, mas incapaz de confessar seus sentimentos. Trabalhando em uma loja de música e discos, Bear encontra um objeto sobrenatural chamado Salgueiro dos Desejos, que promete realizar um desejo de quem o quebrar.',
    youtubeId: 'OYueQyeNgOk'
  },
  { 
    id: '4', 
    title: 'Shrek 3', 
    category: 'Comédia / Fantasia', 
    rating: 4.7, 
    cover: require('../../assets/shrek.jpg'), 
    synopsis: 'O rei Harold falece repentinamente, deixando a sucessão do trono de Tão Tão Distante nas mãos de Shrek e da princesa Fiona.',
    youtubeId: '5KhMx85eaOM'
  },
  {
    id: '5',
    title: 'Gigantes de Aço',
    category: 'Ação / Drama',
    rating: 4.9,
    cover: require('../../assets/gigantes.webp'),
    synopsis: 'Em um futuro próximo onde o boxe humano foi substituído por lutas entre robôs controlados por pessoas, Charlie Kenton, um ex-lutador frustrado, enfrenta dificuldades para sobreviver.',
    youtubeId: 'LwvkjZCMAwQ'
  },
  { 
    id: '6', 
    title: 'Gente Grande 2', 
    category: 'Comédia', 
    rating: 4.8, 
    cover: require('../../assets/OIP.webp'),
    synopsis: 'Lenny Feder decide se mudar com sua família de volta para sua cidade natal para criar os filhos junto aos amigos de infância que o acompanharam durante toda a vida.',
    youtubeId: 'U4IVNvPu134'
  },
  {
    id: '7',
    title: 'Diário de uma Paixão',
    category: 'Romance',
    rating: 4.9,
    cover: require('../../assets/diario.jpg'),
    synopsis: 'Em uma casa de repouso, um idoso lê para uma colega a história de um diário antigo sobre um romance arrebatador da juventude.',
    youtubeId: 'DyfWPxB1pZM'
  },
  { 
    id: '8', 
    title: 'A Odisseia', 
    category: 'Aventura / Ação', 
    rating: 4.9, 
    cover: require('../../assets/odisseia.jpg'),
    synopsis: 'A narrativa épica acompanha a jornada de Odisseu (Ulisses) e seus homens empenhados em retornar para sua terra natal, Ítaca, após o fim da Guerra de Troia.',
    youtubeId: 'v_eHpukGdTM'
  },
  { 
    id: '9', 
    title: 'As Branquelas', 
    category: 'Comédia', 
    rating: 4.6, 
    cover: require('../../assets/branquelas.webp'),
    synopsis: 'Dois agentes do FBI, Kevin e Marcus Copeland, acabam fracassando em uma missão importante e correm o risco de perderem seus empregos.',
    youtubeId: 'aeVkbNka9HM'
  },
  { 
    id: '10', 
    title: 'Top Gun: Maverick', 
    category: 'Ação / Drama', 
    rating: 4.8, 
    cover: require('../../assets/topgun.webp'),
    synopsis: 'Após mais de trinta anos de serviço como um dos principais pilotos da Marinha, Pete "Maverick" Mitchell continua testando os limites como piloto de testes e evitando a promoção que o deixaria no chão.',
    youtubeId: '7aOCYTflp8o'
  },
  { 
    id: '11', 
    title: 'Carros', 
    category: 'Animação', 
    rating: 4.7, 
    cover: require('../../assets/carros.webp'),
    synopsis: 'Relâmpago McQueen, um carro de corrida ambicioso e arrogante, está a caminho da grande final da Copa Pistão quando se perde e vai parar na esquecida cidadezinha de Radiator Springs, na Rota 66.',
    youtubeId: '1I6hpcRIc_c'
  },
  { 
    id: '12', 
    title: 'Interestelar', 
    category: 'Ficção / Aventura', 
    rating: 4.8, 
    cover: require('../../assets/interestelar.jpg'),
    synopsis: 'Com a Terra sofrendo com a escassez de recursos e o colapso ambiental, uma equipe de cientistas e ex-exploradores espaciais é encarregada de atravessar um recém-descoberto buraco de minhoca no espaço.',
    youtubeId: 'i6avfCqKcQo'
  },
  { 
    id: '13', 
    title: 'Homem de Ferro 3', 
    category: 'Ação', 
    rating: 4.8, 
    cover: require('../../assets/homemdeferro.jpg'),
    synopsis: 'Tony Stark lida com graves crises de ansiedade e sequelas psicológicas após os eventos traumáticos de Nova York.',
    youtubeId: 'igfXmU1r_mc'
  },
  { 
    id: '14', 
    title: 'Homem Aranha: Um novo dia', 
    category: 'Ação', 
    rating: 4.7, 
    cover: require('../../assets/aranha.webp'),
    synopsis: 'Com sua identidade apagada da memória de todos, ele vive de forma anônima em Nova York, equilibrando a rotina universitária com a missão de proteger a cidade como Homem-Aranha.',
    youtubeId: 'PlulyWs1kS4'
  }
];

// 2. Mapeamento de IDs para seções específicas
const POPULAR_IDS = ['3', '2', '8', '14'];
const CINEMA_IDS = ['3', '14', '8', '10', '12'];

// 3. Exportações filtradas automaticamente (sem duplicação de dados)
export const POPULAR_MOVIES = ALL_MOVIES.filter((movie) => POPULAR_IDS.includes(movie.id));
export const CINEMA_MOVIES = ALL_MOVIES.filter((movie) => CINEMA_IDS.includes(movie.id));

// 4. Função auxiliar de busca (pesquise sempre diretamente no ALL_MOVIES)
export const searchMovies = (query: string): MovieItem[] => {
  if (!query.trim()) return ALL_MOVIES;
  
  const searchLower = query.toLowerCase();
  return ALL_MOVIES.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchLower) ||
      movie.category.toLowerCase().includes(searchLower)
  );
};