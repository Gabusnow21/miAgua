export enum UserRole {
  ADMIN = 'ADMIN',
  OPERADOR = 'OPERADOR',
  VECINO = 'VECINO'
}

export enum PaymentStatus {
  PENDIENTE = 'PENDIENTE',
  EN_REVISION = 'EN_REVISION',
  PAGADO = 'PAGADO',
  RECHAZADO = 'RECHAZADO'
}

export interface Usuario {
  id?: number;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  enabled: boolean;
}

export interface Propiedad {
  id?: number;
  codigo: string;
  direccion: string;
  propietarioId: number;
  nombrePropietario?: string;
  activo: boolean;
}

export interface Lectura {
  id?: number;
  propiedadId: number;
  codigoPropiedad?: string;
  lecturaAnterior: number;
  lecturaActual: number;
  consumo: number;
  mes: number;
  anio: number;
  fechaLectura: string;
  registradoPorNombre?: string;
  observaciones?: string;
}

export interface Tarifa {
  id?: number;
  nombre: string;
  cuotaFija: number;
  precioMetroCubico: number;
  activa: boolean;
}

export interface Recibo {
  id?: number;
  lecturaId: number;
  codigoPropiedad: string;
  nombrePropietario: string;
  consumo: number;
  montoTotal: number;
  fechaVencimiento: string;
  estado: PaymentStatus;
  fechaEmision: string;
  mes: number;
  anio: number;
}

export interface Pago {
  id?: number;
  reciboId: number;
  montoPagado: number;
  fechaPago: string;
  metodoPago: string;
  comprobanteUrl?: string;
  referenciaTransaccion?: string;
  verificadoPorNombre?: string;
  fechaVerificacion?: string;
}
