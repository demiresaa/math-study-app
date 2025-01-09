// src/app/results/page.js
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../supabase/supabaseClient";
import { useRouter } from "next/navigation";
import "./styles.css";

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
  "Kümeler",
  "Mantık",
  "Fonksiyonlar",
  "Polinomlar",
  "2.Dereceden Denklemler",
  "Permütasyon ve Kombinasyon",
  "Binom ve Olasılık",
  "İstatistik",
  "Karmaşık Sayılar",
  "Parabol",
  "Trigonometri",
  "Logaritma",
  "Diziler",
  "Limit",
  "Türev",
  "İntegral",
];

export default function Results() {
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [emptyAnswers, setEmptyAnswers] = useState({});
  const [studyPlan, setStudyPlan] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [showStudyTime, setShowStudyTime] = useState(false);
  const [studySchedule, setStudySchedule] = useState("");

  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      }
    };

    checkUser();
  }, [router]);

  const calculateStudyPlan = () => {
    setShowStudyTime(true);

    const topics = selectedType === "TYT" ? tytTopics : aytTopics;
    const plan = topics.map((topic) => {
      const correct = Number(correctAnswers[topic] || 0);
      const wrong = Number(wrongAnswers[topic] || 0);
      const empty = Number(emptyAnswers[topic] || 0);
      const total = correct + wrong + empty;

      if (total === 0) {
        return `${topic}: Hiç çözülmedi.`;
      }

      const successRate = (correct / total) * 100;
      let questionsToSolve;
      if (successRate <= 25) {
        questionsToSolve = 30;
      } else if (successRate <= 50) {
        questionsToSolve = 25;
      } else {
        questionsToSolve = 20;
      }

      return `${topic}: Başarı Oranı: ${successRate.toFixed(
        2
      )}%, Çözülecek Soru Sayısı: ${questionsToSolve}`;
    });

    setStudyPlan(plan.join("\n"));

    // Çalışma programını oluştur
    const scheduleText = isWeekend()
      ? `Hafta Sonu Çalışma Programı:\n\n10.00 - 12.00 Arası: 2 saat çalışma (45 dakika çalışma + 15 dakika mola)\n12.00 - 13.00 Arası: 1 saat yemek molası\n13.00 - 17.00 Arası: 3 saat çalışma (45 dakika çalışma + 15 dakika mola)\n17.00 - 19.00 Arası: Yemek molası + dinlenme\n19.00 - 22.00 Arası: 3 saat çalışma (45 dakika çalışma + 15 dakika mola)`
      : `Hafta İçi Çalışma Programı:\n\n19.00 - 22.00 Arası Günlük Çalışma Programı:\nToplam 3 Saat Çalışma Olacak:\n- 45 Dakika Çalışma × 3\n- 15 Dakika Mola × 3`;

    setStudySchedule(scheduleText);
  };

  const handleInputChange = (setter, topic, value) => {
    setter((prev) => ({
      ...prev,
      [topic]: value,
    }));
  };

  const isWeekend = () => {
    const day = new Date().getDay();
    return day === 0 || day === 6;
  };

  const downloadSchedule = () => {
    const combinedText = `${
      isWeekend()
        ? `Hafta Sonu Çalışma Programı:\n\n10.00 - 12.00 Arası: 2 saat çalışma (45 dakika çalışma + 15 dakika mola)\n12.00 - 13.00 Arası: 1 saat yemek molası\n13.00 - 17.00 Arası: 3 saat çalışma (45 dakika çalışma + 15 dakika mola)\n17.00 - 19.00 Arası: Yemek molası + dinlenme\n19.00 - 22.00 Arası: 3 saat çalışma (45 dakika çalışma + 15 dakika mola)`
        : `Hafta İçi Çalışma Programı:\n\n19.00 - 22.00 Arası Günlük Çalışma Programı:\nToplam 3 Saat Çalışma Olacak:\n- 45 Dakika Çalışma × 3\n- 15 Dakika Mola × 3`
    }\n\nÇalışma Planı:\n${studyPlan}`;

    const element = document.createElement("a");
    const file = new Blob([combinedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "calisma_programi.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div>
      <div className="container">
        <h2>{selectedType} Sınav Türünü Seç</h2>
        {selectedType &&
          (selectedType === "TYT" ? tytTopics : aytTopics).map((topic) => (
            <div key={topic} className="topic-inputs">
              <h3>{topic}</h3>
              <input
                type="number"
                placeholder="Doğru"
                value={correctAnswers[topic] || ""}
                onChange={(e) =>
                  handleInputChange(setCorrectAnswers, topic, e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Yanlış"
                value={wrongAnswers[topic] || ""}
                onChange={(e) =>
                  handleInputChange(setWrongAnswers, topic, e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Boş"
                value={emptyAnswers[topic] || ""}
                onChange={(e) =>
                  handleInputChange(setEmptyAnswers, topic, e.target.value)
                }
              />
            </div>
          ))}

        <div className="topic-buttons">
          <button
            onClick={() => {
              setSelectedType("TYT");
              setShowStudyTime(false);
            }}
            className={selectedType === "TYT" ? "selected" : ""}
          >
            TYT
          </button>
          <button
            onClick={() => {
              setSelectedType("AYT");
              setShowStudyTime(false);
            }}
            className={selectedType === "AYT" ? "selected" : ""}
          >
            AYT
          </button>
        </div>

        <button onClick={calculateStudyPlan} disabled={!selectedType}>
          Çalışma Planını Oluştur
        </button>

        {studyPlan && (
          <div className="result">
            {showStudyTime && (
              <div className="study-time">
                <h3>
                  {isWeekend() ? "Hafta Sonu" : "Hafta İçi"} Çalışma Programı:
                </h3>
                <pre>
                  {isWeekend()
                    ? `10.00 - 12.00 Arası: 2 saat çalışma (45 dakika çalışma + 15 dakika mola)
                  12.00 - 13.00 Arası: 1 saat yemek molası
                  13.00 - 17.00 Arası: 3 saat çalışma (45 dakika çalışma + 15 dakika mola)
                  17.00 - 19.00 Arası: Yemek molası + dinlenme
                  19.00 - 22.00 Arası: 3 saat çalışma (45 dakika çalışma + 15 dakika mola)`
                    : `19.00 - 22.00 Arası Günlük Çalışma Programı:
Toplam 3 Saat Çalışma Olacak:
- 45 Dakika Çalışma × 3
- 15 Dakika Mola × 3`}
                </pre>
              </div>
            )}
            <h3>Çalışma Planı:</h3>
            <pre>
              {studyPlan.split("\n").map((line, index) => (
                <span key={index}>
                  {line
                    .split(": ")
                    .map((part, i) =>
                      i === 0 ? <strong key={i}>{part}:</strong> : part
                    )}
                </span>
              ))}
            </pre>
            <button onClick={downloadSchedule}>İndir</button>
          </div>
        )}
      </div>
      <div className="logout-container">
        <button onClick={handleLogout}>Çıkış Yap</button>
      </div>
    </div>
  );
}
