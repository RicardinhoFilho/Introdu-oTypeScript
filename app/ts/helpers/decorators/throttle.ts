export function throttle(miliseconds = 500) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;
        let timer = 0;
        descriptor.value = function (...args: any[]) {
            if(event) event.preventDefault();//se o método possui event, vamos prevenir o comportamento padrão para a página não recarregar 
            clearInterval(timer);
            timer = setTimeout(()=> metodoOriginal.apply(this,args), miliseconds);

        }

        return descriptor;
    }
}