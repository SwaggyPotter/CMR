export class User {
    firstName = ''
    lastName = ''
    birthDate = ''
    street = ''
    zipCode = ''
    city = ''
    constructor(obj?: any) {
        this.firstName = obj ? obj.firstname : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }
}