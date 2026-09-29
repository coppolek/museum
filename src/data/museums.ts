export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  description: string;
  descriptionEn: string;
  descriptionEs: string;
  descriptionFr: string;
  descriptionDe: string;
  imageUrl: string;
  room: string;
  likes: number;
  audioGuide: string;
}

export interface Room {
  id: string;
  name: string;
  nameEn: string;
  artworks: Artwork[];
  color: string;
}

export interface Museum {
  id: string;
  name: string;
  nameEn: string;
  city: string;
  country: string;
  description: string;
  descriptionEn: string;
  image: string;
  rooms: Room[];
  visitors: number;
  rating: number;
  nextExhibition: string;
}

export const museums: Museum[] = [
  {
    id: 'louvre',
    name: 'Museo del Louvre',
    nameEn: 'Louvre Museum',
    city: 'Parigi',
    country: 'Francia',
    description: 'Il più grande museo d\'arte al mondo, situato nel cuore di Parigi. Ospita la Gioconda e migliaia di capolavori.',
    descriptionEn: 'The largest art museum in the world, located in the heart of Paris. Home to the Mona Lisa and thousands of masterpieces.',
    image: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800&q=80',
    visitors: 9600000,
    rating: 4.8,
    nextExhibition: 'Vermeer e i Maestri del Secolo d\'Oro - Marzo 2026',
    rooms: [
      {
        id: 'denon',
        name: 'Ala Denon',
        nameEn: 'Denon Wing',
        color: '#8B4513',
        artworks: [
          {
            id: 'mona-lisa',
            title: 'La Gioconda',
            artist: 'Leonardo da Vinci',
            year: '1503-1519',
            description: 'Il ritratto più famoso al mondo, noto per il suo enigmatico sorriso. Dipinto a olio su tavola di pioppo.',
            descriptionEn: 'The most famous portrait in the world, known for its enigmatic smile. Oil painting on poplar panel.',
            descriptionEs: 'El retrato más famoso del mundo, conocido por su enigmática sonrisa. Pintura al óleo sobre tabla de álamo.',
            descriptionFr: 'Le portrait le plus célèbre au monde, connu pour son sourire énigmatique. Peinture à l\'huile sur panneau de peuplier.',
            descriptionDe: 'Das berühmteste Porträt der Welt, bekannt für sein rätselhaftes Lächeln. Ölgemälde auf Pappelholz.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/400px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
            room: 'Sala des States',
            likes: 45230,
            audioGuide: 'Benvenuti davanti alla Gioconda...'
          },
          {
            id: 'winged-victory',
            title: 'Venere di Milo',
            artist: 'Scultore greco sconosciuto',
            year: '130-100 a.C.',
            description: 'Statua di marmo che rappresenta la dea greca Afrodite. Celebre per le braccia mancanti.',
            descriptionEn: 'Marble statue representing the Greek goddess Aphrodite. Famous for its missing arms.',
            descriptionEs: 'Estatua de mármol que representa a la diosa griega Afrodita. Famosa por sus brazos faltantes.',
            descriptionFr: 'Statue de marbre représentant la déesse grecque Aphrodite. Célèbre pour ses bras manquants.',
            descriptionDe: 'Marmorstatue, die die griechische Göttin Aphrodite darstellt. Berühmt für ihre fehlenden Arme.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Venus_de_Milo_Louvre_MaMR399_n4.jpg/400px-Venus_de_Milo_Louvre_MaMR399_n4.jpg',
            room: 'Sala della Venere',
            likes: 28100,
            audioGuide: 'Osservate la Venere di Milo...'
          },
          {
            id: 'wedding-cana',
            title: 'Le Nozze di Cana',
            artist: 'Paolo Veronese',
            year: '1563',
            description: 'Il più grande dipinto del Louvre, raffigura il miracolo di Gesù alle nozze di Cana.',
            descriptionEn: 'The largest painting in the Louvre, depicting Jesus\' miracle at the Wedding at Cana.',
            descriptionEs: 'La pintura más grande del Louvre, que representa el milagro de Jesús en las bodas de Caná.',
            descriptionFr: 'Le plus grand tableau du Louvre, représentant le miracle de Jésus aux noces de Cana.',
            descriptionDe: 'Das größte Gemälde im Louvre, das Jesu Wunder bei der Hochzeit zu Kana darstellt.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Paolo_Veronese_008.jpg/800px-Paolo_Veronese_008.jpg',
            room: 'Sala Veronese',
            likes: 19800,
            audioGuide: 'Ammirate Le Nozze di Cana...'
          }
        ]
      },
      {
        id: 'sully',
        name: 'Ala Sully',
        nameEn: 'Sully Wing',
        color: '#2F4F4F',
        artworks: [
          {
            id: 'liberty-leading',
            title: 'La Libertà che guida il popolo',
            artist: 'Eugène Delacroix',
            year: '1830',
            description: 'Celebre dipinto che celebra la Rivoluzione di Luglio francese. La Libertà guida il popolo sulle barricate.',
            descriptionEn: 'Famous painting celebrating the French July Revolution. Liberty leads the people over the barricades.',
            descriptionEs: 'Famosa pintura que celebra la Revolución de Julio francesa. La Libertad guía al pueblo.',
            descriptionFr: 'Célèbre tableau célébrant la Révolution de Juillet française. La Liberté guidant le peuple.',
            descriptionDe: 'Berühmtes Gemälde, das die französische Julirevolution feiert. Die Freiheit führt das Volk.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg/600px-Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg',
            room: 'Sala Mollien',
            likes: 32500,
            audioGuide: 'Davanti a voi La Libertà che guida il popolo...'
          },
          {
            id: 'psyche-revived',
            title: 'Amore e Psiche',
            artist: 'Antonio Canova',
            year: '1787-1793',
            description: 'Capolavoro neoclassico in marmo che rappresenta il momento in cui Amore rianima Psiche con un bacio.',
            descriptionEn: 'Neoclassical marble masterpiece representing the moment when Cupid revives Psyche with a kiss.',
            descriptionEs: 'Obra maestra neoclásica en mármol que representa el momento en que Cupido revive a Psique con un beso.',
            descriptionFr: 'Chef-d\'œuvre néoclassique en marbre représentant le moment où Cupidon ranime Psyché d\'un baiser.',
            descriptionDe: 'Neoklassizistisches Marmor-Meisterwerk, das den Moment darstellt, in dem Amor Psyche mit einem Kuss wiederbelebt.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Cupid_and_Psyche_Louvre_MR1777_n01.jpg/400px-Cupid_and_Psyche_Louvre_MR1777_n01.jpg',
            room: 'Galleria di Psiche',
            likes: 37800,
            audioGuide: 'Osservate Amore e Psiche di Canova...'
          }
        ]
      }
    ]
  },
  {
    id: 'uffizi',
    name: 'Galleria degli Uffizi',
    nameEn: 'Uffizi Gallery',
    city: 'Firenze',
    country: 'Italia',
    description: 'Uno dei musei più antichi e famosi al mondo, custodisce la più grande collezione di pittura rinascimentale.',
    descriptionEn: 'One of the oldest and most famous museums in the world, housing the largest collection of Renaissance painting.',
    image: 'https://images.unsplash.com/photo-1541370976299-4d24ebbc42fe?w=800&q=80',
    visitors: 4200000,
    rating: 4.9,
    nextExhibition: 'Caravaggio e i Caravaggeschi - Aprile 2026',
    rooms: [
      {
        id: 'rinascimento',
        name: 'Sala del Rinascimento',
        nameEn: 'Renaissance Hall',
        color: '#DAA520',
        artworks: [
          {
            id: 'birth-venus',
            title: 'La Nascita di Venere',
            artist: 'Sandro Botticelli',
            year: '1485',
            description: 'Celebre dipinto che raffigura la dea Venere che emerge dal mare come una conchiglia.',
            descriptionEn: 'Famous painting depicting the goddess Venus emerging from the sea as a shell.',
            descriptionEs: 'Famosa pintura que representa a la diosa Venus emergiendo del mar como una concha.',
            descriptionFr: 'Célèbre tableau représentant la déesse Vénus émergeant de la mer comme une coquille.',
            descriptionDe: 'Berühmtes Gemälde, das die Göttin Venus darstellt, die als Muschel aus dem Meer auftaucht.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/800px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
            room: 'Sala 10-14',
            likes: 41200,
            audioGuide: 'Benvenuti davanti alla Nascita di Venere...'
          },
          {
            id: 'primavera',
            title: 'Primavera',
            artist: 'Sandro Botticelli',
            year: '1482',
            description: 'Grande dipinto allegorico che rappresenta un giardino mitologico con figure della mitologia classica.',
            descriptionEn: 'Large allegorical painting representing a mythological garden with figures from classical mythology.',
            descriptionEs: 'Gran pintura alegórica que representa un jardín mitológico con figuras de la mitología clásica.',
            descriptionFr: 'Grande peinture allégorique représentant un jardin mythologique avec des figures de la mythologie classique.',
            descriptionDe: 'Großes allegorisches Gemälde, das einen mythologischen Garten mit Figuren aus der klassischen Mythologie darstellt.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Botticelli-primavera.jpg/600px-Botticelli-primavera.jpg',
            room: 'Sala 10-14',
            likes: 35600,
            audioGuide: 'Ammirate la Primavera di Botticelli...'
          },
          {
            id: 'annunciation',
            title: 'Annunciazione',
            artist: 'Leonardo da Vinci',
            year: '1472-1476',
            description: 'Una delle prime opere di Leonardo, mostra l\'Arcangelo Gabriele che annuncia a Maria la nascita di Gesù.',
            descriptionEn: 'One of Leonardo\'s earliest works, showing the Archangel Gabriel announcing to Mary the birth of Jesus.',
            descriptionEs: 'Una de las primeras obras de Leonardo, muestra al Arcángel Gabriel anunciando a María el nacimiento de Jesús.',
            descriptionFr: 'L\'une des premières œuvres de Léonard, montrant l\'Archange Gabriel annonçant à Marie la naissance de Jésus.',
            descriptionDe: 'Eines von Leonardos frühesten Werken, das den Erzengel Gabriel zeigt, der Maria die Geburt Jesu ankündigt.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Leonardo_da_Vinci_-_Annunciation_-_WGA12686.jpg/800px-Leonardo_da_Vinci_-_Annunciation_-_WGA12686.jpg',
            room: 'Sala 35',
            likes: 22400,
            audioGuide: 'Osservate l\'Annunciazione del giovane Leonardo...'
          }
        ]
      }
    ]
  },
  {
    id: 'metropolitan',
    name: 'Metropolitan Museum of Art',
    nameEn: 'Metropolitan Museum of Art',
    city: 'New York',
    country: 'USA',
    description: 'Il più grande museo d\'arte degli Stati Uniti, con oltre 2 milioni di opere provenienti da tutto il mondo.',
    descriptionEn: 'The largest art museum in the United States, with over 2 million works from around the world.',
    image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=800&q=80',
    visitors: 7360000,
    rating: 4.7,
    nextExhibition: 'Arte Giapponese del Periodo Edo - Maggio 2026',
    rooms: [
      {
        id: 'european',
        name: 'Pittura Europea',
        nameEn: 'European Paintings',
        color: '#4B0082',
        artworks: [
          {
            id: 'self-portrait',
            title: 'Autoritratto con Paglia',
            artist: 'Vincent van Gogh',
            year: '1887',
            description: 'Uno dei numerosi autoritratti di Van Gogh, realizzato con la tecnica pointilliste.',
            descriptionEn: 'One of Van Gogh\'s many self-portraits, created with the pointillist technique.',
            descriptionEs: 'Uno de los numerosos autorretratos de Van Gogh, creado con la técnica puntillista.',
            descriptionFr: 'L\'un des nombreux autoportraits de Van Gogh, réalisé avec la technique pointilliste.',
            descriptionDe: 'Eines von Van Goghs zahlreichen Selbstporträts, erstellt mit der pointillistischen Technik.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/400px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg',
            room: 'Sala 81',
            likes: 29800,
            audioGuide: 'Davanti a voi un autoritratto di Van Gogh...'
          },
          {
            id: 'water-lilies',
            title: 'Ninfee',
            artist: 'Claude Monet',
            year: '1906',
            description: 'Parte della celebre serie delle Ninfee, che cattura la luce e il riflesso dell\'acqua nel giardino di Monet.',
            descriptionEn: 'Part of the famous Water Lilies series, capturing light and water reflections in Monet\'s garden.',
            descriptionEs: 'Parte de la famosa serie de Nenúfares, que captura la luz y los reflejos del agua en el jardín de Monet.',
            descriptionFr: 'Partie de la célèbre série des Nymphéas, capturant la lumière et les reflets de l\'eau dans le jardin de Monet.',
            descriptionDe: 'Teil der berühmten Seerosen-Serie, die Licht und Wasserreflexionen in Monets Garten einfängt.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Monet_Water_Lilies_1916.jpg/800px-Monet_Water_Lilies_1916.jpg',
            room: 'Sala 81',
            likes: 33200,
            audioGuide: 'Immergetevi nelle Ninfee di Monet...'
          }
        ]
      }
    ]
  },
  {
    id: 'prado',
    name: 'Museo del Prado',
    nameEn: 'Prado Museum',
    city: 'Madrid',
    country: 'Spagna',
    description: 'Il principale museo d\'arte spagnola, con capolavori di Velázquez, Goya e El Greco.',
    descriptionEn: 'The main Spanish art museum, with masterpieces by Velázquez, Goya, and El Greco.',
    image: 'https://images.unsplash.com/photo-1559386484-97dfc0e15539?w=800&q=80',
    visitors: 3300000,
    rating: 4.8,
    nextExhibition: 'Goya e l\'Età Moderna - Giugno 2026',
    rooms: [
      {
        id: 'velazquez',
        name: 'Sala Velázquez',
        nameEn: 'Velázquez Hall',
        color: '#800020',
        artworks: [
          {
            id: 'las-meninas',
            title: 'Las Meninas',
            artist: 'Diego Velázquez',
            year: '1656',
            description: 'Capolavoro assoluto della pittura mondiale, raffigura l\'infanta Margherita con le sue damigelle.',
            descriptionEn: 'An absolute masterpiece of world painting, depicting the Infanta Margaret with her maids of honor.',
            descriptionEs: 'Obra maestra absoluta de la pintura mundial, representa a la infanta Margarita con sus damas de honor.',
            descriptionFr: 'Chef-d\'œuvre absolu de la peinture mondiale, représentant l\'infante Marguerite avec ses dames d\'honneur.',
            descriptionDe: 'Absolutes Meisterwerk der Weltmalerei, das die Infantin Margarita mit ihren Hofdamen darstellt.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg/400px-Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg',
            room: 'Sala 12',
            likes: 38900,
            audioGuide: 'Benvenuti davanti a Las Meninas...'
          },
          {
            id: 'third-may',
            title: 'Il 3 Maggio 1808',
            artist: 'Francisco Goya',
            year: '1814',
            description: 'Drammatica rappresentazione dell\'esecuzione dei patrioti spagnoli da parte delle truppe napoleoniche.',
            descriptionEn: 'Dramatic representation of the execution of Spanish patriots by Napoleonic troops.',
            descriptionEs: 'Dramática representación de la ejecución de los patriotas españoles por las tropas napoleónicas.',
            descriptionFr: 'Représentation dramatique de l\'exécution des patriotes espagnols par les troupes napoléoniennes.',
            descriptionDe: 'Dramatische Darstellung der Hinrichtung spanischer Patrioten durch napoleonische Truppen.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_in_Google_Earth.jpg/800px-El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_in_Google_Earth.jpg',
            room: 'Sala 61',
            likes: 31200,
            audioGuide: 'Osservate Il 3 Maggio di Goya...'
          }
        ]
      }
    ]
  },
  {
    id: 'british-museum',
    name: 'British Museum',
    nameEn: 'British Museum',
    city: 'Londra',
    country: 'Regno Unito',
    description: 'Uno dei musei più importanti al mondo, dedicato alla storia e alla cultura dell\'umanità.',
    descriptionEn: 'One of the most important museums in the world, dedicated to human history and culture.',
    image: 'https://images.unsplash.com/photo-1591483018566-65d94a15601e?w=800&q=80',
    visitors: 5820000,
    rating: 4.6,
    nextExhibition: 'Tesori dell\'Antico Egitto - Luglio 2026',
    rooms: [
      {
        id: 'egyptian',
        name: 'Sala Egizia',
        nameEn: 'Egyptian Hall',
        color: '#C19A6B',
        artworks: [
          {
            id: 'rosetta-stone',
            title: 'Stele di Rosetta',
            artist: 'Sconosciuto',
            year: '196 a.C.',
            description: 'La chiave per decifrare i geroglifici egizi, con lo stesso testo in tre scritture diverse.',
            descriptionEn: 'The key to deciphering Egyptian hieroglyphs, with the same text in three different scripts.',
            descriptionEs: 'La clave para descifrar los jeroglíficos egipcios, con el mismo texto en tres escrituras diferentes.',
            descriptionFr: 'La clé pour déchiffrer les hiéroglyphes égyptiens, avec le même texte en trois écritures différentes.',
            descriptionDe: 'Der Schlüssel zur Entzifferung ägyptischer Hieroglyphen, mit demselben Text in drei verschiedenen Schriften.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rosetta_Stone.JPG/400px-Rosetta_Stone.JPG',
            room: 'Sala 4',
            likes: 26700,
            audioGuide: 'Davanti a voi la Stele di Rosetta...'
          },
          {
            id: 'elgin-marbles',
            title: 'Marmi di Elgin',
            artist: 'Fidia e bottega',
            year: '447-432 a.C.',
            description: 'Sculture del Partenone di Atene, tra i più importanti esempi di scultura greca classica.',
            descriptionEn: 'Sculptures from the Parthenon of Athens, among the most important examples of classical Greek sculpture.',
            descriptionEs: 'Esculturas del Partenón de Atenas, entre los ejemplos más importantes de escultura griega clásica.',
            descriptionFr: 'Sculptures du Parthénon d\'Athènes, parmi les exemples les plus importants de sculpture grecque classique.',
            descriptionDe: 'Skulpturen vom Parthenon von Athen, eines der wichtigsten Beispiele klassischer griechischer Skulptur.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Parthenon_Frieze_British_Museum_5.jpg/800px-Parthenon_Frieze_British_Museum_5.jpg',
            room: 'Sala 18',
            likes: 24300,
            audioGuide: 'Ammirate i Marmi di Elgin...'
          }
        ]
      }
    ]
  }
];

export const translations: Record<string, Record<string, string>> = {
  it: {
    home: 'Home',
    museums: 'Musei',
    favorites: 'Preferiti',
    analytics: 'Analisi',
    notifications: 'Notifiche',
    settings: 'Impostazioni',
    explore: 'Esplora',
    share: 'Condividi',
    like: 'Mi piace',
    audioGuide: 'Guida Audio',
    map3d: 'Mappa 3D',
    liveTour: 'Tour in Diretta',
    visitors: 'Visitatori',
    nextExhibition: 'Prossima Mostra',
    rooms: 'Sale',
    artworks: 'Opere',
    searchMuseums: 'Cerca musei...',
    myGallery: 'La Mia Galleria',
    noFavorites: 'Nessun preferito ancora',
    addFavorite: 'Aggiungi ai preferiti',
    removeFavorite: 'Rimuovi dai preferiti',
    shareTour: 'Condividi Tour',
    liveChat: 'Chat dal Vivo',
    sendMessage: 'Invia messaggio',
    topArtworks: 'Opere più apprezzate',
    totalVisits: 'Visite totali',
    activeUsers: 'Utenti attivi',
    language: 'Lingua',
    notificationsSettings: 'Impostazioni Notifiche',
    newExhibitions: 'Nuove mostre disponibili',
    tourUpdates: 'Aggiornamenti tour',
    welcome: 'Benvenuto in ArtTour',
    subtitle: 'Esplora i musei più famosi del mondo',
    startTour: 'Inizia il Tour',
    virtualTour: 'Tour Virtuale',
    backToMuseums: 'Torna ai Musei',
    onlineVisitors: 'visitatori online',
    comment: 'Commenta...',
    year: 'Anno',
    artist: 'Artista',
    room: 'Sala',
  },
  en: {
    home: 'Home',
    museums: 'Museums',
    favorites: 'Favorites',
    analytics: 'Analytics',
    notifications: 'Notifications',
    settings: 'Settings',
    explore: 'Explore',
    share: 'Share',
    like: 'Like',
    audioGuide: 'Audio Guide',
    map3d: '3D Map',
    liveTour: 'Live Tour',
    visitors: 'Visitors',
    nextExhibition: 'Next Exhibition',
    rooms: 'Rooms',
    artworks: 'Artworks',
    searchMuseums: 'Search museums...',
    myGallery: 'My Gallery',
    noFavorites: 'No favorites yet',
    addFavorite: 'Add to favorites',
    removeFavorite: 'Remove from favorites',
    shareTour: 'Share Tour',
    liveChat: 'Live Chat',
    sendMessage: 'Send message',
    topArtworks: 'Most liked artworks',
    totalVisits: 'Total visits',
    activeUsers: 'Active users',
    language: 'Language',
    notificationsSettings: 'Notification Settings',
    newExhibitions: 'New exhibitions available',
    tourUpdates: 'Tour updates',
    welcome: 'Welcome to ArtTour',
    subtitle: 'Explore the world\'s most famous museums',
    startTour: 'Start Tour',
    virtualTour: 'Virtual Tour',
    backToMuseums: 'Back to Museums',
    onlineVisitors: 'online visitors',
    comment: 'Comment...',
    year: 'Year',
    artist: 'Artist',
    room: 'Room',
  },
  es: {
    home: 'Inicio',
    museums: 'Museos',
    favorites: 'Favoritos',
    analytics: 'Análisis',
    notifications: 'Notificaciones',
    settings: 'Configuración',
    explore: 'Explorar',
    share: 'Compartir',
    like: 'Me gusta',
    audioGuide: 'Guía de Audio',
    map3d: 'Mapa 3D',
    liveTour: 'Tour en Vivo',
    visitors: 'Visitantes',
    nextExhibition: 'Próxima Exposición',
    rooms: 'Salas',
    artworks: 'Obras',
    searchMuseums: 'Buscar museos...',
    myGallery: 'Mi Galería',
    noFavorites: 'Sin favoritos aún',
    addFavorite: 'Añadir a favoritos',
    removeFavorite: 'Eliminar de favoritos',
    shareTour: 'Compartir Tour',
    liveChat: 'Chat en Vivo',
    sendMessage: 'Enviar mensaje',
    topArtworks: 'Obras más apreciadas',
    totalVisits: 'Visitas totales',
    activeUsers: 'Usuarios activos',
    language: 'Idioma',
    notificationsSettings: 'Configuración de Notificaciones',
    newExhibitions: 'Nuevas exposiciones disponibles',
    tourUpdates: 'Actualizaciones del tour',
    welcome: 'Bienvenido a ArtTour',
    subtitle: 'Explora los museos más famosos del mundo',
    startTour: 'Iniciar Tour',
    virtualTour: 'Tour Virtual',
    backToMuseums: 'Volver a Museos',
    onlineVisitors: 'visitantes en línea',
    comment: 'Comentar...',
    year: 'Año',
    artist: 'Artista',
    room: 'Sala',
  },
  fr: {
    home: 'Accueil',
    museums: 'Musées',
    favorites: 'Favoris',
    analytics: 'Analyses',
    notifications: 'Notifications',
    settings: 'Paramètres',
    explore: 'Explorer',
    share: 'Partager',
    like: 'J\'aime',
    audioGuide: 'Guide Audio',
    map3d: 'Carte 3D',
    liveTour: 'Visite en Direct',
    visitors: 'Visiteurs',
    nextExhibition: 'Prochaine Exposition',
    rooms: 'Salles',
    artworks: 'Œuvres',
    searchMuseums: 'Rechercher des musées...',
    myGallery: 'Ma Galerie',
    noFavorites: 'Pas encore de favoris',
    addFavorite: 'Ajouter aux favoris',
    removeFavorite: 'Retirer des favoris',
    shareTour: 'Partager la Visite',
    liveChat: 'Chat en Direct',
    sendMessage: 'Envoyer un message',
    topArtworks: 'Œuvres les plus appréciées',
    totalVisits: 'Visites totales',
    activeUsers: 'Utilisateurs actifs',
    language: 'Langue',
    notificationsSettings: 'Paramètres de Notification',
    newExhibitions: 'Nouvelles expositions disponibles',
    tourUpdates: 'Mises à jour des visites',
    welcome: 'Bienvenue sur ArtTour',
    subtitle: 'Explorez les musées les plus célèbres du monde',
    startTour: 'Commencer la Visite',
    virtualTour: 'Visite Virtuelle',
    backToMuseums: 'Retour aux Musées',
    onlineVisitors: 'visiteurs en ligne',
    comment: 'Commenter...',
    year: 'Année',
    artist: 'Artiste',
    room: 'Salle',
  },
  de: {
    home: 'Startseite',
    museums: 'Museen',
    favorites: 'Favoriten',
    analytics: 'Analyse',
    notifications: 'Benachrichtigungen',
    settings: 'Einstellungen',
    explore: 'Erkunden',
    share: 'Teilen',
    like: 'Gefällt mir',
    audioGuide: 'Audioführer',
    map3d: '3D-Karte',
    liveTour: 'Live-Tour',
    visitors: 'Besucher',
    nextExhibition: 'Nächste Ausstellung',
    rooms: 'Säle',
    artworks: 'Kunstwerke',
    searchMuseums: 'Museen suchen...',
    myGallery: 'Meine Galerie',
    noFavorites: 'Noch keine Favoriten',
    addFavorite: 'Zu Favoriten hinzufügen',
    removeFavorite: 'Aus Favoriten entfernen',
    shareTour: 'Tour teilen',
    liveChat: 'Live-Chat',
    sendMessage: 'Nachricht senden',
    topArtworks: 'Beliebteste Kunstwerke',
    totalVisits: 'Gesamtbesuche',
    activeUsers: 'Aktive Benutzer',
    language: 'Sprache',
    notificationsSettings: 'Benachrichtigungseinstellungen',
    newExhibitions: 'Neue Ausstellungen verfügbar',
    tourUpdates: 'Tour-Updates',
    welcome: 'Willkommen bei ArtTour',
    subtitle: 'Entdecken Sie die berühmtesten Museen der Welt',
    startTour: 'Tour starten',
    virtualTour: 'Virtuelle Tour',
    backToMuseums: 'Zurück zu Museen',
    onlineVisitors: 'Online-Besucher',
    comment: 'Kommentieren...',
    year: 'Jahr',
    artist: 'Künstler',
    room: 'Saal',
  }
};
