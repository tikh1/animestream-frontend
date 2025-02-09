import AdminNav from "@/components/admin/AdminNav"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNav />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}

