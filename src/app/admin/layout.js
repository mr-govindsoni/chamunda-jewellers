export const metadata = {
  title: 'Admin Dashboard | Argun Jewellers',
  description: 'Secure admin portal for Argun Jewellers',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {children}
    </div>
  );
}
