import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('personal')
export class Personal {
@PrimaryGeneratedColumn({ name: 'id_personal' })
idPersonal: number;
@Column({ name: 'nombre', type: 'varchar', length: 250})
nombre: string;
@Column({ name: 'apellido_paterno', type: 'varchar', length: 100})
apellidoPaterno: string;
@Column({ name: 'apellido_materno', type: 'varchar', length: 100})
apellidoMaterno: string;
@Column({ name: 'usuario', type: 'varchar', length: 100})
usuario: string;
@Column({ name: 'contrasena', type: 'varchar', length: 256})
contrasena: string;
 @Column({ name: 'dni', type: "varchar", length: 20, unique: true })
dni: string;
@Column({name: 'correo',type: 'varchar',length: 150})
correo: string;
@Column({name: 'direccion', type: 'varchar', length: 150})
direccion: string;

@CreateDateColumn({ name: 'fecha_creacion_auditoria', type: 'timestamp' })
  fechaCreacion: Date;

  @Column({ name: 'estado_auditoria', type: 'bit', default: true })
  estado: boolean;
}