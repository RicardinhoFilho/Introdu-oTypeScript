import { logarTempoDeExecucao, domInject, throttle } from "../helpers/decorators/index";
import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { NegociacaoService } from '../services/NegociacaoServices'


// import{ Negociacao } from "../models/Negociacao";
// import { Negociacoes } from "../models/Negociacoes";
// import { MensagemView } from "../views/MensagemView";
// import { NegociacoesView } from "../views/NegociacoesView";

export class NegociacaoController {

    //  @domInject("#data")
    //  private _inpuData: JQuery;
    //  @domInject("#quantidade")
    //  private _inpuQuantidade: JQuery;
    //  @domInject("#valor")
    //  private _inpuValor: JQuery

    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    private _negociacaoService = new NegociacaoService();


    constructor() {

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoesView.update(this._negociacoes);
    }

    //@logarTempoDeExecucao()
    @throttle()//decorator que não permite execução em menos de 500ms
    Adiciona(event: Event): void {


        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        //bloquear transações feitas no domingo e no sábado
        if (this._VerificaDiaUtil(data)) {

            this._mensagemView.update("<p class='alert alert-danger'>Não é permitido negociações fora de dia úteis</p>");
            return;
        }

        const negociacao = new Negociacao(
            data,
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
        this._mensagemView.update("<p class='alert alert-info'>Negociação Adicionada com sucesso</p>");


        // console.log(`Tempo de execução -> ${t2 - t1}ms`);
    }

    //domingo -> getDay() == 0
    //sabado -> getDay() == 6
    private _VerificaDiaUtil(data: Date) {

        return data.getDay() == DiaDaSemana.Sabado || data.getDay() == DiaDaSemana.Domingo;
    }
    @throttle()
    //função consumindo dados de nossa api
    importaDados() {
        //alert("Deu Certo!");

        function isOk(res: Response) {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }

        this._negociacaoService.obterNegociacoes(isOk)
            .then(negociacoes => {
                negociacoes.forEach(negociacao =>
                    this._negociacoes.Adiciona(negociacao));
                this._negociacoesView.update(this._negociacoes)
            });



    }

}

enum DiaDaSemana {

    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}