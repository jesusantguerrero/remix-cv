import { FormDataResponse } from "../types";

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
  
    if (Object.keys(errors).length) {
      errors = null;
    }
  
    return { data , errors };
}