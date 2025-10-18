import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Screen = 'splash' | 'auth' | 'home' | 'diary' | 'profile';
type Mood = 'great' | 'good' | 'okay' | 'sad' | 'stressed';

interface DiaryEntry {
  id: string;
  date: string;
  mood: Mood;
  note: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userName, setUserName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([
    { id: '1', date: '2025-10-15', mood: 'good', note: 'Хороший день, много гуляла' },
    { id: '2', date: '2025-10-16', mood: 'okay', note: 'Обычный рабочий день' },
  ]);
  const [newNote, setNewNote] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood>('good');

  setTimeout(() => {
    if (currentScreen === 'splash') {
      setCurrentScreen('auth');
    }
  }, 2500);

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
      };
      setDiaryEntries([newEntry, ...diaryEntries]);
      setNewNote('');
      setSelectedMood('good');
    }
  };

  const moodEmojis: Record<Mood, string> = {
    great: '😊',
    good: '🙂',
    okay: '😐',
    sad: '😢',
    stressed: '😰',
  };

  const moodColors: Record<Mood, string> = {
    great: 'bg-green-100 border-green-300',
    good: 'bg-blue-100 border-blue-300',
    okay: 'bg-yellow-100 border-yellow-300',
    sad: 'bg-purple-100 border-purple-300',
    stressed: 'bg-red-100 border-red-300',
  };

  if (currentScreen === 'splash') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center animate-pulse-soft">
            <Icon name="Heart" size={48} className="text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">Спокойствие</h1>
          <p className="text-muted-foreground">Ваш помощник психологического здоровья</p>
        </div>
      </div>
    );
  }

  if (currentScreen === 'auth') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 p-4">
        <Card className="w-full max-w-md animate-fade-in shadow-xl">
          <CardHeader className="text-center space-y-2 pb-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Icon name="Sparkles" size={32} className="text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">
              {isLogin ? 'С возвращением' : 'Добро пожаловать'}
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              {isLogin ? 'Войдите в свой аккаунт' : 'Создайте свой аккаунт'}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Ваше имя"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Input type="email" placeholder="Email" className="h-12" />
              </div>
              <div className="space-y-2">
                <Input type="password" placeholder="Пароль" className="h-12" />
              </div>
              <Button type="submit" className="w-full h-12 text-base" size="lg">
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </Button>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10">
      {currentScreen === 'home' && (
        <div className="max-w-md mx-auto p-4 space-y-6 animate-fade-in">
          <div className="pt-6 pb-4">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Привет, {userName || 'друг'}! 👋
            </h1>
            <p className="text-muted-foreground">Как твоё настроение сегодня?</p>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {(Object.keys(moodEmojis) as Mood[]).map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`p-4 rounded-2xl text-3xl transition-all hover:scale-110 ${
                  selectedMood === mood
                    ? 'bg-primary/20 ring-2 ring-primary scale-105'
                    : 'bg-card hover:bg-muted'
                }`}
              >
                {moodEmojis[mood]}
              </button>
            ))}
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BookOpen" size={24} className="text-primary" />
                Быстрые действия
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-14 text-base"
                onClick={() => setCurrentScreen('diary')}
              >
                <Icon name="PenLine" size={20} className="mr-3" />
                Записать мысли
              </Button>
              <Button variant="outline" className="w-full justify-start h-14 text-base">
                <Icon name="Headphones" size={20} className="mr-3" />
                Медитация
              </Button>
              <Button variant="outline" className="w-full justify-start h-14 text-base">
                <Icon name="MessageCircle" size={20} className="mr-3" />
                Чат с поддержкой
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="text-base">Ваш прогресс</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Записей в дневнике</span>
                  <span className="font-semibold">{diaryEntries.length}/30</span>
                </div>
                <Progress value={(diaryEntries.length / 30) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Дней практики</span>
                  <span className="font-semibold">7/30</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentScreen === 'diary' && (
        <div className="max-w-md mx-auto p-4 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between pt-6 pb-4">
            <button onClick={() => setCurrentScreen('home')} className="text-primary">
              <Icon name="ChevronLeft" size={28} />
            </button>
            <h1 className="text-2xl font-bold">Дневник настроения</h1>
            <div className="w-7" />
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Новая запись</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between gap-2">
                {(Object.keys(moodEmojis) as Mood[]).map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`flex-1 p-3 rounded-xl text-2xl transition-all hover:scale-105 ${
                      selectedMood === mood
                        ? 'bg-primary/20 ring-2 ring-primary scale-105'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {moodEmojis[mood]}
                  </button>
                ))}
              </div>
              <Textarea
                placeholder="Что у вас на душе?..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <Button onClick={addDiaryEntry} className="w-full h-12">
                <Icon name="Plus" size={20} className="mr-2" />
                Сохранить запись
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold px-1">Мои записи</h2>
            {diaryEntries.map((entry) => (
              <Card
                key={entry.id}
                className={`shadow-md transition-all hover:shadow-lg ${moodColors[entry.mood]} border-2`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{moodEmojis[entry.mood]}</div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">
                        {new Date(entry.date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                        })}
                      </p>
                      <p className="text-foreground font-serif">{entry.note}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentScreen === 'profile' && (
        <div className="max-w-md mx-auto p-4 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between pt-6 pb-4">
            <button onClick={() => setCurrentScreen('home')} className="text-primary">
              <Icon name="ChevronLeft" size={28} />
            </button>
            <h1 className="text-2xl font-bold">Профиль</h1>
            <div className="w-7" />
          </div>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl font-bold text-white">
                  {(userName || 'У')[0].toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{userName || 'Пользователь'}</h2>
                  <p className="text-muted-foreground">user@example.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-primary/10 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{diaryEntries.length}</div>
                  <div className="text-xs text-muted-foreground mt-1">Записей</div>
                </div>
                <div className="p-4 bg-secondary/20 rounded-xl">
                  <div className="text-2xl font-bold text-foreground">7</div>
                  <div className="text-xs text-muted-foreground mt-1">Дней</div>
                </div>
                <div className="p-4 bg-accent/30 rounded-xl">
                  <div className="text-2xl font-bold text-foreground">85%</div>
                  <div className="text-xs text-muted-foreground mt-1">Прогресс</div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="font-semibold text-sm">Достижения</h3>
                <div className="flex gap-2">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                    🏆
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                    ⭐
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                    🎯
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl opacity-40">
                    💎
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-4 space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Settings" size={20} className="mr-3" />
                Настройки
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Bell" size={20} className="mr-3" />
                Уведомления
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="HelpCircle" size={20} className="mr-3" />
                Помощь
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                <Icon name="LogOut" size={20} className="mr-3" />
                Выйти
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-around items-center">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'home' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon name="Home" size={24} />
            <span className="text-xs font-medium">Главная</span>
          </button>
          <button
            onClick={() => setCurrentScreen('diary')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'diary' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon name="BookOpen" size={24} />
            <span className="text-xs font-medium">Дневник</span>
          </button>
          <button
            onClick={() => setCurrentScreen('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'profile' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon name="User" size={24} />
            <span className="text-xs font-medium">Профиль</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
