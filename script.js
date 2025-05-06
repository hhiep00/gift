var qrText = "https://hhiep00.github.io/gift";
new QRCode(document.getElementById("qrcode"), qrText);

const radios = document.querySelectorAll('.columns input[type="radio"]');
radios.forEach(radio => {
    radio.addEventListener('change', () => {
        radios.forEach(r => r.parentElement.classList.remove('active'));
        radio.parentElement.classList.add('active');
    });
});

let isSubmitting = false;

function sendGiftToSheet(sheetName) {
    if (isSubmitting) {
        alert("Đang tiến hành gửi, Bấm OK !");
        return;
    }

    const inputData = document.getElementById("inputData").value.trim();
    const selectedType = document.querySelector('input[name="giftType"]:checked')?.value;
    if (!inputData) return alert("Vui lòng nhập link gift");
    if (!selectedType) return alert("Vui lòng chọn loại gift");

    isSubmitting = true;
    setTimeout(() => {
        isSubmitting = false;
    }, 5000);

    const params = new URLSearchParams({
        sheetName: sheetName,
        giftType: selectedType,
        link: inputData
    });
    const url = 'https://script.google.com/macros/s/AKfycbzAiKPt8K16i-WzxLkSSVjwt-atTHA4CV5H-Xavys2Zjxy67ifLRcyyIrdCdBYY_5ug/exec';

    console.log(sheetName, selectedType, inputData);
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
    })
        .then(res => res.ok ? res.text() : Promise.reject('Lưu lỗi'))
        .then(data => {
            if (data.startsWith('Success')) {
                const stt = data.split('-')[1]; 
                alert(`✅ Lưu thành công: ${selectedType}, STT ${stt}`);
            } else {
                alert(`❌ Lưu lỗi: ${data}`);
            }
            // location.reload();
        })
        .catch(err => {
            console.error(err);
            alert("❌ Có lỗi xảy ra, vui lòng thử lại!");
        });
}