import * as React from 'react';

interface Props {
    defaultValue?: string
}

interface State {
    text: string
}

/**
 * The sample of Statefull component.
 */
export default class TextAreaCounter extends React.Component<Props, State> {
    static defaultProps: Props = {
        defaultValue: ''
    }
    
    state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            text: this.props.defaultValue
        };

        this._textChange = this._textChange.bind(this);
    }

    componentWillUpdate(...args: any[]) {
        this._log('componentWillUpdate', args);
    }

    componentDidUpdate(...args: any[]) {
        this._log('componentDidUpdate', args);
    }

    componentWillMount(...args: any[]) {
        this._log('componentWillMount', args);
    }

    componentDidMount(...args: any[]) {
        this._log('componentDidMount', args);
    }

    componentWillUnmount(...args: any[]) {
        this._log('componentWillUnmount', args);
    }

    render():JSX.Element {
        return (
            <div>
                <textarea 
                    defaultValue={this.state.text}
                    onChange={this._textChange}>
                </textarea>
                <h3>{this.state.text.length}</h3>
            </div>
        );
    }

    private _log(methodName: string, ...args: any[]) {
        console.log(methodName, args);
    }

    private _textChange({ target }: React.ChangeEvent<HTMLTextAreaElement>):void {
        this.setState({
            text: target.value
        });
    }
}