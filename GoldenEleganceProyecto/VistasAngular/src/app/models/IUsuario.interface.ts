export interface IUsuario{
    PkUsuario: number,
    nombre : string,
    username: string,
    apellido: string,
    correo: string,
    password : string,
    token: string,
    emailconfirmed: boolean,
    telefono: string,
    direccion : string
    fkRol: number
    roles?: Roles
   
}
export  interface Roles{
    pkRol: number,
    nombre: string,
    descripcion: string

}
