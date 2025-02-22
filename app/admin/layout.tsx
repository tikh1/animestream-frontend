import AdminNav from "@/components/admin/AdminNav"
import RouteGuard from "../../components/RouteGuard"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      <div className="flex flex-col min-h-screen">
        <AdminNav />
        <div className="flex-1">{children}</div>
      </div>
    </RouteGuard>
  );
}
