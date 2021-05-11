export interface IForm {
    id?: number | string;
    owner?: IUser;
    name: string;
    fields?: IFormField[];
    background: string; // picture or color or none;
    formCode: string; // code for insert form in any page.
    createdAt: Date;
}
