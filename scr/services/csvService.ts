import csv from 'csv-parser';
import fs from 'fs';
import { INPUT_PATH } from "../utils/constants";

async function readCSVFile<T>(file: string): Promise<T[]> {
  const results: T[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(`${INPUT_PATH}/${file}`)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

export { readCSVFile };