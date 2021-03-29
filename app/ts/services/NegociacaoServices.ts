

import { NegociacaoParcial, Negociacao } from '../models/index';

export class NegociacaoService {
    obterNegociacoes(handler: HandlerFunction): Promise<Negociacao[]> {//Retorna uma promisse que gera uma negociação

        return <Promise<Negociacao[]>>fetch("http://localhost:8080/dados")//buscando dados no endereço
            .then((res) => handler(res))//recebe checagem de possível erro(404 por exemplo)
            .then((res) => res.json())//converte para objetos json
            .then((dados: NegociacaoParcial[]) => dados.map((dado) => new Negociacao(new Date(), dado.vezes, dado.montante)))//mapeia objetos json para uma Negociacao
            .catch((err) => {
                console.log(err);
                throw new Error("Não foi possível importar as negociações!");
            });//caso ocorra o erro ele é descrito em nosso console
    }
}

export interface HandlerFunction{//Definimso que handle function recebe uma função que recebe um response e retorna um response, desgeneralizando a possível função que passaremos para obterNegociacoes

    (res: Response) : Response;
}