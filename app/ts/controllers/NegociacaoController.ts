import { logarTempoDeExecucao, domInject, throttle } from "../helpers/decorators/index";
import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { NegociacaoService, HandlerFunction } from '../services/NegociacaoServices'
import { Imprime } from '../helpers/index'

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

        Imprime(negociacao)

        this._negociacoes.Adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("<p class='alert alert-info'>Negociação Adicionada com sucesso</p>");
    }

    //domingo -> getDay() == 0
    //sabado -> getDay() == 6
    private _VerificaDiaUtil(data: Date) {

        return data.getDay() == DiaDaSemana.Sabado || data.getDay() == DiaDaSemana.Domingo;
    }
    @throttle()//só permite buscar transações em um intervalo de3 500ms
    //função consumindo dados de nossa api
    async importaDados() {

        try {
            //alert("Deu Certo!");
            function isOk(res: Response) {//recebe ResponseType
                if (res.ok) {
                    return res;//retorna Response
                } else {
                    throw new Error(res.statusText);
                }
            }

            const negociacoesParaImportar = await this._negociacaoService.obterNegociacoes(isOk)
                .then(negociacoesParaImportar => {

                    const negociacoesJaImportadas = this._negociacoes.ParaArray();

                    negociacoesParaImportar
                        .filter(negociacao =>
                            !negociacoesJaImportadas.some(jaImportada => negociacao.ehIgual(negociacao)))//recebemos como retorno se a negociacão já foi importada, caso isso tenha orcorrido, com "!" invertemos o resultado do filtro 
                        .forEach(negociacao =>
                            this._negociacoes.Adiciona(negociacao));
                    this._negociacoesView.update(this._negociacoes)
                }).catch(err => {
                    this._mensagemView.update(err.message);
                })
        } catch(error) {

            this._mensagemView.update(`<p class='alert alert-danger'>${error}</p>`);

        }




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