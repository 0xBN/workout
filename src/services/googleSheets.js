const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

export const sheetsReq = async (method, endpoint, body, token, sheetId) => {
  if (!token) return null;
  const url = `${BASE_URL}/${sheetId}${endpoint}`;
  const r = await fetch(url, {
    method,
    headers: { 
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json' 
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!r.ok) return null;
  return r.json();
};

export const logSetToSheet = async (token, sheetId, rowData, currentDay, exId, setNum) => {
  const dateStr = rowData[0];
  const allRows = await sheetsReq('GET', `/values/log!A1:K2000`, null, token, sheetId);
  const rows = allRows?.values || [];
  
  let rowIndex = -1;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === dateStr && rows[i][1] === currentDay && rows[i][5] === exId && String(rows[i][7]) === String(setNum)) {
      rowIndex = i + 1;
      break;
    }
  }

  if (rowIndex > 0) {
    return sheetsReq('PUT', `/values/log!A${rowIndex}:K${rowIndex}?valueInputOption=RAW`, { values: [rowData] }, token, sheetId);
  } else {
    return sheetsReq('POST', `/values/log!A1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, { values: [rowData] }, token, sheetId);
  }
};
