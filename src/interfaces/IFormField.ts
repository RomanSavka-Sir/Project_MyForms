interface IFormField {
    name: string;
    pattern: RegExp; // for validation
    type: string;
    variants: string;
    placeholder: string;
    formControl: string;
}
