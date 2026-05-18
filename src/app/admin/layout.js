export const metadata = {
  title: 'Admin Dashboard | Chamunda Jewellers',
  description: 'Secure admin portal for Chamunda Jewellers',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {children}
    </div>
  );
}
