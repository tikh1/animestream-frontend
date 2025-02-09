import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentActivities = [
  {
    user: { name: "Ahmet Y.", avatar: "/avatars/01.png" },
    action: "yeni üye oldu",
    time: "2 saat önce"
  },
  {
    user: { name: "Ayşe K.", avatar: "/avatars/02.png" },
    action: "'Attack on Titan' izlemeye başladı",
    time: "3 saat önce"
  },
  {
    user: { name: "Mehmet S.", avatar: "/avatars/03.png" },
    action: "premium üyeliğe geçiş yaptı",
    time: "5 saat önce"
  },
  {
    user: { name: "Zeynep A.", avatar: "/avatars/04.png" },
    action: "'Death Note' için yorum yaptı",
    time: "1 gün önce"
  },
  {
    user: { name: "Can B.", avatar: "/avatars/05.png" },
    action: "profil resmini güncelledi",
    time: "2 gün önce"
  }
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {recentActivities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar} alt="Avatar" />
            <AvatarFallback>{activity.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {activity.action}
            </p>
          </div>
          <div className="ml-auto font-medium text-sm text-muted-foreground">
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  )
}

