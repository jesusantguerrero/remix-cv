import { FormDataResponse } from "../types";
import path from "path";
import fs from "fs";
import cvs from "../cv.json";
import { v4 as uuidv4 } from "uuid";

export const getFormData = (formData: FormData, fields: string[], ): FormDataResponse => {
    let errors: Record<string, boolean>|null = {};
    const data: Record<string, any> = {};
    errors = fields.reduce((errors, field ) => {
      data[field] = formData.get(field); 
      if (!data[field]) {
        errors[field] = true;
      } 
      return errors;
    }, errors);
  
    if (Object.keys(errors).length == 0) {
      errors = null;
    }
  
    return { data , errors };
}

export const getCvFile = (): string => {
  return fs.readFileSync(path.join(__dirname, "../cv.json"), "utf8");
}

export const createCv = (CvData: Record<string, any>): string  => {
    const id = uuidv4();
    fs.writeFile(
        path.join(__dirname,'..', 'cv.json'),
        JSON.stringify({ [id]: CvData }),
        (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        }
    );
    return id;
}

export const getCvById = async (id: string) => {
    if (Object.keys(cvs).length) {
      const cv = JSON.parse(getCvFile())[id];
      return cv;
    }
}