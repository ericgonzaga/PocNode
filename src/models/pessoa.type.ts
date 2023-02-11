export interface IPessoa {
    id: number;
    name: string;
    age: number;
    email?: string;
}

export type IPessoaBody = Omit<IPessoa, 'id'>;