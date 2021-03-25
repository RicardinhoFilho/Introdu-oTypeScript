import { Negociacao } from "./Negociacao"
//import { logarTempoDeExecucao } from "../helpers/decorators/index";

export class Negociacoes {

    //private _negociacoes: Array<Negociacao> = [];
    private _negociacoes: Negociacao[] = [];

    Adiciona(negociacao: Negociacao) {

        this._negociacoes.push(negociacao);
    }

    //@logarTempoDeExecucao()
    ParaArray(): Negociacao[] {

        return ([] as Negociacao[]).concat(this._negociacoes);//retornamos uma cópia de nosso array, o tornando imútavel

    }
}