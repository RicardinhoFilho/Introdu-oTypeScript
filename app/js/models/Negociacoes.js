class Negociacoes {
    constructor() {
        //private _negociacoes: Array<Negociacao> = [];
        this._negociacoes = [];
    }
    Adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    ParaArray() {
        return this._negociacoes;
    }
}
