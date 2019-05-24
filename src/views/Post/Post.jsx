import React, { Component } from 'react';
import { connect } from 'react-redux';

class Post extends Component {
  render () {
    return (
      <div>
        Post
      </div>
    )
  }
}

export default connect()(Post);