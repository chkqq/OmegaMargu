export const MOCK_STATS = [
  { infoId: 1, info: '9500+', description: 'студентов', sort: 1 },
  { infoId: 2, info: '90000+', description: 'выпускников', sort: 2 },
  { infoId: 3, info: '15', description: 'факультетов и институтов', sort: 3 },
  { infoId: 4, info: '200+', description: 'образовательных программ', sort: 4 },
];

export const MOCK_PROFESSIONS = [
  'маркетолог', 'оператор БПЛА', 'backend-разработчик', 'Data Scientist',
  'разработчик игр и тренажеров', 'SMM-менеджер', 'бренд-менеджер', 'тьютор',
  'врач-педиатр', 'специалист по ИИ', 'семейный психолог',
  'специалист по маркетплейсам', 'бизнес-аналитик', 'frontend-разработчик',
  'детский психолог',
];

export const MOCK_EDU_DIRECTIONS = [
  {
    id: 1,
    title: 'Информационные технологии',
    professions: ['backend-разработчик', 'frontend-разработчик'],
    count: '25+',
    icon: '💻',
  },
  {
    id: 2,
    title: 'Педагогика',
    professions: ['тьютор', 'учитель начальных классов'],
    count: '19+',
    icon: '📚',
  },
  {
    id: 3,
    title: 'Финансы',
    professions: ['бизнес-аналитик', 'специалист по маркетплейсам'],
    count: '25+',
    icon: '📊',
  },
  {
    id: 4,
    title: 'Искусственный интеллект',
    professions: ['специалист по ИИ', 'Data Scientist'],
    count: '10+',
    icon: '🤖',
  },
];

export const MOCK_STORIES = [
  {
    id: 1,
    name: 'Алина',
    description: 'магистратура по маркетингу: почему вернулась к нам после бакалавриата',
    imageUrl: null,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 2,
    name: 'Ильдар',
    description: 'выпускник IT: как устроился в компанию мечты ещё до диплома',
    imageUrl: null,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 3,
    name: 'Маша',
    description: '2 курс дизайна: как нашла стажировку мечты',
    imageUrl: null,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

export const MOCK_PARTNERS = [
  { title: 'Сбербанк', image: null },
  { title: 'Т-Банк', image: null },
  { title: 'Открытие', image: null },
  { title: 'ВТБ', image: null },
  { title: 'Акашево', image: null },
];

export const MOCK_ABOUT_PAGE = {
  title: 'Об университете',
  text: `## Марийский государственный университет

МарГУ — ведущий университет Республики Марий Эл, основанный в 1972 году. За более чем 50 лет работы университет подготовил свыше 90 000 специалистов в самых разных отраслях.

## Наша миссия

Создавать среду, в которой каждый студент может раскрыть свой потенциал, получить востребованную профессию и найти путь к успешной карьере.

## Факультеты и институты

Университет включает 15 факультетов и институтов, охватывающих направления от IT и естественных наук до педагогики, юриспруденции и медицины.`,
};
