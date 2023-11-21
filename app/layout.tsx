import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import RespectMotionPreferences from "@/app/ui/RespectMotionPreferences";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RespectMotionPreferences>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
    </RespectMotionPreferences>
  );
}
