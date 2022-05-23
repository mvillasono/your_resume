export interface RadioField {
    title: string;
    type: "radio";
    options: string[];
    required: boolean;
    note?: string;
  }
  
  export interface TextField {
    title: string;
    type: "text";
    placeholder: string;
    required: boolean;
    note?: string;
  }

  export type Field = RadioField | TextField;
  export type Check = Map<string, string>;