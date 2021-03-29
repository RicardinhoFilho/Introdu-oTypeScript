import { MeuObjeto,Negociacao} from "./index"
//import { logarTempoDeExecucao } from "../helpers/decorators/index";

export class Negociacoes implements MeuObjeto<Negociacoes> {
   

    //private _negociacoes: Array<Negociacao> = [];
    private _negociacoes: Negociacao[] = [];

    Adiciona(negociacao: Negociacao) {

        this._negociacoes.push(negociacao);
    }

    //@logarTempoDeExecucao()
    ParaArray(): Negociacao[] {

        return ([] as Negociacao[]).concat(this._negociacoes);//retornamos uma cópia de nosso array, tornando o verdadeiro imutavel

    }

    ParaTexto(){

        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.ParaArray);
    }

    paraTexto(): void {
        console.log(JSON.stringify(this._negociacoes));
    }
}