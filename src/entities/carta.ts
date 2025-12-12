import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("carta")
export class Carta {
  @PrimaryGeneratedColumn({ name: "id_carta", type: "int" })
  idCarta: number;

  @Column({ type: "text" })
  descripcion: string;

  @Column({ type: "bytea" })
  imagen: Buffer;

  @Column({ name: "imagen_mime", type: "varchar", length: 100 })
  imagenMime: string;

  @Column({ name: "imagen_nombre", type: "varchar", length: 255, nullable: true })
  imagenNombre: string;

  @Column({ type: "int", default: 0 })
  stock: number;

  @CreateDateColumn({ name: "fecha_creacion_auditoria", type: "timestamp" })
  fechaCreacion: Date;

  @Column({ name: "estado_auditoria", type: "boolean", default: true })
  estado: boolean;
}