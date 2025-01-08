// src/app/login/page.js
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../supabase/supabaseClient";
import { useRouter } from "next/navigation";
import "./style1.css"; // CSS dosyasını içe aktar

export default function Login() {
  const [email, setEmail] = useState(""); // E-posta
  const [password, setPassword] = useState(""); // Şifre
  const [user, setUser] = useState(null); // Kullanıcı durumu
  const router = useRouter(); // Router kullanımı

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user); // Kullanıcı giriş yapmışsa durumu güncelle
        router.push("/results"); // Kullanıcı giriş yapmışsa sonuç sayfasına yönlendir
      }
    };

    checkUser();
  }, [router]);

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login Error:", error);
        alert("E-posta veya şifre hatalı.");
        return; // Hata durumunda işlemi sonlandır
      }

      // Giriş başarılı, sonuç sayfasına yönlendir
      router.push("/results");
    } catch (err) {
      console.error("Unexpected Error:", err);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="container">
      <h2>Giriş Yap</h2>
      <input
        type="email"
        placeholder="E-posta"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Giriş Yap</button>
      <p>
        Henüz kaydolmadınız mı? <a href="/register">Kayıt Ol</a>
      </p>
    </div>
  );
}
