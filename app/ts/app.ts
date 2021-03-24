import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();
$('.form').submit(controller.Adiciona.bind(controller));