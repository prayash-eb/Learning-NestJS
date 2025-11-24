
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Report {
    @PrimaryColumn()
    id: number

    @Column()
    price: number

    @Column()
    manufacturer: string

    @Column()
    model: string

    @Column()
    year: number

    @Column()
    lat: number

    @Column()
    long: number

    @Column()
    mileage: number

}