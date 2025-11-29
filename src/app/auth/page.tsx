'use client'

import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkles, Heart, Target, AlertCircle } from 'lucide-react'
import { User } from '@/lib/types'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface AuthPageProps {
  onLogin: (user: User) => void
}

export default function AuthPage({ onLogin }: AuthPageProps) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')

  async function handleSignUp() {
    setLoading(true)
    
    try {
      if (!isSupabaseConfigured) {
        // Local fallback mode
        const mockUser: User = {
          id: crypto.randomUUID(),
          email,
          full_name: fullName,
          birth_date: birthDate,
          created_at: new Date().toISOString(),
        }
        
        toast.success('Conta criada com sucesso! (Modo local)')
        onLogin(mockUser)
        return
      }

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError

      if (authData.user) {
        // Create user profile
        const { data: userData, error: userError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email,
            full_name: fullName,
            birth_date: birthDate,
          })
          .select()
          .single()

        if (userError) throw userError

        toast.success('Conta criada com sucesso!')
        onLogin(userData)
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  async function handleSignIn() {
    setLoading(true)
    
    try {
      if (!isSupabaseConfigured) {
        // Local fallback mode
        const mockUser: User = {
          id: crypto.randomUUID(),
          email,
          full_name: 'Usuário Demo',
          birth_date: '1990-01-01',
          created_at: new Date().toISOString(),
        }
        
        toast.success('Login realizado com sucesso! (Modo local)')
        onLogin(mockUser)
        return
      }

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      if (authData.user) {
        // Fetch user profile
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authData.user.id)
          .single()

        if (userError) throw userError

        toast.success('Login realizado com sucesso!')
        onLogin(userData)
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              LifePath
            </h1>
          </div>
          <p className="text-gray-600">Seu guia para uma vida plena e realizada</p>
        </div>

        {!isSupabaseConfigured && (
          <Alert className="mb-4 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 text-sm">
              Modo local ativo. Configure o Supabase nas Integrações para persistência de dados.
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle>Bem-vindo</CardTitle>
            <CardDescription>
              Comece sua jornada de desenvolvimento pessoal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Cadastrar</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input
                    id="email-login"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Senha</Label>
                  <Input
                    id="password-login"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleSignIn}
                  disabled={loading || !email || !password}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth">Data de Nascimento</Label>
                  <Input
                    id="birth"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Senha</Label>
                  <Input
                    id="password-signup"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleSignUp}
                  disabled={loading || !email || !password || !fullName || !birthDate}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {loading ? 'Cadastrando...' : 'Criar Conta'}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <Target className="w-8 h-8 text-purple-600" />
            <p className="text-xs text-gray-600">Objetivos</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Heart className="w-8 h-8 text-pink-600" />
            <p className="text-xs text-gray-600">Bem-estar</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <p className="text-xs text-gray-600">Crescimento</p>
          </div>
        </div>
      </div>
    </div>
  )
}
