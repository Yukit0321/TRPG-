/*
    ファイル名表示
*/
document.getElementById("pdf").addEventListener("change", function () {
  console.log("ファイルが選択されました:", this.files); // ログ追加
  document.getElementById("fileName").textContent = this.files.length
    ? this.files[0].name
    : "未選択";
});

/*
    コピー
*/
function copyText() {
  const text = document.getElementById("copyurl").textContent;
  console.log("コピーするテキスト:", text); // ログ追加
  navigator.clipboard.writeText(text);

  alert("コピーしました");
}

/*
    アップロード
*/
function createId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
}

async function uploadPDF() {
  const file = document.getElementById("pdf").files[0];

  if (!file) {
    alert("PDFを選択してください");
    return;
  }

  console.log("アップロード開始するファイル:", file.name, file.size, file.type); // ログ追加

  let id;
  let result;
  let attempt = 0; // ループ回数のカウント用

  try {
    do {
      attempt++;
      /*
          URL用ID生成
      */
      id = createId();
      console.log(`[試行 ${attempt}] 生成されたID:`, id); // ログ追加

      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("id", id);

      console.log("PHPへ送信中..."); // ログ追加

      const response = await fetch("php/upload.php", {
        method: "POST",
        body: formData,
      });

      // HTTPステータスコードのチェック（404や500エラー対策）
      console.log(
        "PHPからのレスポンスステータス:",
        response.status,
        response.statusText,
      );

      result = await response.text();
      console.log("PHPから返ってきた生データ:", result); // ログ追加
    } while (result === "duplicate");

    if (result !== "success") {
      console.error(
        "アップロード処理が失敗判定になりました。resultが 'success' ではありません。",
      ); // ログ追加
      alert("アップロード失敗");
      return;
    }

    const url = `${location.origin}/select.html?id=${id}`;
    console.log("生成されたURL:", url); // ログ追加

    /*
        URL表示
    */
    document.getElementById("copyurl").textContent = url;
    document.querySelector(".url").style.display = "flex";

    /*
        QRコード生成
    */
    console.log("QRコードを生成します"); // ログ追加
    document.getElementById("qrcode").innerHTML = "";

    new QRCode(document.getElementById("qrcode"), {
      text: url,
      width: 180,
      height: 180,
    });

    console.log("全ての処理が正常に完了しました！"); // ログ追加
  } catch (error) {
    // ネットワークエラーやスクリプト自体のエラーをキャッチする
    console.error("JavaScript実行中に致命的なエラーが発生しました:", error);
    alert("エラーが発生しました。コンソールを確認してください。");
  }
}
