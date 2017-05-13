import * as React from "react";

interface Props {
    defaultValue?: string;
}

interface State {
    text: string;
}

/**
 * The sample of Statefull component.
 */
export default class TextAreaCounter extends React.Component<Props, State> {
    private static defaultProps: Props = {
        defaultValue: "",
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            text: this.props.defaultValue,
        };

        this._textChange = this._textChange.bind(this);
    }

    public componentWillUpdate(...args: any[]) {
        this._log("componentWillUpdate", args);
    }

    public componentDidUpdate(...args: any[]) {
        this._log("componentDidUpdate", args);
    }

    public componentWillMount(...args: any[]) {
        this._log("componentWillMount", args);
    }

    public componentDidMount(...args: any[]) {
        this._log("componentDidMount", args);
    }

    public componentWillUnmount(...args: any[]) {
        this._log("componentWillUnmount", args);
    }

    public render(): JSX.Element {
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

    private _textChange({ target }: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.setState({
            text: target.value,
        });
    }
}
