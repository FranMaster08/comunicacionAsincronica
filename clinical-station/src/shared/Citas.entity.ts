import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('citas', { schema: 'citas' })
export class Citas {
  @PrimaryGeneratedColumn({ type: 'int', name: 'idcitas' })
  idcitas: number;

  @Column('varchar', { name: 'name', length: 45 })
  name: string;

  @Column('int', { name: 'age' })
  age: number;

  @Column('tinyint', { name: 'status' })
  status: number;
}
