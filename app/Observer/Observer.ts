/*
    Паттерн Наблюдатель определяет отношение "один-ко-многим" между объектами
    таким образом, что при изменении состояния одного объекта происходит
    автоматическое оповещение и обновление всех зависимых объектов.
*/

interface Subject {
    registerObserver(o : Observer) : void;
    removeObserver(o : Observer) : void;
    notifyObservers() : void;
}

interface Observer {
    update(temp : number, humidity : number, pressure : number) : void;
}

interface DisplayElement {
    display() : void;
}

class WeatherData implements Subject {
    private observers : Array<Observer>;
    private temperature : number;
    private humidity : number;
    private pressure : number;

    constructor() {
        this.observers = new Array<Observer>();
    }

    public registerObserver(o : Observer) : void {
        this.observers.push(o);
    }

    public removeObserver(o : Observer) : void {
        let index = this.observers.indexOf(o);
        if(index > -1) {
            this.observers.splice(index, 1);
        }
    }

    public notifyObservers() : void {
        for(let i = 0; i < this.observers.length; ++i) {
            this.observers[i].update(this.temperature, this.humidity, this.pressure);
        }
    }

    public measurementsChanged() {
        this.notifyObservers();
    }

    public setMeasurements(temperature : number, humidity : number, pressure : number) : void {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.measurementsChanged();
    }
}

class CurrentConditionsDisplay implements Observer, DisplayElement {
    private temperature : number;
    private humidity : number;
    private weatherData : Subject;

    constructor(weatherData : WeatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }

    public update(temperature : number, humidity : number, pressure : number) : void {
        this.temperature = temperature;
        this.humidity = humidity;
        this.display();
    }

    public display() : void {
        console.log('Current conditions: ' + this.temperature + 'F degrees and ' + this.humidity + '% humidity');
    }
}


/* MAIN PART */
console.log('--- OBSERVER PATTERN ---');

let weatherData = new WeatherData();
let currentConditionsDisplay = new CurrentConditionsDisplay(weatherData);

weatherData.setMeasurements(80, 65, 30.4);
weatherData.setMeasurements(82, 70, 29.2);
weatherData.setMeasurements(78, 90, 29.2);

weatherData.removeObserver(currentConditionsDisplay);

weatherData.setMeasurements(88, 99, 30.5);

weatherData.registerObserver(currentConditionsDisplay);

weatherData.setMeasurements(90, 99, 40.0);

console.log('------------------------');