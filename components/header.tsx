import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
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
              className={`text-sm font-medium transition decoration-2 underline-offset-4 ${
                pathname === "/dashboard"
                  ? "text-primary underline"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/projects"
              className={`text-sm font-medium transition decoration-2 underline-offset-4 ${
                pathname === "/projects"
                  ? "text-primary underline"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Projects
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
