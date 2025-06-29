import { Entity } from '@loopback/repository';
export declare class Classificacao extends Entity {
    id?: number;
    estrelas: number;
    comentario?: string;
    data: string;
    encomendaId: number;
    constructor(data?: Partial<Classificacao>);
}
export interface ClassificacaoRelations {
}
export type ClassificacaoWithRelations = Classificacao & ClassificacaoRelations;
