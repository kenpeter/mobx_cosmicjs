// react, component
import React, { Component } from 'react';
// ob
import { observer } from 'mobx-react';
// form group
// form control
// text input
// press button
// all from react boot strap
import { FormGroup, FormControl, Input, Button } from 'react-bootstrap';
// config
import config from '../config';
// slug anything
import slug from 'slug';
// short css
import S from 'shorti';
// mobx, react, devtool
import DevTools from 'mobx-react-devtools';

// watching, the entire class
@observer
// export app
export default class App extends Component {
  // first it is input
  // handle input text box change
  handleInputChange(type, e) {
    // ob
    // form_data
    // props has data
    // what is type????????????????????
    // e.target.value
    this.props.data.form_data[type] = e.target.value;
  }

  // submit button pressed
  handleSubmit(e) {
    // no default
    e.preventDefault();
    // title
    const title = this.props.data.form_data.title;
    // content
    const content = this.props.data.form_data.content;

    // no title return
    if (!title)
      return

    // slug, with title
    const post = {
      slug: slug(title),
      type_slug: 'posts',
      title,
      content
    }

    // data add post
    this.props.data.addPost(post);
  }

  // remove when click
  handleRemoveClick(post) {
    this.props.data.removePost(post)
  }

  // render
  render() {
    // data is the app state
    const data = this.props.data;

    // posts area??
    let posts_area;

    // it is loading, so loading
    if (this.is_loading) {
      posts_area = (
        <div style={ S('text-center font-30 mt-80 mb-80') }>Loading...</div>
      )
    }

    // for area
    let form_area;

    // post
    if (data.posts && data.posts.length) {
      // post map
      posts_area = data.posts.map(post => {
        // individual post
        // x title content
        return (
          <div style={ S('mb-20 bg-efefef p-20 pt-15 pb-30 br-4') } key={ 'id' + post._id }>
            <div onClick={ this.handleRemoveClick.bind(this, post) } className="close">&times;</div>
            <div style={ S('font-20 mt-10 mb-10') }>{ post.title }</div>
            <div style={ S('color-666') }>{ post.content }</div>
          </div>
        )
      })
    }

    // devl tool ......
    let dev_tools
    if (config.env !== 'production')
      dev_tools = <DevTools />

    // form submit, add post
    return (
      <div style={ S('p-20') }>
        <h1 style={ S('mb-20') }>Submit your stuff</h1>
        <div style={ S('mb-20') }>
          <form onSubmit={ this.handleSubmit.bind(this) }>
            <FormGroup bsSize="large">
              <FormControl onChange={ this.handleInputChange.bind(this, 'title')} placeholder="Title" type="text" value={ this.props.data.form_data.title } />
            </FormGroup>
            <FormGroup bsSize="large">
              <FormControl style={ S('h-100') } onChange={ this.handleInputChange.bind(this, 'content')} placeholder="Content" componentClass="textarea" value={ this.props.data.form_data.content }></FormControl>
            </FormGroup>
            <Button bsSize="large" bsStyle="primary" type="submit" className={ data.is_saving ? 'disabled' : '' }>{ data.is_saving ? 'Saving...' : 'Save post' }</Button>
          </form>
        </div>
        { posts_area }
        { dev_tools }
      </div>
    )
  }
}
