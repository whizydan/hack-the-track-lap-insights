import Papa from "papaparse";

export const parseCsv = async (filePath: string) => {
  const res = await fetch(filePath);
  const csvText = await res.text();

  return new Promise<any[]>((resolve) => {
    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};
