// src/app/layout.js
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Yapay Zeka Destekli Ders Programı Oluşturma</title>
      </head>
      <body>
        <nav>
          <h1>Yapay Zeka Destekli Ders Programı Oluşturma</h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
