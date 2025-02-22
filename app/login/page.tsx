'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { login } from '@/services/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const storedName = localStorage.getItem('user');
      if (storedName) {
        router.push(`/profile/${storedName}`);
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const data = await login(email, password);
      console.log('Giriş başarılı:', data);
  
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      const storedName = localStorage.getItem('user');
      if (storedName) {
        router.push(`/profile/${storedName}`);
      }

      router.refresh();

    } catch (err: any) {
      console.error('Giriş hatası:', err);
      setError(err.message || 'Geçersiz e-posta veya şifre');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Giriş Yap</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p>
            Hesabınız yok mu?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Kayıt Ol
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
