import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes } from '../models/index';

// import{ Negociacao } from "../models/Negociacao";
// import { Negociacoes } from "../models/Negociacoes";
// import { MensagemView } from "../views/MensagemView";
// import { NegociacoesView } from "../views/NegociacoesView";

export class NegociacaoController {

    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');


    constructor() {

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoesView.update(this._negociacoes);
    }

    Adiciona(event: Event): void {

        event.preventDefault();

        const negociacao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g, ',')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val()));


        // console.log(negociacao);
        this._negociacoes.Adiciona(negociacao);

        this._negociacoes.ParaArray().length = 0;//estamos tentando excluir nosso aray, entretanto ele está imutavél

        this._negociacoes.ParaArray().forEach(negociacao => {

            console.log(negociacao.data);
            console.log(negociacao.quantidade);
            console.log(negociacao.valor);
            console.log(negociacao.volume);


        })


        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("Negociação Adicionada com sucesso");

    }


}