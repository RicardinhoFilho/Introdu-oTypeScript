class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    Adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    ParaArray() {
        return [].concat(this._negociacoes);
    }
}
