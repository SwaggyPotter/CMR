export class User {
    firstName: string
    lastName: string
    birthDate: number
    street: string
    zipCode: string
    city: string
    id: string
    email: string = '';
    notes: any = [];
    title: any = [];
    income: number = 0;
    joinMonth: number;
    joinYear: number;
    tel: number = 0;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.id = obj ? obj.id : ''
        this.email = obj ? obj.email : '';
        this.tel = obj ? obj.tel : '';
        this.notes = [];
        this.title = [];
        this.income = obj ? obj.income : '';
        this.joinMonth = 0;
        this.joinYear = 0;
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            id: this.id,
            email: this.email,
            notes: this.notes,
            title: this.title,
            income: this.income,
            joinMonth: this.joinMonth,
            joinYear: this.joinYear,
            tel: this.tel,
        }
    }
}