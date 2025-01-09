// src/app/layout.js
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Yapay Zeka Destekli Çalışma Programı Oluşturma</title>
      </head>
      <body>
        <nav>
          <h1>Yapay Zeka Destekli Çalışma Programı Oluşturma</h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
