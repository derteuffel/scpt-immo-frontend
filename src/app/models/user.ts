import { Role } from "../enums/role.enum";

export class User{
    id: number;
    firstname: string;
    lastname: string;
    province: string
    username: string;
    email: string;
    telephone: string;
    fonction: string;
    password: string;
    enabled: boolean;
    token: string;
    lastLoginDate?: Date;
    idNumber: string;
    matricule: string;
    role: Role;
    
    

    constructor(){
        this.id = 0;
        this.username = '';
        this.email = '';
        this.firstname = '';
        this.lastname = '';
        this.province = '';
        this.telephone = '';
        this.fonction = '';
        this.password = '';
        this.enabled = false;
        this.token = '';
        this.lastLoginDate = null as any;
        this.idNumber = '';
        this.matricule = '';
        this.role = Role as any;
        
    }
}