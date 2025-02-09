import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/admin/Overview"
import { RecentActivity } from "@/components/admin/RecentActivity"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        
        {/* Stats Cards - Always visible */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10,245</div>
              <p className="text-xs text-muted-foreground">+180 geçen haftadan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam İzlenme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,345,893</div>
              <p className="text-xs text-muted-foreground">+21% geçen aydan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktif Abonelikler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,764</div>
              <p className="text-xs text-muted-foreground">+2.5% geçen aydan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Yeni Animeler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">Son 30 günde</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart and Activity Section */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-7">
          {/* Chart - Hidden on mobile */}
          <Card className="hidden md:block md:col-span-4">
            <CardHeader>
              <CardTitle>Genel Bakış</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>

          {/* Monthly Stats Summary - Visible only on mobile */}
          <Card className="md:hidden col-span-1">
            <CardHeader>
              <CardTitle>Aylık Özet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Bu Ay</span>
                  <span className="text-lg font-bold">4,385</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Geçen Ay</span>
                  <span className="text-lg font-bold">3,873</span>
                </div>
                <div className="flex justify-between items-center text-primary">
                  <span className="text-sm font-medium">Artış</span>
                  <span className="text-lg font-bold">+13.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity - Full width on mobile */}
          <Card className="col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle>Son Aktiviteler</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

