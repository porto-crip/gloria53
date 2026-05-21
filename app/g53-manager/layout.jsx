import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-syne",
  display: "swap",
});

export default function AdminLayout({ children }) {
  return <div className={syne.variable}>{children}</div>;
}
