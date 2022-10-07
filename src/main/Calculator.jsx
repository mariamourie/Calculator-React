import React, { Component } from 'react';
import './Calculator.css';

import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

function fatorial(number) {
    let result = 1;
    for (let i = number; i > 0; i--) {
        result = result * i;
    }
    return result;
}
export default class Calculator extends Component {
    state = {...initialState};
    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }
    clearMemory() {
        this.setState({...initialState});
    }
    setOperation(operation) {
        
        if(this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true });
        } else {
            const equals = operation === '=';
            const currentOperation = this.state.operation;

            const values = [...this.state.values];
            switch (currentOperation) {
                case '+': {
                    values[0] = values[0] + values[1];
                    break;
                }
                case '-': {
                    values[0] = values[0] - values[1];
                    break;
                }
                case '*': {
                    values[0] = values[0] * values[1];
                    break;
                }
                case 'x²': {
                    values[0] = values[0] * values[0];
                    break;
                }
                case '√x': {
                    values[0] =  Math.sqrt(values[0]);
                    break;
                }
                case '/': {
                    values[0] = values[0] / values[1];
                    if(isNaN(values[0]) || !isFinite(values[0])) {
                        this.clearMemory();
                        return
                    }
                    break;
                }
                case '!n': {
                    values[0] = fatorial(values[0]);
                    break;
                }
                default: {
                    values[0] = this.state.values[0];
                }
            }
            values[1] = 0;

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }
    addDigit(digit) {
        if(digit === '.' && this.state.displayValue.includes('.')) {
            return 
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + digit;
        this.setState({displayValue, clearDisplay: false})

        if(digit !== '.') {
            const index = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[index] = newValue;
            this.setState({ values });
        }
    }
    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory}/>
                <Button label="x²" click={this.setOperation}/>
                <Button label="√x" click={this.setOperation}/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} />
                <Button label="!n" click={this.setOperation} />
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}