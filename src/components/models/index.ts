export enum ECellValue {
    X = 'X',
    O = 'O',
    Empty = 'Empty'
}

export interface IParams {
    index: number,
    value: ECellValue,
    click: (index: number) => void
}
