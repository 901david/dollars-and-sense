import { RowDataPacket } from 'mysql2';

export type ExpressHandlerCB = (results: RowDataPacket[]) => void;
