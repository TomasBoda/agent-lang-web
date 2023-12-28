
export interface CodeItem {
    label: string;
    code: string;
    steps: number;
    delay: number;
}

export interface CodeItemPartial {
    label?: string;
    code?: string;
    steps?: number;
    delay?: number;
}