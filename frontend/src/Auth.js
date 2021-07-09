import ReactDOM, {PureComponent} from 'react';

export default class Auth extends PureComponent{
  constructor(props) {
    super(props);
    this.containerEl = null;
    this.externalWindow = null;
  }

  componentDidMount() {
    this.externalWindow = window.open(this.props.url, '', 'width=600,height=400,left=200,top=200');
    this.containerEl = this.externalWindow.document.createElement('div');
    this.externalWindow.document.body.appendChild(this.containerEl);
  }

  componentWillUnmount() {

    this.externalWindow.close();
  }

  render() {
    if (!this.containerEl) {
      return null;
    } 
    return ReactDOM.createPortal(this.props.children,this.containerEl);  
  }
}