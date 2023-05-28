import fs from "fs";
import csv from "csv-parser";
import { json2csv } from "json-2-csv";

import { INPUT_PATH, OUTPUT_PATH } from "../utils/constants";

async function readCSVFile<T>(fileName: string): Promise<T[]> {
  const results: T[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(`${INPUT_PATH}/${fileName}`)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

async function writeCSVFile<T>(fileName: string, data: T[]) {
  const response = await json2csv(JSON.parse(JSON.stringify(data)));

  fs.writeFile(`${OUTPUT_PATH}/${fileName}`, response, function (err) {
    if (err) throw err;
  });
}

export { readCSVFile, writeCSVFile };
