const params = new URLSearchParams(location.search);

const id = params.get("id");
const file = params.get("file");

if (!id) {
  alert("IDがありません");
  throw new Error("IDなし");
}

if (!file) {
  alert("ファイル名がありません");
  throw new Error("filenameなし");
}

const pdfUrl = `PDF/${id}.pdf`;

document.getElementById("pagetitle").textContent = "PDF-" + file;

document.getElementById("viewBtn").href = pdfUrl;

document.getElementById("downloadBtn").href = pdfUrl;
document.getElementById("downloadBtn").download = file;
