
export interface CodeItem {
    label: string;
    code: string;
    steps: number;
    delay: number;
    updatedAt?: Date;
}

export interface CodeItemPartial {
    label?: string;
    code?: string;
    steps?: number;
    delay?: number;
}