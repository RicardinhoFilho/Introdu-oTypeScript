export class Negociacao {

    // private _data: Date;
    // private _quantidade: number;
    // private _valor: number;

    // constructor(data: Date, quantidade: number, valor: number) {
    //     this._data = data;
    //     this._quantidade = quantidade;
    //     this._valor = valor;
    // }

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) { }

    // get data() {
    //     return this._data;
    // }

    // get quantidade() {

    //     return this._quantidade;
    // }

    // get valor() {

    //     return this._valor;
    // }

    get volume() {
        return this.quantidade * this.valor;
    }
}