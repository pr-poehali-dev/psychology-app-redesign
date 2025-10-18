import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type Screen = 'splash' | 'auth' | 'home' | 'diary' | 'profile' | 'meditation';
type Mood = 'great' | 'good' | 'okay' | 'sad' | 'stressed';

interface DiaryEntry {
  id: string;
  date: string;
  mood: Mood;
  note: string;
  tags: string[];
  gratitude?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface Habit {
  id: string;
  name: string;
  icon: string;
  streak: number;
  completedToday: boolean;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userName, setUserName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([
    { id: '1', date: '2025-10-15', mood: 'good', note: 'Хороший день, много гуляла в парке. Встретила старую подругу.', tags: ['прогулка', 'друзья'], gratitude: 'Благодарна за солнечную погоду' },
    { id: '2', date: '2025-10-16', mood: 'okay', note: 'Обычный рабочий день, немного устала', tags: ['работа'] },
    { id: '3', date: '2025-10-17', mood: 'great', note: 'Отличный день! Закончила важный проект', tags: ['работа', 'успех'], gratitude: 'Благодарна за поддержку команды' },
  ]);
  const [newNote, setNewNote] = useState('');
  const [newGratitude, setNewGratitude] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood>('good');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Медитация', icon: 'Brain', streak: 5, completedToday: true },
    { id: '2', name: 'Дневник', icon: 'PenLine', streak: 3, completedToday: false },
    { id: '3', name: 'Благодарность', icon: 'Heart', streak: 7, completedToday: true },
    { id: '4', name: 'Прогулка', icon: 'Footprints', streak: 2, completedToday: false },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', title: 'Первая запись', description: 'Создайте первую запись в дневнике', icon: '📝', unlocked: true, progress: 1, maxProgress: 1 },
    { id: '2', title: 'Неделя практики', description: '7 дней подряд записей', icon: '🔥', unlocked: true, progress: 7, maxProgress: 7 },
    { id: '3', title: 'Мастер благодарности', description: '10 записей с благодарностью', icon: '💖', unlocked: false, progress: 2, maxProgress: 10 },
    { id: '4', title: 'Медитатор', description: '5 медитаций', icon: '🧘', unlocked: false, progress: 3, maxProgress: 5 },
    { id: '5', title: 'Исследователь эмоций', description: 'Отметьте все виды настроения', icon: '🎭', unlocked: false, progress: 3, maxProgress: 5 },
    { id: '6', title: 'Месяц роста', description: '30 дней практики', icon: '🏆', unlocked: false, progress: 7, maxProgress: 30 },
  ]);

  const availableTags = ['работа', 'друзья', 'семья', 'хобби', 'спорт', 'учёба', 'здоровье', 'успех', 'отдых', 'природа', 'творчество'];

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => setCurrentScreen('auth'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (breathingActive) {
      const phases = [
        { phase: 'inhale' as const, duration: 4000 },
        { phase: 'hold' as const, duration: 4000 },
        { phase: 'exhale' as const, duration: 6000 },
      ];
      let currentPhaseIndex = 0;

      const cycleBreathing = () => {
        setBreathPhase(phases[currentPhaseIndex].phase);
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
      };

      const interval = setInterval(cycleBreathing, 4000);
      return () => clearInterval(interval);
    }
  }, [breathingActive]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setCurrentScreen('home');
    }
  };

  const addDiaryEntry = () => {
    if (newNote.trim()) {
      const newEntry: DiaryEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        mood: selectedMood,
        note: newNote,
        tags: selectedTags,
        gratitude: newGratitude || undefined,
      };
      setDiaryEntries([newEntry, ...diaryEntries]);
      setNewNote('');
      setNewGratitude('');
      setSelectedMood('good');
      setSelectedTags([]);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleHabit = (habitId: string) => {
    setHabits(prev =>
      prev.map(h =>
        h.id === habitId
          ? { ...h, completedToday: !h.completedToday, streak: h.completedToday ? h.streak : h.streak + 1 }
          : h
      )
    );
  };

  const moodEmojis: Record<Mood, string> = {
    great: '😊',
    good: '🙂',
    okay: '😐',
    sad: '😢',
    stressed: '😰',
  };

  const moodLabels: Record<Mood, string> = {
    great: 'Отлично',
    good: 'Хорошо',
    okay: 'Нормально',
    sad: 'Грустно',
    stressed: 'Тревожно',
  };

  const moodColors: Record<Mood, string> = {
    great: 'bg-green-100 border-green-300 text-green-800',
    good: 'bg-blue-100 border-blue-300 text-blue-800',
    okay: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    sad: 'bg-purple-100 border-purple-300 text-purple-800',
    stressed: 'bg-red-100 border-red-300 text-red-800',
  };

  const getMoodStats = () => {
    const moodCounts: Record<Mood, number> = {
      great: 0,
      good: 0,
      okay: 0,
      sad: 0,
      stressed: 0,
    };
    diaryEntries.forEach(entry => {
      moodCounts[entry.mood]++;
    });
    return moodCounts;
  };

  const moodStats = getMoodStats();
  const totalEntries = diaryEntries.length;

  if (currentScreen === 'splash') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse-soft"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-accent rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="text-center animate-scale-in relative z-10">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center animate-pulse-soft shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
            <Icon name="Heart" size={56} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-3">
            Спокойствие
          </h1>
          <p className="text-lg text-muted-foreground mb-2">Ваш помощник психологического здоровья</p>
          <div className="flex items-center justify-center gap-1 mt-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'auth') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-48 h-48 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <Card className="w-full max-w-md animate-fade-in shadow-2xl border-0 backdrop-blur-sm bg-card/95 relative z-10">
          <CardHeader className="text-center space-y-2 pb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 shadow-lg transform hover:scale-110 transition-transform duration-300">
              <Icon name="Sparkles" size={36} className="text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {isLogin ? 'С возвращением' : 'Добро пожаловать'}
            </CardTitle>
            <p className="text-muted-foreground">
              {isLogin ? 'Войдите в свой аккаунт' : 'Создайте свой аккаунт для начала практики'}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Имя</label>
                <Input
                  placeholder="Ваше имя"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="h-12 border-2 focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input type="email" placeholder="example@mail.com" className="h-12 border-2 focus:border-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Пароль</label>
                <Input type="password" placeholder="••••••••" className="h-12 border-2 focus:border-primary transition-all" />
              </div>
              <Button type="submit" className="w-full h-12 text-base shadow-lg hover:shadow-xl transition-all hover:scale-105" size="lg">
                {isLogin ? 'Войти' : 'Начать практику'}
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentScreen === 'meditation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10 pb-20">
        <div className="max-w-md mx-auto p-4 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between pt-6 pb-4">
            <button onClick={() => setCurrentScreen('home')} className="text-primary hover:scale-110 transition-transform">
              <Icon name="ChevronLeft" size={28} />
            </button>
            <h1 className="text-2xl font-bold">Медитация</h1>
            <div className="w-7" />
          </div>

          <Card className="shadow-xl border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Wind" size={24} className="text-primary" />
                Дыхательная практика
              </CardTitle>
              <CardDescription>Практика 4-4-6: вдох-задержка-выдох</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center py-12 relative">
                <div
                  className={`absolute w-32 h-32 rounded-full transition-all duration-[4000ms] ${
                    breathingActive && breathPhase === 'inhale' ? 'scale-150 bg-primary/30' : 'scale-100 bg-primary/10'
                  } ${breathingActive && breathPhase === 'hold' ? 'scale-150 bg-secondary/30' : ''} ${
                    breathingActive && breathPhase === 'exhale' ? 'scale-75 bg-accent/30' : ''
                  }`}
                ></div>
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-2">
                    {breathPhase === 'inhale' && '🌬️'}
                    {breathPhase === 'hold' && '⏸️'}
                    {breathPhase === 'exhale' && '🍃'}
                  </div>
                  <p className="text-lg font-semibold">
                    {breathPhase === 'inhale' && 'Вдох'}
                    {breathPhase === 'hold' && 'Задержка'}
                    {breathPhase === 'exhale' && 'Выдох'}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setBreathingActive(!breathingActive)}
                className="w-full h-14 text-lg shadow-lg"
                variant={breathingActive ? 'outline' : 'default'}
              >
                {breathingActive ? 'Остановить' : 'Начать практику'}
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer border-2 border-primary/20">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl mb-2">🧘‍♀️</div>
                <h3 className="font-semibold">Медитация</h3>
                <p className="text-sm text-muted-foreground">5 мин</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer border-2 border-secondary/20">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl mb-2">🎵</div>
                <h3 className="font-semibold">Звуки природы</h3>
                <p className="text-sm text-muted-foreground">10 мин</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer border-2 border-accent/30">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl mb-2">✨</div>
                <h3 className="font-semibold">Визуализация</h3>
                <p className="text-sm text-muted-foreground">7 мин</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer border-2 border-primary/10">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl mb-2">💤</div>
                <h3 className="font-semibold">Для сна</h3>
                <p className="text-sm text-muted-foreground">15 мин</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10 pb-20">
      {currentScreen === 'home' && (
        <div className="max-w-md mx-auto p-4 space-y-6 animate-fade-in">
          <div className="pt-6 pb-4">
            <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Привет, {userName || 'друг'}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">Как твоё настроение сегодня?</p>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {(Object.keys(moodEmojis) as Mood[]).map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`p-4 rounded-2xl text-3xl transition-all hover:scale-110 shadow-md ${
                  selectedMood === mood
                    ? 'bg-primary/20 ring-2 ring-primary scale-105 shadow-lg'
                    : 'bg-card hover:bg-muted hover:shadow-lg'
                }`}
                title={moodLabels[mood]}
              >
                {moodEmojis[mood]}
              </button>
            ))}
          </div>

          <Card className="shadow-xl border-2 border-primary/20 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Sparkles" size={24} className="text-primary" />
                Ежедневные практики
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all hover:scale-102 cursor-pointer border-2 ${
                    habit.completedToday ? 'bg-primary/10 border-primary/30' : 'bg-muted/50 border-transparent'
                  }`}
                  onClick={() => toggleHabit(habit.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${habit.completedToday ? 'bg-primary text-white' : 'bg-muted'}`}>
                      <Icon name={habit.icon as any} size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">{habit.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Icon name="Flame" size={12} className="text-orange-500" />
                        {habit.streak} дней
                      </p>
                    </div>
                  </div>
                  {habit.completedToday && (
                    <Icon name="CheckCircle2" size={24} className="text-primary" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-xl border-2 border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BookOpen" size={24} className="text-secondary" />
                Быстрые действия
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-14 text-base border-2 hover:border-primary hover:bg-primary/5 transition-all hover:scale-102"
                onClick={() => setCurrentScreen('diary')}
              >
                <Icon name="PenLine" size={20} className="mr-3 text-primary" />
                Записать мысли
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-14 text-base border-2 hover:border-secondary hover:bg-secondary/5 transition-all hover:scale-102"
                onClick={() => setCurrentScreen('meditation')}
              >
                <Icon name="Headphones" size={20} className="mr-3 text-secondary" />
                Медитация
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-14 text-base border-2 hover:border-accent hover:bg-accent/5 transition-all hover:scale-102"
              >
                <Icon name="MessageCircle" size={20} className="mr-3 text-accent" />
                Чат с поддержкой
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Ваш прогресс</span>
                <Badge variant="secondary" className="text-sm">
                  День {diaryEntries.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Icon name="BookOpen" size={14} />
                    Записей в дневнике
                  </span>
                  <span className="font-bold text-primary">{diaryEntries.length}/30</span>
                </div>
                <Progress value={(diaryEntries.length / 30) * 100} className="h-3 shadow-inner" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Icon name="Flame" size={14} />
                    Серия практик
                  </span>
                  <span className="font-bold text-secondary">7/30 дней</span>
                </div>
                <Progress value={23} className="h-3 shadow-inner" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Icon name="Trophy" size={14} />
                    Достижения
                  </span>
                  <span className="font-bold text-accent">{achievements.filter(a => a.unlocked).length}/{achievements.length}</span>
                </div>
                <Progress value={(achievements.filter(a => a.unlocked).length / achievements.length) * 100} className="h-3 shadow-inner" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentScreen === 'diary' && (
        <div className="max-w-md mx-auto p-4 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between pt-6 pb-4">
            <button onClick={() => setCurrentScreen('home')} className="text-primary hover:scale-110 transition-transform">
              <Icon name="ChevronLeft" size={28} />
            </button>
            <h1 className="text-2xl font-bold">Дневник настроения</h1>
            <div className="w-7" />
          </div>

          <Tabs defaultValue="write" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12 shadow-md">
              <TabsTrigger value="write" className="text-base">
                <Icon name="PenLine" size={18} className="mr-2" />
                Написать
              </TabsTrigger>
              <TabsTrigger value="history" className="text-base">
                <Icon name="History" size={18} className="mr-2" />
                История
              </TabsTrigger>
            </TabsList>

            <TabsContent value="write" className="space-y-6 mt-6">
              <Card className="shadow-xl border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Icon name="Sparkles" size={20} className="text-primary" />
                    Новая запись
                  </CardTitle>
                  <CardDescription>Запишите свои мысли и чувства</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Моё настроение</label>
                    <div className="flex justify-between gap-2">
                      {(Object.keys(moodEmojis) as Mood[]).map((mood) => (
                        <button
                          key={mood}
                          onClick={() => setSelectedMood(mood)}
                          className={`flex-1 p-3 rounded-xl text-2xl transition-all hover:scale-105 shadow-md ${
                            selectedMood === mood
                              ? 'bg-primary/20 ring-2 ring-primary scale-105 shadow-lg'
                              : 'bg-muted hover:bg-muted/80'
                          }`}
                          title={moodLabels[mood]}
                        >
                          {moodEmojis[mood]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Что происходило?</label>
                    <Textarea
                      placeholder="Расскажите о своём дне, чувствах, мыслях..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="min-h-[140px] resize-none border-2 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                      <Icon name="Heart" size={16} className="text-red-500" />
                      За что благодарны?
                    </label>
                    <Input
                      placeholder="Напишите что-то хорошее из вашего дня..."
                      value={newGratitude}
                      onChange={(e) => setNewGratitude(e.target.value)}
                      className="border-2 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Теги</label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                          className="cursor-pointer hover:scale-105 transition-transform px-3 py-1"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button onClick={addDiaryEntry} className="w-full h-12 shadow-lg hover:shadow-xl transition-all hover:scale-102">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Сохранить запись
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4 mt-6">
              <Card className="shadow-lg border-2 border-primary/10">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Статистика настроения</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(Object.keys(moodEmojis) as Mood[]).map((mood) => {
                      const count = moodStats[mood];
                      const percentage = totalEntries > 0 ? (count / totalEntries) * 100 : 0;
                      return (
                        <div key={mood} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2">
                              <span className="text-xl">{moodEmojis[mood]}</span>
                              <span>{moodLabels[mood]}</span>
                            </span>
                            <span className="font-semibold">{count} раз ({percentage.toFixed(0)}%)</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {diaryEntries.map((entry, index) => (
                <Card
                  key={entry.id}
                  className={`shadow-lg transition-all hover:shadow-xl hover:scale-102 ${moodColors[entry.mood]} border-2 animate-fade-in`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-4xl">{moodEmojis[entry.mood]}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">
                            {new Date(entry.date).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {moodLabels[entry.mood]}
                          </Badge>
                        </div>
                        <p className="text-foreground font-serif leading-relaxed">{entry.note}</p>
                      </div>
                    </div>
                    {entry.gratitude && (
                      <div className="mt-3 p-3 bg-white/50 rounded-lg border border-red-200">
                        <p className="text-sm flex items-start gap-2">
                          <Icon name="Heart" size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="italic">{entry.gratitude}</span>
                        </p>
                      </div>
                    )}
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {entry.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      )}

      {currentScreen === 'profile' && (
        <div className="max-w-md mx-auto p-4 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between pt-6 pb-4">
            <button onClick={() => setCurrentScreen('home')} className="text-primary hover:scale-110 transition-transform">
              <Icon name="ChevronLeft" size={28} />
            </button>
            <h1 className="text-2xl font-bold">Профиль</h1>
            <div className="w-7" />
          </div>

          <Card className="shadow-xl border-2 border-primary/20 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary via-secondary to-accent"></div>
            <CardContent className="pt-0">
              <div className="text-center -mt-14 mb-6">
                <div className="w-28 h-28 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-2xl border-4 border-card">
                  {(userName || 'У')[0].toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold mt-4">{userName || 'Пользователь'}</h2>
                <p className="text-muted-foreground">user@example.com</p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{diaryEntries.length}</p>
                    <p className="text-xs text-muted-foreground">Записей</p>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">7</p>
                    <p className="text-xs text-muted-foreground">Дней серия</p>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">{achievements.filter(a => a.unlocked).length}</p>
                    <p className="text-xs text-muted-foreground">Достижений</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-2 border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Trophy" size={24} className="text-yellow-500" />
                Достижения
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-md'
                      : 'bg-muted/30 border-transparent opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center gap-2">
                        {achievement.title}
                        {achievement.unlocked && <Icon name="CheckCircle2" size={16} className="text-green-600" />}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                          <span>{((achievement.progress / achievement.maxProgress) * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-xl border-2 border-primary/10">
            <CardContent className="p-4 space-y-2">
              <Button variant="outline" className="w-full justify-start h-12 border-2 hover:border-primary transition-all">
                <Icon name="Settings" size={20} className="mr-3" />
                Настройки
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 border-2 hover:border-primary transition-all">
                <Icon name="Bell" size={20} className="mr-3" />
                Уведомления
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 border-2 hover:border-primary transition-all">
                <Icon name="HelpCircle" size={20} className="mr-3" />
                Помощь и поддержка
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 border-2 hover:border-destructive text-destructive transition-all">
                <Icon name="LogOut" size={20} className="mr-3" />
                Выйти из аккаунта
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t-2 border-border shadow-2xl z-50">
        <div className="max-w-md mx-auto px-6 py-3 flex justify-around items-center">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center gap-1.5 transition-all hover:scale-110 ${
              currentScreen === 'home' ? 'text-primary scale-110' : 'text-muted-foreground'
            }`}
          >
            <div className={`p-2 rounded-xl ${currentScreen === 'home' ? 'bg-primary/10' : ''}`}>
              <Icon name="Home" size={22} />
            </div>
            <span className="text-xs font-semibold">Главная</span>
          </button>
          <button
            onClick={() => setCurrentScreen('diary')}
            className={`flex flex-col items-center gap-1.5 transition-all hover:scale-110 ${
              currentScreen === 'diary' ? 'text-primary scale-110' : 'text-muted-foreground'
            }`}
          >
            <div className={`p-2 rounded-xl ${currentScreen === 'diary' ? 'bg-primary/10' : ''}`}>
              <Icon name="BookOpen" size={22} />
            </div>
            <span className="text-xs font-semibold">Дневник</span>
          </button>
          <button
            onClick={() => setCurrentScreen('meditation')}
            className={`flex flex-col items-center gap-1.5 transition-all hover:scale-110 ${
              currentScreen === 'meditation' ? 'text-primary scale-110' : 'text-muted-foreground'
            }`}
          >
            <div className={`p-2 rounded-xl ${currentScreen === 'meditation' ? 'bg-primary/10' : ''}`}>
              <Icon name="Headphones" size={22} />
            </div>
            <span className="text-xs font-semibold">Медитация</span>
          </button>
          <button
            onClick={() => setCurrentScreen('profile')}
            className={`flex flex-col items-center gap-1.5 transition-all hover:scale-110 ${
              currentScreen === 'profile' ? 'text-primary scale-110' : 'text-muted-foreground'
            }`}
          >
            <div className={`p-2 rounded-xl ${currentScreen === 'profile' ? 'bg-primary/10' : ''}`}>
              <Icon name="User" size={22} />
            </div>
            <span className="text-xs font-semibold">Профиль</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
