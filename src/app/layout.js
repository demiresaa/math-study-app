// src/app/layout.js
import "./page.module.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Koçum Benim</title>
      </head>
      <body>
        <nav>
          <img
            src="/resim.jpg"
            className="resim"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "100px",
              marginBottom: "-150px",
            }}
          />
        </nav>
        {children}
      </body>
    </html>
  );
}
