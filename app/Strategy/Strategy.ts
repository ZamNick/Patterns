/* 
   Паттерн Стратегия определяет семейство алгоритмов, инкапсулирует 
   каждый из них и обеспечивает их взаимозаменяемость. Он позволяет 
   модифицировать алгоритмы независимо от их использования на стороне 
   клиента. 
*/

interface Strategy {
    execute(a : number, b : number) : number;
}

class ConcreteStrategyAdd implements Strategy {
    public execute(a : number, b : number) : number {
        return a + b;
    }
}

class ConcreteStrategySubtract implements Strategy {
    public execute(a : number, b : number) : number {
        return a - b;
    }
}

class ConcreteStrategyMultiply implements Strategy {
    public execute(a : number, b : number) : number {
        return a * b;
    }
}

class Context {
    private strategy : Strategy;

    constructor() { }

    public setStrategy(strategy: Strategy) : void {
        this.strategy = strategy;
    }

    public executeStrategy(a : number, b : number) : number {
        return this.strategy.execute(a, b);
    }
}


/* MAIN PART */
console.log('--- STRATEGY PATTERN ---');

let context = new Context();

context.setStrategy(new ConcreteStrategyAdd());
console.log(context.executeStrategy(1, 2));

context.setStrategy(new ConcreteStrategySubtract());
console.log(context.executeStrategy(3, 4));

context.setStrategy(new ConcreteStrategyMultiply());
console.log(context.executeStrategy(5, 6));

console.log('------------------------');