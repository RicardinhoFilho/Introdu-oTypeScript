class Negociacoes {
    constructor() {
        //private _negociacoes: Array<Negociacao> = [];
        this._negociacoes = [];
    }
    Adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    ParaArray() {
        return [].concat(this._negociacoes); //retornamos uma cópia de nosso array, o tornando imútavel
    }
}
