import React, {Component} from 'react'
import {NotifyItem} from './styles'
import NotifyManager from "./NotifyManager";
import {ReactComponent as CloseInfo} from './images/ic_close_info.svg';
import {ReactComponent as CloseError} from './images/ic_close_error.svg';

class Notify extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      rendered: false
    };
  }

  componentDidMount()
  {
    setTimeout(() =>{
      this.setState({
        rendered: true
      })
    }, 300)
  }

  render()
  {
    let style = {};

    if(this.state.rendered)
    {
      style.left = 0;
    }

    if(this.props.needRemove === true)
    {
      style.left = '320px';
    }

    switch(this.props.type)
    {
      case 'info':
        return <NotifyItem style={style} className={'notification notification-info'}>
          <div>
            <div>{this.props.text}</div>
            <CloseInfo className='close' onClick={() => {NotifyManager.delete(this.props.id)}}/>
          </div>
        </NotifyItem>
      case 'error':
        return <NotifyItem style={style} onClick={this.props.onClick} className={'notification notification-error'}>
          <div>
            <div>{this.props.text}</div>
            <CloseError className='close' onClick={() => {NotifyManager.delete(this.props.id)}}/>
          </div>
        </NotifyItem>
      case 'waiting':
        return <NotifyItem style={style} onClick={this.props.onClick} className={'notification notification-waiting'}>
          <div className="preload">
            <div className="" style={{width: this.props.percent > 0 ? this.props.percent + "%" : "0%"}}/>
          </div>
          <div>
            <img className='load' src={require('./images/loader.svg').default} alt='' />
            <CloseInfo className='close' onClick={() => {
              NotifyManager.delete(this.props.id)
              // this.props.handleRemoveJob(this.props.id)
            }}/>
            <div>{this.props.text}</div>
          </div>
        </NotifyItem>
    }

    return '';
  }
}

export default Notify