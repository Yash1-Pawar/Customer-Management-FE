export class Customer {
    [x: string]: any;

    id?:any;
    name!: string | undefined;
    skills!: string | undefined;
    desc?: string;
    gender?: string;
    friends: Customer[] = [];

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