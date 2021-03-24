
export abstract class View<T>{

    protected _elemento: JQuery;

    constructor(seletor: string) {

        this._elemento = $(seletor);
    }

    update(model: T) {

        this._elemento.html(this.template(model));

    }

    abstract template(model: T): string;//Não possui implemetação e é abstract para obrigarmos quem herdar esta classe a implementa-la
}