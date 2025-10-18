import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Screen = 'welcome' | 'home' | 'sessions' | 'resources' | 'profile';

interface Session {
  id: string;
  title: string;
  date: string;
  mood: string;
  notes: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userName] = useState('Анна');
  const [sessions] = useState<Session[]>([
    { id: '1', title: 'Утренняя медитация', date: '2025-10-18', mood: '😊', notes: 'Отличное начало дня' },
    { id: '2', title: 'Работа со стрессом', date: '2025-10-17', mood: '🙂', notes: 'Узнала новые техники' },
    { id: '3', title: 'Вечерняя практика', date: '2025-10-16', mood: '😌', notes: 'Чувствую спокойствие' },
  ]);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

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

  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden relative">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-md mx-auto min-h-screen flex flex-col relative z-10">
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full space-y-8 animate-fade-in">
              <div className="text-center space-y-4">
                <div className="relative mx-auto w-80 h-80 mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[3rem] transform rotate-6"></div>
                  <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl p-8 flex items-center justify-center">
                    <img 
                      src="https://cdn.poehali.dev/files/98fd46ec-8b11-4d9a-a1a4-24839ca8b328.jpg" 
                      alt="Therapy illustration"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>
                
                <h1 className="text-5xl font-bold text-foreground leading-tight">
                  Ваше пространство
                  <br />
                  <span className="text-primary">спокойствия</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-sm mx-auto">
                  Профессиональная поддержка и инструменты для вашего ментального здоровья
                </p>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={() => setCurrentScreen('home')} 
                  className="w-full h-14 text-lg rounded-2xl shadow-xl"
                >
                  Начать практику
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-14 text-lg rounded-2xl border-2"
                >
                  Узнать больше
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 pb-24">
      {currentScreen === 'home' && (
        <div className="max-w-md mx-auto p-5 space-y-6 animate-fade-in">
          <div className="pt-8 pb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Добро пожаловать</p>
                <h1 className="text-3xl font-bold text-foreground">{userName} 👋</h1>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {userName[0]}
              </div>
            </div>
            <p className="text-muted-foreground">Как вы себя чувствуете сегодня?</p>
          </div>

          <Card className="shadow-xl border-0 rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-primary/80">
            <CardContent className="p-8 text-white">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-primary-foreground/80 text-sm mb-2">Ежедневная практика</p>
                  <h2 className="text-2xl font-bold mb-1">Дыхательная медитация</h2>
                  <p className="text-primary-foreground/90 text-sm">5 минут осознанности</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Icon name="Wind" size={24} />
                </div>
              </div>
              
              <div className="relative h-28 mb-6">
                <div 
                  className={`absolute inset-0 rounded-2xl transition-all duration-[4000ms] ${
                    breathingActive && breathPhase === 'inhale' ? 'scale-100 bg-white/30' : 'scale-75 bg-white/10'
                  } ${breathingActive && breathPhase === 'hold' ? 'scale-100 bg-white/40' : ''} ${
                    breathingActive && breathPhase === 'exhale' ? 'scale-50 bg-white/20' : ''
                  }`}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">
                      {breathPhase === 'inhale' && '🌬️'}
                      {breathPhase === 'hold' && '⏸️'}
                      {breathPhase === 'exhale' && '🍃'}
                    </div>
                    <p className="text-sm font-medium">
                      {breathPhase === 'inhale' && 'Вдох...'}
                      {breathPhase === 'hold' && 'Задержка...'}
                      {breathPhase === 'exhale' && 'Выдох...'}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setBreathingActive(!breathingActive)}
                className="w-full bg-white text-primary hover:bg-white/90 h-12 rounded-xl font-semibold"
              >
                {breathingActive ? 'Остановить' : 'Начать практику'}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Рекомендации</h3>
              <button className="text-sm text-primary font-medium">Все</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-secondary/30 to-secondary/10 p-6 h-32 flex items-center justify-center">
                    <div className="text-5xl group-hover:scale-110 transition-transform">📚</div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-1">Библиотека</h4>
                    <p className="text-xs text-muted-foreground">Статьи и книги</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-accent/30 to-accent/10 p-6 h-32 flex items-center justify-center">
                    <div className="text-5xl group-hover:scale-110 transition-transform">🎧</div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-1">Аудио</h4>
                    <p className="text-xs text-muted-foreground">Медитации</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 h-32 flex items-center justify-center">
                    <div className="text-5xl group-hover:scale-110 transition-transform">✍️</div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-1">Дневник</h4>
                    <p className="text-xs text-muted-foreground">Мысли и чувства</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 h-32 flex items-center justify-center">
                    <div className="text-5xl group-hover:scale-110 transition-transform">🌱</div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-1">Рост</h4>
                    <p className="text-xs text-muted-foreground">Упражнения</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="shadow-lg border-0 rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center justify-between">
                Ваш прогресс
                <Badge className="bg-primary/10 text-primary border-0">7 дней</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Медитации</span>
                  <span className="font-semibold text-primary">12/30</span>
                </div>
                <Progress value={40} className="h-2 bg-primary/10" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Записей в дневнике</span>
                  <span className="font-semibold text-accent">8/20</span>
                </div>
                <Progress value={40} className="h-2 bg-accent/10" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentScreen === 'sessions' && (
        <div className="max-w-md mx-auto p-5 space-y-6 animate-fade-in">
          <div className="pt-8 pb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Мои сессии</h1>
            <p className="text-muted-foreground">История ваших практик и заметки</p>
          </div>

          <Card className="shadow-lg border-0 rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Новая запись</CardTitle>
              <CardDescription>Как прошла ваша практика?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                {['😊', '🙂', '😌', '😐', '😔'].map((emoji, i) => (
                  <button
                    key={i}
                    className="flex-1 p-3 text-2xl rounded-xl bg-muted hover:bg-primary/10 transition-all hover:scale-110"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <Textarea 
                placeholder="Поделитесь своими мыслями..."
                className="resize-none h-24 rounded-xl border-2"
              />
              <Button className="w-full h-12 rounded-xl">
                <Icon name="Plus" size={20} className="mr-2" />
                Сохранить запись
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">История</h3>
            {sessions.map((session) => (
              <Card key={session.id} className="shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{session.mood}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{session.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {new Date(session.date).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                            })}
                          </p>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground">
                          <Icon name="MoreVertical" size={20} />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground font-serif italic">{session.notes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentScreen === 'resources' && (
        <div className="max-w-md mx-auto p-5 space-y-6 animate-fade-in">
          <div className="pt-8 pb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Ресурсы</h1>
            <p className="text-muted-foreground">Материалы для вашего развития</p>
          </div>

          <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-secondary via-secondary/80 to-secondary/60 p-8 text-foreground">
                <div className="text-5xl mb-4">📖</div>
                <h3 className="text-2xl font-bold mb-2">Библиотека знаний</h3>
                <p className="text-sm opacity-90 mb-6">Статьи, книги и рекомендации экспертов</p>
                <Button className="bg-white text-foreground hover:bg-white/90 rounded-xl">
                  Открыть
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Категории</h3>
            
            <Card className="shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center text-3xl">
                    🧘‍♀️
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Медитация и практики</h4>
                    <p className="text-xs text-muted-foreground">12 материалов</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center text-3xl">
                    💭
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Психология и эмоции</h4>
                    <p className="text-xs text-muted-foreground">24 материала</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center text-3xl">
                    ⚡
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Энергия и мотивация</h4>
                    <p className="text-xs text-muted-foreground">18 материалов</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-300 rounded-2xl flex items-center justify-center text-3xl">
                    🌿
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Осознанность</h4>
                    <p className="text-xs text-muted-foreground">15 материалов</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {currentScreen === 'profile' && (
        <div className="max-w-md mx-auto p-5 space-y-6 animate-fade-in">
          <div className="pt-8 pb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Профиль</h1>
            <p className="text-muted-foreground">Ваши настройки и статистика</p>
          </div>

          <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary via-accent to-secondary"></div>
            <CardContent className="pt-0 pb-8">
              <div className="text-center -mt-16 mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center text-5xl font-bold text-white shadow-2xl border-4 border-white">
                  {userName[0]}
                </div>
                <h2 className="text-2xl font-bold mt-4">{userName}</h2>
                <p className="text-muted-foreground text-sm">anna@example.com</p>
              </div>

              <div className="flex justify-around py-4 border-t border-border">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">24</p>
                  <p className="text-xs text-muted-foreground">Сессии</p>
                </div>
                <div className="w-px bg-border"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">12</p>
                  <p className="text-xs text-muted-foreground">Записей</p>
                </div>
                <div className="w-px bg-border"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">7</p>
                  <p className="text-xs text-muted-foreground">Дней подряд</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">Настройки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-all">
                <div className="flex items-center gap-3">
                  <Icon name="User" size={20} className="text-primary" />
                  <span className="font-medium">Личные данные</span>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-all">
                <div className="flex items-center gap-3">
                  <Icon name="Bell" size={20} className="text-accent" />
                  <span className="font-medium">Уведомления</span>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-all">
                <div className="flex items-center gap-3">
                  <Icon name="Shield" size={20} className="text-secondary" />
                  <span className="font-medium">Приватность</span>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-all">
                <div className="flex items-center gap-3">
                  <Icon name="HelpCircle" size={20} className="text-green-500" />
                  <span className="font-medium">Помощь и поддержка</span>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </button>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full h-12 rounded-xl border-2 text-destructive hover:text-destructive">
            <Icon name="LogOut" size={20} className="mr-2" />
            Выйти
          </Button>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t z-50 shadow-2xl">
        <div className="max-w-md mx-auto px-6 py-4 flex justify-around items-center">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentScreen === 'home' ? 'text-primary scale-110' : 'text-muted-foreground'
            }`}
          >
            <div className={`p-2 rounded-2xl ${currentScreen === 'home' ? 'bg-primary/10' : ''}`}>
              <Icon name="Home" size={24} />
            </div>
            <span className="text-xs font-medium">Главная</span>
          </button>
          <button
            onClick={() => setCurrentScreen('sessions')}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentScreen === 'sessions' ? 'text-primary scale-110' : 'text-muted-foreground'
            }`}
          >
            <div className={`p-2 rounded-2xl ${currentScreen === 'sessions' ? 'bg-primary/10' : ''}`}>
              <Icon name="Calendar" size={24} />
            </div>
            <span className="text-xs font-medium">Сессии</span>
          </button>
          <button
            onClick={() => setCurrentScreen('resources')}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentScreen === 'resources' ? 'text-primary scale-110' : 'text-muted-foreground'
            }`}
          >
            <div className={`p-2 rounded-2xl ${currentScreen === 'resources' ? 'bg-primary/10' : ''}`}>
              <Icon name="BookOpen" size={24} />
            </div>
            <span className="text-xs font-medium">Ресурсы</span>
          </button>
          <button
            onClick={() => setCurrentScreen('profile')}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentScreen === 'profile' ? 'text-primary scale-110' : 'text-muted-foreground'
            }`}
          >
            <div className={`p-2 rounded-2xl ${currentScreen === 'profile' ? 'bg-primary/10' : ''}`}>
              <Icon name="User" size={24} />
            </div>
            <span className="text-xs font-medium">Профиль</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
