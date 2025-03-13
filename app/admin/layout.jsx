import AdminNavbar from '@/app/_components/admin/AdminNavbar';
import '@/styles/globalAdmin.css';

export const metadata = {
  title: "Admin Panel - MetaVFest",
  description: "Manage MetaVFest content and settings",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AdminNavbar />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} MetaVNext Admin Panel</p>
      </footer>
    </div>
  );
}