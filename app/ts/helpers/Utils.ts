import { Imprimivel } from '../models/index'

export function Imprime(...negociacoes: Imprimivel[]) {//Só recebo quem implementa imprimivel

    negociacoes.forEach(negociacao => negociacao.paraTexto());

}