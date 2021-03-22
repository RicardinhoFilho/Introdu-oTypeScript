class Negociacoes {

    //private _negociacoes: Array<Negociacao> = [];
    private _negociacoes: Negociacao[] = [];

    Adiciona(negociacao: Negociacao) {

        this._negociacoes.push(negociacao);
    }

    ParaArray() {

        return this._negociacoes;

    }
}