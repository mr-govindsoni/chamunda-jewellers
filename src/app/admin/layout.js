export const metadata = {
  title: 'Admin Dashboard | Jaishree Jewellers',
  description: 'Secure admin portal for Jaishree Jewellers',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {children}
    </div>
  );
}
