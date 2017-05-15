import * as React from "react";

interface Props {
    message?: string;
}

/**
 * The sample of stateless component.
 */
const MyLabel: React.SFC<Props> = (props: Props): JSX.Element => (
    <h1>{props.message}</h1>
);

MyLabel.defaultProps = {
    message: "",
};

export default MyLabel;
