import {View} from "./View"

export class MensagemView extends View<string>{


    template(model: string) {

        return `${model}`;

    }
}