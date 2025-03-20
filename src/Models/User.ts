export class User {
    email: String
    password: String
    clientType: String

    constructor (email: String, password: String, clienType: String) {
        this.email = email;
        this.password = password;
        this.clientType = clienType;
    }
}