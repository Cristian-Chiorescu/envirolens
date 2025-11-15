import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/envirolens-logo.png"
                alt="EnviroLens Logo"
                width={30}
                height={30}
              ></Image>

              <span className="text-xl font-bold text-foreground">
                EnviroLens
              </span>
            </Link>

            <nav className="flex gap-6">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/projects"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
