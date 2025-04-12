import { Component } from 'react';

const lazyLoader = (importComponent: any) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importComponent()
                .then((cmp: any) => {
                    this.setState({ component: cmp.default });
                });
        }

        render() {
            const CustComponent: any = this.state.component;

            return CustComponent ? <CustComponent {...this.props} /> : null;
        }
    }
}

export default lazyLoader;