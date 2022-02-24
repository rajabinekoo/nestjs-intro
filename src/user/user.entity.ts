import { Exclude } from 'class-transformer';
import { Task } from 'src/task/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  email: string;

  @OneToMany((type) => Task, (task) => task.user)
  tasks: Task[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
