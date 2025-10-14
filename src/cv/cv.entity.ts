import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/user.entity';
import { Skill } from '../skill/skill.entity';

@Entity()
export class Cv {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  cin: string;

  @Column({ nullable: true })
  job: string;

  @Column({ nullable: true })
  path: string;

  @ManyToOne(() => User, (u) => u.cvs)
  user: User;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];
}
