import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Clock, Film, Heart, Play } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

const stats = [
  { icon: Film, label: "İzlenen Anime", value: "120" },
  { icon: Play, label: "İzlenen Bölüm", value: "1,500" },
  { icon: Heart, label: "Favori Anime", value: "30" },
  { icon: Clock, label: "Toplam İzleme Süresi", value: "500 saat" },
]

const genreData = [
  { name: "Aksiyon", value: 30 },
  { name: "Macera", value: 25 },
  { name: "Komedi", value: 20 },
  { name: "Dram", value: 15 },
  { name: "Bilim Kurgu", value: 10 },
]

const watchTimeData = [
  { name: "Pzt", saat: 2 },
  { name: "Sal", saat: 3 },
  { name: "Çar", saat: 4 },
  { name: "Per", saat: 3 },
  { name: "Cum", saat: 5 },
  { name: "Cmt", saat: 7 },
  { name: "Paz", saat: 6 },
]

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F43F5E", "#10B981"]

export function UserStats() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-4 h-full">
              <div className="flex flex-col items-center justify-center text-center h-full">
                <stat.icon className="h-8 w-8 mb-2 text-primary" />
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">En Çok İzlenen Türler</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {genreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Haftalık İzleme Süresi</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={watchTimeData}>
              <XAxis dataKey="name" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="saat" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}

