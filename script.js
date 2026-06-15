// =====================================================================
// 🏛️ MERKEZİ LABORATUVAR OTOMASYON SİSTEMİ SÜREÇ VE ÇETELE HAFIZASI
// =====================================================================
let projeHafizasi = {
  mevcutYuzde: 35.0,
  toplamUzmanSayisi: 10,
  bilinenUzmanlar: ["ahmet yılmaz", "nihan okyar", "çağlar çakır", "selin deniz"],
  projeAsamasi: 4, 
  
  istatistikler: {
    toplamMudahale: 1, 
    teshireHazir: 1,
    devamEden: 0,
    kullanilanMalzemeler: {}
  },
  kritikKullanimEsigi: 3 
};

// =====================================================================
// 🔄 SEGMENTE GÖRE YÖNTEM LİSTESİ VE BAŞLIK DEĞİŞTİRME MEKANİZMASI
// =====================================================================
const selectSegment = document.getElementById('mudahale-segmenti');
const selectYontem = document.getElementById('mudahale-yontemi');
const lblEserNo = document.getElementById('lbl-eser-no');
const inputEserNo = document.getElementById('eser-no');

function segmentAyarla(segmentTipi) {
  if (!selectYontem || !lblEserNo || !inputEserNo) return;
  selectYontem.innerHTML = "";
  
  if (segmentTipi === "tasinabilir") {
    lblEserNo.innerText = "Envanter No / Tanımlayıcı Kod";
    inputEserNo.placeholder = "Örn: DOM-2026-T04";
    selectYontem.innerHTML = `
      <option value="Bistüri ile Mekanik Temizlik">🧽 Bistüri ile Mekanik Kalker Arındırması</option>
      <option value="Kimyasal Mikro Kompres">🧪 Kimyasal Kompres Uygulaması (Leke/Tuz Çıkarma)</option>
      <option value="Ultrasonik Kalemle Hassas Temizlik">🖋️ Ultrasonik Kalemle Hassas Kabuk Arındırma</option>
      <option value="Paraloid B-72 Entegrasyonu">💎 Konsolidasyon ve Kırık Parça Birleştirme</option>
    `;
  } else if (segmentTipi === "tasinmaz") {
    lblEserNo.innerText = "Uygulama Alanı / Yapı Elemanı / Pafta No";
    inputEserNo.placeholder = "Örn: Güney Duvarı, A-A Kesiti, Aks 3-4 veya Tonoz 02";
    selectYontem.innerHTML = `
      <option value="Strüktürel Mikro Enjeksiyon">🏛️ Strüktürel Mikro Enjeksiyon (Boşluk Entegrasyonu)</option>
      <option value="Paslanmaz Çelik Dikiş / Kenet">🛠️ Paslanmaz Çelik Strüktürel Dikiş Uygulaması</option>
      <option value="Özgün Harçlı Derz Restorasyonu">🧱 Enjeksiyon Destekli Özgün Harçlı Derz Dolgusu</option>
      <option value="Konsolidant Yüzey Koruma">🛡️ Taş Yüzey Konsolidasyonu (Dış Cephe Koruma)</option>
    `;
  }
}

if (selectSegment) {
  selectSegment.addEventListener('change', function() {
    segmentAyarla(this.value);
  });
}

// =====================================================================
// ⚡ DOMITIANUS TAPINAĞI RESMİ ŞABLON BUTONLARI
// =====================================================================
const btnSablonTasinabilir = document.getElementById('btn-sablon-tasinabilir');
const btnSablonTasinmaz = document.getElementById('btn-sablon-tasinmaz');

if (btnSablonTasinabilir) {
  btnSablonTasinabilir.addEventListener('click', function() {
    document.getElementById('uzman-adi').value = "Çağlar Çakır";
    document.getElementById('eser-no').value = "DOM-TAŞ-01";
    if (selectSegment) {
      selectSegment.value = "tasinabilir";
      segmentAyarla("tasinabilir");
    }
    document.getElementById('mudahale-yontemi').value = "Bistüri ile Mekanik Temizlik";
  });
}

if (btnSablonTasinmaz) {
  btnSablonTasinmaz.addEventListener('click', function() {
    document.getElementById('uzman-adi').value = "Çağlar Çakır";
    document.getElementById('eser-no').value = "DOM-GÜNEY-TONOZ-02";
    if (selectSegment) {
      selectSegment.value = "tasinmaz";
      segmentAyarla("tasinmaz");
    }
    document.getElementById('mudahale-yontemi').value = "Strüktürel Mikro Enjeksiyon";
  });
}

// =====================================================================
// 1. KURUMSAL NAVİGASYON VE SAYFA GEÇİŞ MOTORU
// =====================================================================
const menuLinks = document.querySelectorAll('.sidebar nav a');
const allSections = document.querySelectorAll('.app-section');

if (menuLinks.length > 0) {
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      menuLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      const targetId = this.getAttribute('data-target');
      
      allSections.forEach(section => section.style.display = "none");
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.style.display = "block";
      
      araYuzuTazele();
    });
  });
}

function araYuzuTazele() {
  const progressFill = document.querySelector('.stats-grid .stat-card .progress');
  const progressText = document.querySelector('.stats-grid .stat-card span');
  const txtUzmanSayisi = document.getElementById('dashboard-uzman-sayisi');
  const dashMalzemeKutusu = document.getElementById('dash-malzeme-listesi');
  
  const stokPanel = document.getElementById('stok-uyari-paneli');
  const stokMetin = document.getElementById('stok-uyari-metni');
  
  if (progressFill && progressText) {
    progressFill.style.width = projeHafizasi.mevcutYuzde + "%";
    progressText.innerText = `%${projeHafizasi.mevcutYuzde.toFixed(1)} Tamamlandı`;
  }
  if (txtUzmanSayisi) {
    txtUzmanSayisi.innerText = projeHafizasi.toplamUzmanSayisi + " Uzman";
  }

  if (dashMalzemeKutusu) {
    const mKeys = Object.keys(projeHafizasi.istatistikler.kullanilanMalzemeler);
    let kritikMalzemeler = [];

    if (mKeys.length === 0) {
      dashMalzemeKutusu.innerHTML = `<p style="font-style: italic; margin: 0;">🟢 Laboratuvarda henüz yeni harç/malzeme kullanımı girilmedi.</p>`;
    } else {
      let dinamikIcerik = "";
      mKeys.forEach(mName => {
        const adet = projeHafizasi.istatistikler.kullanilanMalzemeler[mName];
        
        if (adet >= projeHafizasi.kritikKullanimEsigi) {
          kritikMalzemeler.push(`${mName} (${adet} Fiş)`);
        }

        dinamikIcerik += `
          <div style="display:flex; justify-content:space-between; background:rgba(255,255,255,0.02); padding:6px 10px; border-radius:4px; border-left:3px solid ${adet >= projeHafizasi.kritikKullanimEsigi ? '#e74c3c' : '#00b4d8'};">
            <span style="color:#ffffff;">🧱 ${mName}</span>
            <span style="color:${adet >= projeHafizasi.kritikKullanimEsigi ? '#e74c3c' : '#00b4d8'}; font-weight:bold;">${adet} Kez Kullanıldı</span>
          </div>`;
      });
      dashMalzemeKutusu.innerHTML = dinamikIcerik;
    }

    if (stokPanel && stokMetin) {
      if (kritikMalzemeler.length > 0) {
        stokMetin.innerHTML = `Sistem uyarısı: Aşağıdaki koruyucu ekipman and harç bileşenleri kritik kullanım eşiğine ulaştı. Merkez depodan takviye edilmelidir:<br><strong>⚠️ ${kritikMalzemeler.join(', ')}</strong>`;
        stokPanel.style.display = "block";
      } else {
        stokPanel.style.display = "none";
      }
    }
  }
}

// =====================================================================
// 2. İDARİ ASKIYA ALMA / BAŞLATMA ROZETLERİ
// =====================================================================
const btnAskiyaAl = document.getElementById('btn-askiya-al');
const btnBaslat = document.getElementById('btn-baslat');
const statusBadge = document.querySelector('.status-badge');

if (btnAskiyaAl && btnBaslat && statusBadge) {
  btnAskiyaAl.addEventListener('click', function() {
    statusBadge.innerHTML = "⏸️ İDARİ KARAR / ÖDENEK BEKLENİYOR";
    statusBadge.style.color = "#ffb703";
    statusBadge.style.borderColor = "rgba(255, 183, 3, 0.3)";
    statusBadge.style.backgroundColor = "rgba(255, 183, 3, 0.1)";
    btnAskiyaAl.style.display = "none";
    btnBaslat.style.display = "block";
  });

  btnBaslat.addEventListener('click', function() {
    statusBadge.innerHTML = "🟢 RESTORASYON SÜRECİ AKTİF";
    statusBadge.style.color = "#00b4d8";
    statusBadge.style.borderColor = "rgba(0, 180, 216, 0.3)";
    statusBadge.style.backgroundColor = "rgba(0, 180, 216, 0.1)";
    btnBaslat.style.display = "none";
    btnAskiyaAl.style.display = "block";
  });
}

// =====================================================================
// 3. LABORATUVAR & STRÜKTÜREL MÜDAHALE VERİ FORMU MOTORU
// =====================================================================
const btnFormKaydet = document.getElementById('btn-form-kaydet');
const timeline = document.querySelector('.timeline');

if (btnFormKaydet && timeline) {
  btnFormKaydet.addEventListener('click', function() {
    const inputUzman = document.getElementById('uzman-adi');
    const inputEser = document.getElementById('eser-no');
    const inputMalzeme = document.getElementById('malzeme-reçete');
    
    const uzman = inputUzman.value.trim();
    const eserNo = inputEser.value.trim();
    const malzeme = inputMalzeme.value.trim() || "Belirtilmedi / Koruyucu Saf İşlem";
    const segment = document.getElementById('mudahale-segmenti').value;
    const yontem = document.getElementById('mudahale-yontemi').value;
    const durum = document.getElementById('eser-durum').value;

    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
    inputUzman.classList.remove('error-field');
    inputEser.classList.remove('error-field');

    if (uzman === "") { inputUzman.classList.add('error-field'); return; }
    if (eserNo === "") { inputEser.classList.add('error-field'); return; }

    const arananIsim = uzman.toLowerCase();
    if (!projeHafizasi.bilinenUzmanlar.includes(arananIsim)) {
      projeHafizasi.bilinenUzmanlar.push(arananIsim);
      projeHafizasi.toplamUzmanSayisi += 1;
    }

    projeHafizasi.istatistikler.toplamMudahale += 1;
    
    if (projeHafizasi.istatistikler.kullanilanMalzemeler[malzeme] === undefined) {
      projeHafizasi.istatistikler.kullanilanMalzemeler[malzeme] = 1;
    } else {
      projeHafizasi.istatistikler.kullanilanMalzemeler[malzeme] += 1;
    }

    const kartTipi = durum.includes("Devam") ? 'type-devam' : 'type-hazir';
    if (durum.includes("Teşhire Hazır")) {
      projeHafizasi.mevcutYuzde = Math.min(projeHafizasi.mevcutYuzde + 1.2, 100); 
      projeHafizasi.istatistikler.teshireHazir += 1;
    } else {
      projeHafizasi.istatistikler.devamEden += 1;
    }

    const segmentEtiketi = segment === "tasinabilir" ? "🏛️ Taşınabilir Eser Konservasyonu" : "🧱 Taşınmaz Mimari Restorasyon";
    const alanTanimi = segment === "tasinabilir" ? "Envanter No" : "Saha/Mimari Alan";

    const yeniKart = document.createElement('div');
    yeniKart.className = durum.includes("Devam") ? `timeline-card yellow-border ${kartTipi}` : `timeline-card ${kartTipi}`;
    yeniKart.innerHTML = `
      <div class="card-header">
        <h4>🧽 ${uzman}</h4>
        <span class="time">Şimdi</span>
      </div>
      <p style="font-size:11px; color:#00b4d8; font-weight:bold; margin-bottom:4px;">[${segmentEtiketi}]</p>
      <p><strong>${alanTanimi}: ${eserNo}</strong> - Sahada <strong>${yontem}</strong> uygulaması başarıyla işlenmiştir.<br>
      <small style="color:#a0a0ab;">Bileşen/Harç Reçetesi: ${malzeme}</small></p>
      <div class="badge ${durum.includes("Devam") ? 'yellow' : ''}">${durum}</div>
    `;
    
    timeline.insertBefore(yeniKart, timeline.querySelector('.timeline-card'));
    araYuzuTazele();
    
    inputEser.value = "";
    inputMalzeme.value = "";
    alert(`Sistem Bilgisi: Giriş yapılan veri [${segmentEtiketi}] disiplini altında başarıyla arşivlenmiştir.`);
    document.querySelector('.btn-filter[data-filter="all"]').click();
  });
}

// =====================================================================
// 4. EFES LOJİSTİK NAKİL SİSTEMİ
// =====================================================================
document.querySelectorAll('.eser-status-flow').forEach(flowContainer => {
  flowContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('flow-badge')) {
      if (e.target.classList.contains('active')) return;

      flowContainer.querySelectorAll('.flow-badge').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      if (e.target.getAttribute('data-status') === 'monte' && timeline) {
        const eserRow = flowContainer.closest('.eser-row');
        const eserName = eserRow.querySelector('strong').innerText;
        
        projeHafizasi.mevcutYuzde = Math.min(projeHafizasi.mevcutYuzde + 2.5, 100);
        araYuzuTazele();

        const nakilKarti = document.createElement('div');
        nakilKarti.className = 'timeline-card type-sistem';
        nakilKarti.style.borderLeftColor = '#2ecc71';
        nakilKarti.innerHTML = `
          <div class="card-header">
            <h4>🚚 Efes Müzesi Lojistik Koordinasyon Birimi</h4>
            <span class="time">Şimdi</span>
          </div>
          <p><strong>${eserName}:</strong> Yapısal konservasyonu biten parçanın mimari bütünleme noktasına montajı and kürasyon sabitlemesi tamamlanmıştır.</p>
          <div class="badge" style="background-color: rgba(46,204,113,0.1); color:#2ecc71;">Mimariye Entegre Edildi</div>
        `;
        timeline.insertBefore(nakilKarti, timeline.querySelector('.timeline-card'));
      }
    }
  });
});

// =====================================================================
// 5. RESTORASYON PROJE ADIMLARI İLERLETME MOTORU
// =====================================================================
const btnProjeIlerlet = document.getElementById('btn-proje-ilerlet');

if (btnProjeIlerlet && timeline) {
  btnProjeIlerlet.addEventListener('click', function() {
    if (projeHafizasi.projeAsamasi === 4) {
      projeHafizasi.projeAsamasi = 5;
      
      const adim4 = document.getElementById('adim-4');
      const badge4 = document.getElementById('badge-adim-4');
      if(adim4 && badge4) {
        adim4.style.borderLeftColor = '#2ecc71';
        badge4.innerText = "✅ TAMAMLANDI";
        badge4.style.color = "#2ecc71";
        badge4.style.backgroundColor = "rgba(46,204,113,0.1)";
      }
      
      const adim5 = document.getElementById('adim-5');
      const badge5 = document.getElementById('badge-adim-5');
      if(adim5 && badge5) {
        adim5.style.borderLeftColor = '#00b4d8';
        adim5.querySelector('strong').style.color = '#ffffff';
        adim5.querySelector('div').style.color = '#6b778c';
        badge5.innerText = "⏳ SÜREÇ AKTİF";
        badge5.style.color = "#00b4d8";
        badge5.style.backgroundColor = "rgba(0,180,216,0.1)";
      }
      
      projeHafizasi.mevcutYuzde = Math.min(projeHafizasi.mevcutYuzde + 5.0, 100);
      araYuzuTazele();

      const projeKarti = document.createElement('div');
      projeKarti.className = 'timeline-card type-sistem';
      projeKarti.style.borderLeftColor = '#e74c3c';
      projeKarti.innerHTML = `
        <div class="card-header">
          <h4>🏛️ Genel Müdürlük & Restorasyon Denetim Masası</h4>
          <span class="time">Şimdi</span>
        </div>
        <p><strong>Aşama Güncellemesi:</strong> Domitianus Tapınağı mimari özgün harç and taş bütünleme fazı resmi raporla kapatılmıştır. <strong>Aşama 5: Desalinasyon ve Nano Yüzey Koruma Çalışmaları</strong> resmen onaylanarak Genel Müdürlükçe yürürlüğe sokulmuştur.</p>
        <div class="badge" style="background-color: rgba(231,76,60,0.1); color:#e74c3c;">Resmi Karar İşlendi</div>
      `;
      timeline.insertBefore(projeKarti, timeline.querySelector('.timeline-card'));
    }
  });
}

// =====================================================================
// 6. CANLI FİLTRELEME & 🔥 YENİ: ANKARA ARŞİV ARAMA MOTORU ENTEGRASYONU
// =====================================================================
const filtreButonlari = document.querySelectorAll('.btn-filter');
const aramaGirdisi = document.getElementById('timeline-search-input');

function timelineSüz() {
  if (!aramaGirdisi) return;
  const arananKelime = aramaGirdisi.value.toLowerCase().trim();
  const aktifFiltreButonu = document.querySelector('.btn-filter.active');
  const aktifFiltreTipi = aktifFiltreButonu ? aktifFiltreButonu.getAttribute('data-filter') : 'all';
  
  document.querySelectorAll('.timeline-card').forEach(kart => {
    const kartMetni = kart.innerText.toLowerCase();
    
    // Kategori Filtre Koşulu
    let kategoriUyuşuyor = false;
    if (aktifFiltreTipi === "all") kategoriUyuşuyor = true;
    else if (aktifFiltreTipi === "devam" && kart.classList.contains('type-devam')) kategoriUyuşuyor = true;
    else if (aktifFiltreTipi === "hazir" && kart.classList.contains('type-hazir')) kategoriUyuşuyor = true;
    else if (aktifFiltreTipi === "sistem" && kart.classList.contains('type-sistem')) kategoriUyuşuyor = true;

    // Kelime Arama Koşulu
    const kelimeUyuşuyor = kartMetni.includes(arananKelime);

    // İki filtreyi birden kesiştirerek ekrana bas
    if (kategoriUyuşuyor && kelimeUyuşuyor) {
      kart.style.display = "block";
    } else {
      kart.style.display = "none";
    }
  });
}

if (filtreButonlari.length > 0) {
  filtreButonlari.forEach(buton => {
    buton.addEventListener('click', function() {
      filtreButonlari.forEach(b => { b.style.background = "#222"; b.classList.remove('active'); });
      this.classList.add('active');
      this.style.background = "#353540";
      timelineSüz(); // Butona basınca süzmeyi tetikle
    });
  });
}

if (aramaGirdisi) {
  aramaGirdisi.addEventListener('input', timelineSüz); // Klavyeden yazıldıkça süz
}

// =====================================================================
// 7. GENEL MÜDÜRLÜK RAPOR DERLEYİCİ MOTORU
// =====================================================================
const btnRaporUret = document.getElementById('btn-rapor-uret');
const btnRaporYazdir = document.getElementById('btn-rapor-yazdir');
const raporCiktiAlan = document.getElementById('resmi-rapor-çıktı');
const raporAktiviteListesi = document.getElementById('rapor-aktivite-listesi');

if (btnRaporUret && raporCiktiAlan && raporAktiviteListesi) {
  btnRaporUret.addEventListener('click', function() {
    raporAktiviteListesi.innerHTML = "";
    document.querySelectorAll('.timeline-card').forEach(kart => {
      const pElements = kart.querySelectorAll('p');
      const kartMetni = pElements[pElements.length - 1].innerText; 
      const yeniMadde = document.createElement('li');
      yeniMadde.innerText = kartMetni;
      raporAktiviteListesi.appendChild(yeniMadde);
    });

    const eskiTablo = document.getElementById('dinamik-analiz-tablosu');
    if (eskiTablo) eskiTablo.remove();

    let malzemeSatirlariHTML = "";
    const mKeys = Object.keys(projeHafizasi.istatistikler.kullanilanMalzemeler);
    
    if (mKeys.length === 0) {
      malzemeSatirlariHTML = `<tr style="border:1px solid #111;"><td style="padding:8px; font-style:italic;" colspan="2">• Kayıtlı mimari harç/malzeme sarfiyatı bulunmamaktadır.</td></tr>`;
    } else {
      mKeys.forEach(mName => {
        const mCount = projeHafizasi.istatistikler.kullanilanMalzemeler[mName];
        malzemeSatirlariHTML += `
          <tr style="border:1px solid #111111;">
            <td style="padding:8px; border:1px solid #111111;">&nbsp;&nbsp;• ${mName}</td>
            <td style="padding:8px; text-align:center; font-weight:bold; border:1px solid #111111; color:${mCount >= projeHafizasi.kritikKullanimEsigi ? '#e74c3c' : '#111111'};">${mCount} Uygulama Kaydı</td>
          </tr>`;
      });
    }

    const analizTablosu = document.createElement('div');
    analizTablosu.id = 'dinamik-analiz-tablosu';
    analizTablosu.style.marginTop = '20px';
    analizTablosu.style.borderTop = '2px solid #111111';
    analizTablosu.style.paddingTop = '15px';
    
    analizTablosu.innerHTML = `
      <p><strong>📊 LABORATUVAR, KONSERVASYON VE RESTORASYON ÖZET GÖSTERGELERİ:</strong></p>
      <table style="width:100%; border-collapse:collapse; font-family:'Times New Roman'; font-size:11pt; margin-top:10px;">
        <thead>
          <tr style="background-color:#f2f2f2; border:1px solid #111;">
            <th style="padding:8px; text-align:left; border:1px solid #111;">Müdahale & Yapısal Süreç Parametresi</th>
            <th style="padding:8px; text-align:center; border:1px solid #111;">Toplam İşlem Kaydı</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border:1px solid #111;">
            <td style="padding:8px; border:1px solid #111;">Toplam Yapılan Laboratuvar Konservasyon ve Şantiye Restorasyon Sayısı</td>
            <td style="padding:8px; text-align:center; font-weight:bold; border:1px solid #111;">${projeHafizasi.istatistikler.toplamMudahale}</td>
          </tr>
          <tr style="background-color:#fafafa; border:1px solid #111;">
            <td style="padding:8px; font-weight:bold; border:1px solid #111;" colspan="2">Genel Müdürlük Sarfiyat Çetelesi (Tüketilen Harç, Reçete ve Kimyasal Dağılımı)</td>
          </tr>
          ${malzemeSatirlariHTML}
        </tbody>
      </table>
    `;

    raporCiktiAlan.insertBefore(analizTablosu, raporCiktiAlan.lastElementChild);
    
    const yuzdeKutusu = raporCiktiAlan.querySelector('p span');
    if (yuzdeKutusu) yuzdeKutusu.innerText = `%${projeHafizasi.mevcutYuzde.toFixed(1)} ORANINDA TAMAMLANMIŞTIR`;

    raporCiktiAlan.style.display = "block";
    if (btnRaporYazdir) btnRaporYazdir.style.display = "inline-block";
    alert("Sistem Bilgisi: Konservasyon/Restorasyon ayrımı içeren analitik göstergeler başarıyla derlenmiştir.");
  });
}

if (btnRaporYazdir) {
  btnRaporYazdir.addEventListener('click', () => window.print());
}

// İlk açılış senkronizasyonu
araYuzuTazele();