import React from 'react';

function Message({ data }) {
  if (data.type === 'incomingMessage') {
    const style = { color: data.color }
    if (data.imgs !== []) {
      return (
        <div className="message" >
          <span style={style} className="message-username">{data.username}</span>
          <span className="message-content">{data.content}</span>
          <br />
          <span className="message-images">
            {data.imgs.map(link => (<img key={link} src={link} />))}
          </span>
        </div>
      )
    }
    return (
      <div className="message" >
        <span style={style} className="message-username">{data.username}</span>
        <span className="message-content">{data.content}</span>
      </div>
    );
  }
  return (<div className="message system">{data.content}</div>);
}

export default Message;