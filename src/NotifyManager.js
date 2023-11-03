import React from 'react'
import Notify from "./Notify";

export default class NotifyManager
{
  static container = null;


  static id()
  {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  static add(title, text, type, time, onClick, onClose)
  {
    if(!NotifyManager.container)
    {
      return
    }

    let children = NotifyManager.container.state.children;
    let id = NotifyManager.id();
    let notify = <Notify
      title={title}
      text={text}
      type={type}
      time={time}
      id={id}
      onClick={() => {
        if(typeof onClick === 'function'){
          onClick()
        }
      }}
      onClose={() => {
        if(typeof onClose === 'function'){
          onClose()
        }
      }}
    />

    children[id] = notify;
    NotifyManager.container.setState({
      children: children
    });

    setTimeout(() => {
      NotifyManager.delete(id);
    }, time)

    return id;
  }



  static once(jobTypeId, title, text, type, time, onClick, onClose)
  {
    if(!NotifyManager.container)
    {
      return
    }

    let children = NotifyManager.container.state.children;
    if(typeof children[jobTypeId] === 'undefined')
    {
      let notify = <Notify
        title={title}
        text={text}
        type={type}
        time={time}
        id={jobTypeId}
        onClick={() => {
          if(typeof onClick === 'function'){
            onClick()
          }
        }}
        onClose={() => {
          if(typeof onClose === 'function'){
            onClose()
          }
        }}
      />

      children[jobTypeId] = notify;
      NotifyManager.container.setState({
        children: children
      });

      setTimeout(() => {
        NotifyManager.delete(jobTypeId);
      }, time)

      return jobTypeId;
    }
  }

  static infoOnce(id, title, text, time = 4000, onClick, onClose)
  {
    return NotifyManager.once(id, title, text, 'info', time, onClick, onClose);
  }

  static errorOnce(id, title, text, time = 4000, onClick, onClose)
  {
    return NotifyManager.once(id, title, text, 'error', time, onClick, onClose);
  }

  static info(title, text, time = 4000, onClick, onClose)
  {
    return NotifyManager.add(title, text, 'info', time, onClick, onClose);
  }

  static warning(title, text, time = 4000, onClick, onClose)
  {
    return NotifyManager.add(title, text, 'warning', time, onClick, onClose);
  }

  static error(title, text, time = 4000, onClick, onClose)
  {
    return NotifyManager.add(title, text, 'error', time, onClick, onClose);
  }

  static delete(jobTypeId)
  {
    if(!NotifyManager.container)
    {
      return
    }

    let children = NotifyManager.container.state.children;
    if(typeof children[jobTypeId] !== 'undefined'){
      children[jobTypeId] = React.cloneElement(children[jobTypeId], { needRemove: true })

      NotifyManager.container.removeItem(jobTypeId)
    }
  }

  static update(jobTypeId, percent)
  {
    if(!NotifyManager.container)
    {
      return
    }

    let children = NotifyManager.container.state.children;
    if(typeof children[jobTypeId] !== 'undefined')
    {
      children[jobTypeId] = React.cloneElement(children[jobTypeId], { percent: percent })
      NotifyManager.container.forceUpdate();
    }
  }

  static bind(container)
  {
    this.container = container;
  }
}