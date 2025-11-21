
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Report {
    @PrimaryColumn()
    id: number

    @Column()
    price: number

}