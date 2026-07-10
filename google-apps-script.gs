function doGet(e) {
  var output = ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Google Apps Script is running" })
  );
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById("1fCbKC0QAaex-8Rt5g0WYFvW2z_ZwhiL9OGD4ZqA6q2Y");
    var sheet = ss.getSheetByName("Dados Anny");

    if (!sheet) {
      sheet = ss.insertSheet("Dados Anny");
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Action", "Details", "Section"]);
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.action || "",
      data.details || "",
      data.section || ""
    ]);

    var output = ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    );
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  } catch (err) {
    var output = ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    );
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
