// src/app/results/page.js
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../supabase/supabaseClient";
import { useRouter } from "next/navigation";
import "./styles.css"; // CSS dosyasını içe aktar

const tytTopics = [
  "Temel Kavramlar",
  "Sayı Basamakları",
  "Bölme ve Bölünebilme",
  "EBOB – EKOK",
  "Rasyonel Sayılar",
  "Basit Eşitsizlikler",
  "Mutlak Değer",
  "Üslü Sayılar",
  "Köklü Sayılar",
  "Çarpanlara Ayırma",
  "Oran Orantı",
  "Denklem Çözme",
  "Problemler",
  "Sayı Problemleri",
  "Kesir Problemleri",
  "Yaş Problemleri",
  "Hareket Hız Problemleri",
  "İşçi Emek Problemleri",
  "Yüzde Problemleri",
  "Kar Zarar Problemleri",
  "Karışım Problemleri",
  "Grafik Problemleri",
  "Rutin Olmayan Problemleri",
  "Kümeler – Kartezyen Çarpım",
  "Mantık",
  "Fonksiyonlar",
  "Polinomlar",
  "2.Dereceden Denklemler",
  "Permütasyon ve Kombinasyon",
  "Olasılık",
  "Veri – İstatistik",
];

const aytTopics = [
  "Temel Kavramlar",
  "Sayı Basamakları",
  "Bölme ve Bölünebilme",
  "EBOB - EKOK",
  "Rasyonel Sayılar",
  "Basit Eşitsizlikler",
  "Mutlak Değer",
  "Üslü Sayılar",
  "Köklü Sayılar",
  "Çarpanlara Ayırma",
  "Oran Orantı",
  "Denklem Çözme",
  "Problemler",
  "Kümeler",
  "Kartezyen Çarpım",
  "Mantık",
  "Fonksiyonlar",
  "Polinomlar",
  "2.Dereceden Denklemler",
  "Permütasyon ve Kombinasyon",
  "Binom ve Olasılık",
  "İstatistik",
  "Karmaşık Sayılar",
  "2.Dereceden Eşitsizlikler",
  "Parabol",
  "Trigonometri",
  "Logaritma",
  "Diziler",
  "Limit",
  "Türev",
  "İntegral",
];
export default function Results() {
  const [correctAnswers, setCorrectAnswers] = useState(""); // Başlangıçta boş string
  const [wrongAnswers, setWrongAnswers] = useState(""); // Başlangıçta boş string
  const [ratio, setRatio] = useState(null);
  const [studyPlan, setStudyPlan] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedType, setSelectedType] = useState(null); // Seçilen tür (TYT veya AYT)
  const router = useRouter(); // Router kullanımı

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login"); // Giriş sayfasına yönlendir
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login"); // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
      }
    };

    checkUser();
  }, [router]);

  const calculateRatio = () => {
    const totalAnswers = Number(correctAnswers) + Number(wrongAnswers);
    if (totalAnswers === 0) {
      alert("Lütfen doğru ve yanlış sayısını girin.");
      return;
    }
    const calculatedRatio = (Number(correctAnswers) / totalAnswers) * 100;
    setRatio(calculatedRatio);
    generateStudyPlan(calculatedRatio);
  };

  const generateStudyPlan = (calculatedRatio) => {
    let questionsToSolve;
    if (calculatedRatio <= 25) {
      questionsToSolve = 30;
    } else if (calculatedRatio <= 50) {
      questionsToSolve = 25;
    } else {
      questionsToSolve = 20;
    }

    // Günün hangi gün olduğunu kontrol et
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0: Pazar, 1: Pazartesi, ..., 6: Cumartesi
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Hafta sonu kontrolü

    const plan = `
      ${isWeekend ? "Hafta Sonu" : "Hafta İçi"}: 
      ${
        isWeekend
          ? `10.00 - 12.00 Arası: 2 saat çalışma (45 dakika çalışma + 15 dakika mola)
        12.00 - 13.00 Arası: 1 saat yemek molası
        13.00 - 17.00 Arası: 3 saat çalışma (45 dakika çalışma + 15 dakika mola)
        17.00 - 19.00 Arası: Yemek molası + dinlenme
        19.00 - 22.00 Arası: 3 saat çalışma (45 dakika çalışma + 15 dakika mola)`
          : `19.00 - 22.00 Arası Günlük Çalışma Programı:
      Toplam 3 Saat  Çalışma Olacak:
        - 45 Dakika Çalışma × 3
        - 15 Dakika Mola × 3`
      }
        - ${questionsToSolve} Soru Çözün
        - Seçilen Konular: ${selectedTopics.join(", ")}
    `;
    setStudyPlan(plan);
  };

  const selectRandomTopics = (num, topicList) => {
    const shuffled = topicList.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num); // Rastgele seçilen konular
  };

  const handleTytClick = () => {
    const topics = selectRandomTopics(3, tytTopics);
    setSelectedTopics(topics);
    setSelectedType("TYT"); // Seçilen türü TYT olarak ayarla
  };

  const handleAytClick = () => {
    const topics = selectRandomTopics(3, aytTopics);
    setSelectedTopics(topics);
    setSelectedType("AYT"); // Seçilen türü AYT olarak ayarla
  };

  return (
    <div>
      <div className="container">
        <h2>Doğru ve Yanlış Sayısını Girin</h2>
        <input
          type="number"
          placeholder="Doğru Sayısı"
          value={correctAnswers}
          onChange={(e) => setCorrectAnswers(e.target.value)} // Değeri güncelle
        />
        <input
          type="number"
          placeholder="Yanlış Sayısı"
          value={wrongAnswers}
          onChange={(e) => setWrongAnswers(e.target.value)} // Değeri güncelle
        />

        <div className="topic-buttons">
          <button
            onClick={handleTytClick}
            className={selectedType === "TYT" ? "selected" : ""}
          >
            TYT Konuları
          </button>
          <button
            onClick={handleAytClick}
            className={selectedType === "AYT" ? "selected" : ""}
          >
            AYT Konuları
          </button>
        </div>

        <button onClick={calculateRatio} disabled={!selectedType}>
          Hesapla
        </button>

        {ratio !== null && (
          <div className="result">
            <h3>Oran: {ratio.toFixed(2)}%</h3>
            <pre>{studyPlan}</pre>
          </div>
        )}
      </div>
      <div className="logout-container">
        <button onClick={handleLogout}>Çıkış Yap</button>
      </div>
    </div>
  );
}
