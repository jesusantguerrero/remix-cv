export interface IndexData {
  name: string;
};

export interface FormDataResponse {
  data: Record<string, any>;
  errors: Record<string, boolean>|null;
};