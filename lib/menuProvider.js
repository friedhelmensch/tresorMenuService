const PDFParser = require("pdf2json");

exports.getMenuRawData = async function(fetch) {
  const menuResponse = await fetch(
    "https://www.restaurantamgolfpark.de/index_htm_files/Wochenkarte.pdf"
  );
  const menuBuffer = await menuResponse.buffer();
  const pdfAsText = await getPdfAsText(menuBuffer);
  return pdfAsText;
};

getPdfAsText = async function(menuBuffer) {
  return new Promise(function(resolve, reject) {
    var pdfParser = new PDFParser(this, 1);
    pdfParser.on("pdfParser_dataError", errData => {
      reject(errData);
    });

    pdfParser.on("pdfParser_dataReady", pdfData => {
      var pdfAsText = pdfParser.getRawTextContent();
      resolve(pdfAsText);
    });
    pdfParser.parseBuffer(menuBuffer);
  });
};
