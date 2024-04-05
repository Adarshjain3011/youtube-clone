
declare module 'form-data-parser' {
    export default function FormDataParser(
      form: HTMLFormElement
    ): Promise<{ [key: string]: string }>;

  }



