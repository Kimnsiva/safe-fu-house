import { z } from 'zod';

export const UserRoleSchema = z.enum(['OWNER', 'STAFF']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const OrderStatusSchema = z.enum(['NEW', 'PREPARING', 'READY', 'DONE', 'CANCELLED']);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

export const BookingStatusSchema = z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']);
export type BookingStatus = z.infer<typeof BookingStatusSchema>;

export const OrderTypeSchema = z.enum(['PICKUP', 'DELIVERY']);
export type OrderType = z.infer<typeof OrderTypeSchema>;
