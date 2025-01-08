// src/app/results/page.js
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { useRouter } from "next/navigation";
export default function Results() {
  const router = useRouter(); // Router kullanımı
  const [loading, setLoading] = useState(true); // Yükleniyor durumu

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login"); // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
      } else {
        setLoading(false); // Kullanıcı giriş yapmışsa yüklenmeyi durdur
      }
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Kullanıcıyı çıkış yaptır
    router.push("/login"); // Çıkış yaptıktan sonra giriş sayfasına yönlendir
  };

  if (loading) {
    return <div>Yükleniyor...</div>; // Yüklenme durumu
  }

  return (
    <div className="container">
      <button onClick={handleLogout}>Çıkış Yap</button>
    </div>
  );
}
