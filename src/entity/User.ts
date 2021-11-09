import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Tblsekolah {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    address:string;
    
    @Column()
    age:number;
    
           
}
