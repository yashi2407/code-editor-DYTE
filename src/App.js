import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import pushid from 'pushid';
import './App.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import logo from '../src/Capture.PNG';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      html: '',
      css: '',
      js: '',
      displayhtml:false,
      displaycss:false,
      displayjs:false
    };
  }
  
  showcss = (e) => {
    this.setState(prevState => ({
      displaycss: !prevState.displaycss
    }));
  }
  showjs = (e) => {
    this.setState(prevState => ({
      displayjs: !prevState.displayjs
    }));
  }
  showhtml = (e) => {
    this.setState(prevState => ({
      displayhtml: !prevState.displayhtml
    }));
  }
  
  componentDidUpdate() {
    this.runCode();
  }

  componentDidMount() {
    this.setState({
      id: pushid(),
    });
  }

  runCode = () => {
    const { html, css, js } = this.state;

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}

        <script type="text/javascript">
          ${js}
        </script>
      </body>
      </html>
    `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  render() {
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: 'material',
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true,
    };
    let inStyle,inStylecss,inStylejs;
    if(this.state.displayhtml ===true) {
       inStyle = {
        display:'block',
        height: '33.33%',
        overflow: 'hidden',
        position: 'relative'
      }
    }
    else 
    {
      inStyle = 
      {
       display:'none',
     }
    }
    if(this.state.displaycss ===true) {
      inStylecss = {
       display:'block',
       height: '33.33%',
       overflow: 'hidden',
       position: 'relative'
     }
   }
   else 
   {
    inStylecss = 
    {
     display:'none',
     }
    }
    if(this.state.displayjs ===true) {
      inStylejs = {
       display:'block',
       height: '33.33%',
       overflow: 'hidden',
       position: 'relative'
     }
   }
   else 
   {
    inStylejs = 
    {
     display:'none',
     }
    }
  

    return (
      <div className="App">
        <div className="logo">
          <img src={logo} alt="logo"></img>
          <h1>Code Editor</h1>
        </div>
        <div className='maincontent'>
          <section class="navbar">
            <span className="nav-content"><b>Choose the editor you want to work with: </b></span>
            <div className="items">
              <button onClick={this.showhtml}>index.html</button>
              <button onClick={this.showcss}>index.css</button>
              <button onClick={this.showjs}>index.js</button>
            </div>
          </section>
          <section className="playground">
            <div className="code-editor html-code" style={inStyle}>
              <div className="editor-header">HTML</div>
              <CodeMirror
                value={html}
                options={{
                  mode: 'htmlmixed',
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, html) => {
                  this.setState({ html });
                }}
              />
            </div>
            <div className="code-editor css-code" style={inStylecss}>
              <div className="editor-header">CSS</div>
              <CodeMirror
                value={css}
                options={{
                  mode: 'css',
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, css) => {
                  this.setState({ css });
                }}
              />
            </div>
            <div className="code-editor js-code" style={inStylejs}>
              <div className="editor-header">JavaScript</div>
              <CodeMirror
                value={js}
                options={{
                  mode: 'javascript',
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, js) => {
                  this.setState({ js });
                }}
              />
            </div>
          </section>
        </div>
        
        <section className="result">
          <iframe title="result" className="iframe" ref="iframe" />
        </section>

        
        
      </div>
    );
  }
}

export default App;