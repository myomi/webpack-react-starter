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

    _textChange({ target }: React.ChangeEvent<HTMLTextAreaElement>):void {
        this.setState({
            text: target.value
        });
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
}