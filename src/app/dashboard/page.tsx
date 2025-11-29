'use client'

import { useState, useEffect } from 'react'
import { User } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import { calculateAge, getAgeBasedRecommendations } from '@/lib/utils-age'
import { CATEGORIES } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Sparkles, Target, Heart, DollarSign, BookOpen, 
  Calendar, Settings, Bell, TrendingUp, Users,
  Briefcase, LogOut, Plus
} from 'lucide-react'

interface DashboardPageProps {
  user: User
}

export default function DashboardPage({ user }: DashboardPageProps) {
  const [age, setAge] = useState(0)
  const [recommendations, setRecommendations] = useState<any>(null)

  useEffect(() => {
    const userAge = calculateAge(user.birth_date)
    setAge(userAge)
    setRecommendations(getAgeBasedRecommendations(userAge))
  }, [user.birth_date])

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              LifePath
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Olá, {user.full_name}! 👋
          </h2>
          <p className="text-gray-600">
            {age} anos • Recomendações personalizadas para você
          </p>
        </div>

        {/* Age-based Recommendations */}
        {recommendations && (
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Recomendações para sua fase de vida
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.suggestions.map((suggestion: string, index: number) => (
                  <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-sm">{suggestion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Navigation Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="goals">Objetivos</TabsTrigger>
            <TabsTrigger value="dreams">Sonhos</TabsTrigger>
            <TabsTrigger value="activities">Atividades</TabsTrigger>
            <TabsTrigger value="finances">Finanças</TabsTrigger>
            <TabsTrigger value="development">Desenvolvimento</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Objetivos Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-purple-600">0</p>
                  <p className="text-sm text-gray-600 mt-1">Comece definindo seus objetivos</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    Sonhos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-pink-600">0</p>
                  <p className="text-sm text-gray-600 mt-1">Liste seus sonhos e conquistas</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Atividades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">0</p>
                  <p className="text-sm text-gray-600 mt-1">Adicione atividades de aprendizado</p>
                </CardContent>
              </Card>
            </div>

            {/* Development Areas */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Áreas de Desenvolvimento</CardTitle>
                <CardDescription>
                  Explore diferentes aspectos da sua vida
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(CATEGORIES).map(([key, { label, color }]) => (
                    <Button
                      key={key}
                      variant="outline"
                      className={`h-auto py-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform bg-gradient-to-br ${color} text-white border-0`}
                    >
                      <TrendingUp className="w-6 h-6" />
                      <span className="text-sm font-medium">{label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Suggestions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Sugestões para Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Heart className="w-5 h-5 text-purple-600" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Pratique meditação</p>
                      <p className="text-xs text-gray-600">15 minutos para clarear a mente</p>
                    </div>
                    <Button size="sm" variant="ghost">Iniciar</Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Leia por 20 minutos</p>
                      <p className="text-xs text-gray-600">Expanda seu conhecimento</p>
                    </div>
                    <Button size="sm" variant="ghost">Iniciar</Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <Users className="w-5 h-5 text-pink-600" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Conecte-se com alguém</p>
                      <p className="text-xs text-gray-600">Fortaleça seus relacionamentos</p>
                    </div>
                    <Button size="sm" variant="ghost">Iniciar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Meus Objetivos</CardTitle>
                    <CardDescription>
                      Defina e acompanhe seus objetivos de vida
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Objetivo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Nenhum objetivo cadastrado ainda</p>
                  <p className="text-sm mt-2">Comece definindo seus primeiros objetivos!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dreams Tab */}
          <TabsContent value="dreams" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Sonhos e Conquistas</CardTitle>
                    <CardDescription>
                      Visualize e planeje seus sonhos
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Sonho
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Nenhum sonho cadastrado ainda</p>
                  <p className="text-sm mt-2">Liste seus sonhos e veja sugestões de como alcançá-los!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Atividades e Aprendizado</CardTitle>
                    <CardDescription>
                      Gerencie suas atividades e aprenda coisas novas
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Atividade
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma atividade cadastrada ainda</p>
                  <p className="text-sm mt-2">Adicione atividades que deseja aprender!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Finances Tab */}
          <TabsContent value="finances" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Controle Financeiro</CardTitle>
                    <CardDescription>
                      Gerencie suas finanças e alcance seus sonhos
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Registro
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-emerald-50 border-emerald-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-emerald-700">Receitas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-emerald-700">R$ 0,00</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50 border-red-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-red-700">Despesas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-red-700">R$ 0,00</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-blue-700">Saldo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-blue-700">R$ 0,00</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center py-8 text-gray-500">
                  <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Nenhum registro financeiro ainda</p>
                  <p className="text-sm mt-2">Comece registrando suas receitas e despesas!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Development Tab */}
          <TabsContent value="development" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Desenvolvimento Pessoal</CardTitle>
                <CardDescription>
                  Explore recursos e sugestões para seu crescimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        Profissional
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">Desenvolva sua carreira e habilidades profissionais</p>
                      <Button variant="secondary" size="sm">Explorar</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-emerald-400 to-teal-600 text-white border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Financeiro
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">Aprenda sobre educação financeira e investimentos</p>
                      <Button variant="secondary" size="sm">Explorar</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-400 to-pink-600 text-white border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5" />
                        Saúde & Corpo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">Cuide do seu corpo e bem-estar físico</p>
                      <Button variant="secondary" size="sm">Explorar</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Espiritual
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">Fortaleça sua conexão espiritual e interior</p>
                      <Button variant="secondary" size="sm">Explorar</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-pink-400 to-red-500 text-white border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Relacionamentos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">Melhore suas relações pessoais e sociais</p>
                      <Button variant="secondary" size="sm">Explorar</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Pessoal
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">Desenvolva-se como ser humano completo</p>
                      <Button variant="secondary" size="sm">Explorar</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
