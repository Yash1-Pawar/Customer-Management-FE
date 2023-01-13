export class Customer {

    id?:any;
    name!: string | undefined;
    password?:string;
    skills!: string | undefined;
    desc?: string;
    gender?: string;
    customers: Customer[] = [];
    friends: string[] = [];
    
    constructor(id?:any, name?: string, skills?: string, desc?: string, gender?: string) {
        this.id=id;
        this.name = name;
        this.skills = skills;
        this.desc = desc;
        this.gender=gender;
    }

    setGender() {
        
    }

}