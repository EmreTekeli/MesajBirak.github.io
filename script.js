function previewMessage() {
    const message = document.getElementById('message').value;
    const dateInput = document.getElementById('date');
    const date = new Date(dateInput.value);

    // Şu anki tarihi al
    const now = new Date();

    // Eğer belirlenen tarih şu andan önceyse, uyarı ver ve işlemi sonlandır
    if (date <= now) {
        alert('Lütfen ileri bir tarih seçin.');
        return;
    }

    const previewMessageElement = document.getElementById('previewMessage');
    previewMessageElement.innerHTML = ''; // Mesajı temizle

    // Harf harf animasyonunu başlat
    for (let i = 0; i < message.length; i++) {
        const span = document.createElement('span');
        span.textContent = message[i];
        span.style.animationDelay = `${i * 0.1}s`; // Her harfin animasyon başlatma gecikmesi
        previewMessageElement.appendChild(span);
    }

    document.getElementById('previewDate').textContent = `Tarih ve Saat: ${date.toLocaleString()}`;

    // jwt-simple kütüphanesini kullanarak JWT oluştur
    const secretKey = 's3cr3tK3y'; // Güvenli bir şekilde saklanmalıdır
    const messageData = { message, date: date.toISOString() };
    const token = encodeJWT(messageData, secretKey); // Geçerlilik süresi 1 saat

    // Mesaj önizleme linkini oluştur
    const previewLink = `preview.html?token=${token}`;
    document.getElementById('previewLink').innerHTML = `<a href="${previewLink}" target="_blank">Ön İzleme Linki</a>`;

    // Sayacı güncelle
    updateCountdown(date);

    document.getElementById('preview').classList.remove('hidden');
}

document.getElementById('messageForm').addEventListener('submit', function (event) {
    // Bu kısım server tarafına mesajı göndermek için kullanılır.
    // Ancak, bu örnek sadece tarayıcıda çalıştığı için server tarafına iletişim eklenmemiştir.
    event.preventDefault();
    alert('Mesajınız başarıyla gönderildi!');
});

function updateCountdown(targetDate) {
    const countdownElement = document.getElementById('countdown');

    // Hedef tarihten şu anki tarihe kadar olan süreyi hesapla
    const now = new Date();
    const timeDifference = targetDate - now;

    // Süreyi gün, saat, dakika ve saniye olarak böl
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Sayacı güncelle
    countdownElement.textContent = `Geri sayım: ${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye`;
}

// jwt-simple benzeri encodeJWT fonksiyonunu oluşturun
function encodeJWT(payload, key) {
    const encoded = btoa(JSON.stringify(payload)); // Base64 kodlama
    const signature = btoa(key);
    return `${encoded}.${signature}`;
}