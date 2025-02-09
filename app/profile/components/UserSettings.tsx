import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from 'framer-motion'
import { Bell, Globe, Moon, Sun } from 'lucide-react'
import { Card } from "@/components/ui/card"

export function UserSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [language, setLanguage] = useState('tr')
  const [theme, setTheme] = useState('system')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6">Ayarlar</h3>
      
      <Card className="p-6 space-y-6">
        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-primary" />
            <div>
              <Label htmlFor="email-notifications" className="text-base font-medium">
                E-posta Bildirimleri
              </Label>
              <p className="text-sm text-muted-foreground">
                Yeni bölümler ve öneriler hakkında bildirim alın
              </p>
            </div>
          </div>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>

        {/* Language Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Globe className="w-6 h-6 text-primary" />
            <Label htmlFor="language" className="text-base font-medium">
              Dil
            </Label>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language" className="w-full">
              <SelectValue placeholder="Dil seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tr">Türkçe</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Theme Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {theme === 'dark' ? (
              <Moon className="w-6 h-6 text-primary" />
            ) : (
              <Sun className="w-6 h-6 text-primary" />
            )}
            <Label htmlFor="theme" className="text-base font-medium">
              Tema
            </Label>
          </div>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger id="theme" className="w-full">
              <SelectValue placeholder="Tema seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Açık</SelectItem>
              <SelectItem value="dark">Koyu</SelectItem>
              <SelectItem value="system">Sistem</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Button type="submit" className="w-full">
        Ayarları Kaydet
      </Button>
    </motion.form>
  )
}

