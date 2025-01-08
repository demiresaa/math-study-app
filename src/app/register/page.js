// src/app/register/page.js
"use client";

import { useState } from "react";
import { supabase } from "../../../supabase/supabaseClient";
import { useRouter } from "next/navigation";
import "./style2.css"; // CSS dosyasını içe aktar

export default function Register() {
  const [firstName, setFirstName] = useState(""); // Öğrenci Adı
  const [lastName, setLastName] = useState(""); // Öğrenci Soyadı
  const [email, setEmail] = useState(""); // E-posta
  const [password, setPassword] = useState(""); // Şifre
  const router = useRouter(); // Router kullanımı

  const handleRegister = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Registration Error:", error);
      alert("Kayıt sırasında bir hata oluştu.");
    } else {
      // Kullanıcı bilgilerini veritabanına ekle
      const { data, error: insertError } = await supabase
        .from("tOgrenciler") // "students" tablosuna ekleme yapıyoruz
        .insert([
          {
            OgrenciAd: firstName,
            OgrenciSoyad: lastName,
            Email: email,
            Sifre: password,
          },
        ]);

      if (insertError) {
        console.error("Error inserting student data:", insertError);
        alert("Öğrenci bilgileri eklenirken bir hata oluştu.");
      } else {
        alert("Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.");
        router.push("/login"); // Giriş sayfasına yönlendir
      }
    }
  };

  return (
    <div className="container">
      <h2>Kayıt Ol</h2>
      <input
        type="text"
        placeholder="Öğrenci Adı"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Öğrenci Soyadı"
        onChange={(e) => setLastName(e.target.value)}
      />
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
      <button onClick={handleRegister}>Kayıt Ol</button>
      <p>
        Zaten kaydolduysanız? <a href="/login">Giriş Yap</a>
      </p>
    </div>
  );
}
