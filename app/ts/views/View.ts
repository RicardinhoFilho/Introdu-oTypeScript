abstract class View<T>{
    
    protected _elemento: Element;

    constructor(seletor: string) {

        this._elemento = document.querySelector(seletor);
    }

    update(model: T) {

        this._elemento.innerHTML = this.template(model);

    }

    abstract template(model:T):string;//Não possui implemetação e é abstract para obrigarmos quem herdar esta classe a implementa-la
}