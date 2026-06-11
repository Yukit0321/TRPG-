document
    .getElementById("pdf")
    .addEventListener("change", function () {

        document.getElementById("fileName").textContent =
            this.files.length
                ? this.files[0].name
                : "未選択";

    });

function copyText() {
    const text = document.getElementById("copyurl").innerText;

    // 通常ルート：サーバー環境（httpsなど）の場合
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
          
        }).catch(err => {
            console.error("コピーに失敗しました: ", err);
            fallbackCopy(text);
        });
    } else {
        // 予備ルート：ローカル環境（file:///）の場合
        fallbackCopy(text);
    }
}

// どんな環境でも動く予備のコピー処理
function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
       
        document.execCommand('copy');
    
    } catch (err) {
        console.error("予備コピーも失敗しました: ", err);
    }
}



