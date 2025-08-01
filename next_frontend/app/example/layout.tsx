import SidebarLayout from "@/components/SidebarLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <SidebarLayout>{children}</SidebarLayout>
    </main>
  );
}
