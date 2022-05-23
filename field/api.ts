import axios from "axios";
import Papa from "papaparse";

import {Field as IField, RadioField, TextField} from "./types";

interface RawField {
  title: string;
  type: "radio" | "text";
  text: string;
  note: string;
  required: boolean;
}

function normalize(data: RawField[]): IField[] {
  return data.map((field) => {
    if (field.type === "radio") {
      return {
        title: field.title,
        options: field.text.split(",").map((option) => option.trim()),
        required: field.required,
        note: field.note || "",
        type: "radio",
      } as RadioField;
    } else if (field.type === "text") {
      return {
        title: field.title,
        placeholder: field.text,
        required: field.required,
        note: field.note || "",
        type: "text",
      } as TextField;
    }

    throw new Error("Unknown field type");
  }, []);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  list: async (): Promise<IField[]> => {
    return axios
      .get("https://docs.google.com/spreadsheets/d/e/2PACX-1vSGi1rR_BtintNcA-ZqJkLWOU0GlcW6SaHYnBwA698OxDeYeCiBCi2d8I8CCl7sJU-xsYxgonxuQtLc/pub?gid=0&single=true&output=csv", {
        responseType: "blob",
      })
      .then(
        (response) =>
          new Promise<IField[]>((resolve, reject) => {
            Papa.parse(response.data, {
              header: true,
              complete: (results) => {
                const data = normalize(results.data as RawField[]);

                return resolve(data);
              },
              error: (error) => reject(error.message),
            });
          }),
      );
  }
};
