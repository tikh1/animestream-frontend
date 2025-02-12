"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WatchHistory } from "@/components/profile/WatchHistory"
import { FavoriteAnimes } from "@/components/profile/FavoriteAnimes"
import { UserStats } from "@/components/profile/UserStats"
import { UserSettings } from "@/components/profile/UserSettings"
import { Camera } from "lucide-react"
import { UserComments } from "@/components/profile/UserComments"
import useLocalStorage from "@/hooks/useLocalStorage"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"


export default function ProfilePage() {
  const [username, setUserName] = useLocalStorage('user', '');
  const [email, setEmail] = useLocalStorage('email', '');

  const params = useParams()

  // Check if the current user is viewing their own profile
  const isOwnProfile = params.username === username

  const [userData, setUserData] = useState({
    username: username,
    email: isOwnProfile ? email : "",
    bio: "Anime tutkunu ve manga koleksiyoncusu. Favori türlerim: Shounen, Seinen ve Slice of Life.",
    avatarUrl: "/placeholder.svg?height=200&width=200",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("stats")
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, avatarUrl: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Define available tabs based on profile ownership
  const getTabs = () => {
    const commonTabs = [{ id: "stats", label: "İstatistikler" }]

    const privateTabs = [
      { id: "comments", label: "Yorumları" },
      { id: "history", label: "İzleme Geçmişi" },
      { id: "favorites", label: "Favoriler" },
      { id: "settings", label: "Ayarlar" },
    ]

    return isOwnProfile ? [...commonTabs, ...privateTabs] : commonTabs
  }

  const tabs = getTabs()

  // If active tab is not available for current view, reset to stats
  useEffect(() => {
    if (!tabs.find((tab) => tab.id === activeTab)) {
      setActiveTab("stats")
    }
  }, [activeTab, tabs])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-[400px_1fr] gap-8"
        >
          {/* Profile Section */}
          <div className="bg-card rounded-xl p-8 text-card-foreground h-fit border">
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <Avatar className="w-32 h-32 border-4 border-background/20">
                  <AvatarImage src={userData.avatarUrl} alt={userData.username} />
                  <AvatarFallback>{userData.username[0]}</AvatarFallback>
                </Avatar>
                {isOwnProfile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-0 right-0 bg-background/50 dark:bg-background/80 text-foreground dark:text-foreground backdrop-blur-sm rounded-full p-2 hover:bg-background/70 dark:hover:bg-background/90 transition-colors shadow-md"
                    onClick={() => setIsAvatarDialogOpen(true)}
                  >
                    <Camera className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <h2 className="text-3xl font-bold text-center mb-2">{userData.username}</h2>
              {isOwnProfile && <p className="text-foreground text-center mb-6">{userData.email}</p>}
              <div className="bg-muted/50 rounded-lg p-4 backdrop-blur-sm w-full">
                <p className="text-sm text-foreground">{userData.bio}</p>
              </div>
              {isOwnProfile && (
                <Button variant="secondary" onClick={() => setIsEditing(!isEditing)} className="mt-6 w-full">
                  {isEditing ? "İptal" : "Profili Düzenle"}
                </Button>
              )}
            </div>
            <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Profile Picture</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Current Avatar</Label>
                      <div className="mt-2 border rounded-lg overflow-hidden">
                        <img
                          src={userData.avatarUrl || "/placeholder.svg"}
                          alt="Current Avatar"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="new-avatar">New Avatar</Label>
                      <div className="mt-2 border rounded-lg overflow-hidden">
                        <img
                          src={userData.avatarUrl || "/placeholder.svg"}
                          alt="New Avatar Preview"
                          className="w-full h-auto"
                        />
                      </div>
                      <Input
                        id="new-avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        onClick={() => document.getElementById("new-avatar")?.click()}
                        className="mt-2 w-full"
                        variant="secondary"
                      >
                        Resim Seç
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsAvatarDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Content Section */}
          <div className="bg-card rounded-xl p-8">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.form
                  key="edit-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <Label>Kullanıcı Adı</Label>
                    <Input
                      value={userData.username}
                      onChange={(e) => setUserData((prev) => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>E-posta</Label>
                    <Input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Hakkımda</Label>
                    <Textarea
                      value={userData.bio}
                      onChange={(e) => setUserData((prev) => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                    />
                  </div>
                  <Button type="submit">Kaydet</Button>
                </motion.form>
              ) : (
                <motion.div
                  key="profile-content"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className={`grid w-full grid-cols-${tabs.length} mb-8`}>
                      {tabs.map((tab) => (
                        <TabsTrigger key={tab.id} value={tab.id}>
                          {tab.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TabsContent value="stats">
                          <UserStats />
                        </TabsContent>
                        {isOwnProfile && (
                          <>
                            <TabsContent value="history">
                              <WatchHistory />
                            </TabsContent>
                            <TabsContent value="favorites">
                              <FavoriteAnimes />
                            </TabsContent>
                            <TabsContent value="settings">
                              <UserSettings />
                            </TabsContent>
                          </>
                        )}
                        <TabsContent value="comments">
                          <UserComments />
                        </TabsContent>
                      </motion.div>
                    </AnimatePresence>
                  </Tabs>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

