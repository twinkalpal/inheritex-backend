import {Entity,PrimaryGeneratedColumn,Column,ObjectIdColumn,ObjectId, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm"


@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectId

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({unique:true})
    email: string

    @Column({length:10})
    mobile: string

    @Column({select:false})
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({default:false})
    isDeleted: boolean

}