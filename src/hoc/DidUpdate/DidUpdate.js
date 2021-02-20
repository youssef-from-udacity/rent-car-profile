import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
      }
  handleClickOutside(evt) {
    evt.preventDefault()
  }
  render () {
    return <div ref={this.wrapper}>{this.props.children}</div>
}
}
var EnhancedComponent = onClickOutside(MyComponent);

class Container extends Component {
    constructor(props) {
        super(props);
        this.getMyComponentRef = this.getMyComponentRef.bind(this);
    }
    
    someFunction() {
        var ref = this.myComponentRef;
        // 1) Get the wrapped component instance:
        var superTrueMyComponent = ref.getInstance();
        // and call instance functions defined for it:
        superTrueMyComponent.customFunction();
    }
    
    getMyComponentRef(ref) {
        this.myComponentRef = ref;
    }
    
    render(evt) {
        return <EnhancedComponent disableOnClickOutside={true} ref={this.getMyComponentRef}/>
    }
}
export default Container;