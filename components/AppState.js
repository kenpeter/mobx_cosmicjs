// array, obj, var ect being watched.
import { observable } from 'mobx';

// get all posts
// add a post
// delete a post
// from cosmicjs
import { getObjects, addObject, deleteObject } from 'cosmicjs';

// what config.....?
import config from '../config';

// export the app state
export default class AppState {
  // posts is array. when add, remove, watching
  @observable posts = [];
  // form data, when submit watching.
  @observable form_data = {};
  // loading, wathing
  @observable is_loading = true;
  // saving, watching
  @observable is_saving = false;

  // add post method
  addPost(object) {
    // is saving, yes
    this.is_saving = true;
    // comicjs api
    // add obj
    // bucket
    // bucket is the slug
    // obj is the post
    // err, res
    addObject(config, object, (err, res) => {
      // ob
      // callback, no more saving....
      this.is_saving = false;
      // ob
      // this posts, array
      // add to start
      this.posts.unshift(res.object);

      // ob
      // the form reset
      this.form_data = {
        title: '',
        content: ''
      };
    });

  }

  // remove post
  removePost(post) {
    // delete obj
    // bucket: config .....
    // so post.slug is like the id, but url
    deleteObject(config, { slug: post.slug }, (err, res) => {
      // ob
      // this.posts
      // this.posts.filter
      // current post._id vs apost._id
      this.posts = this.posts.filter(apost => {
        return apost._id !== post._id;
      })
    })
  }

  // constructor
  constructor() {
    // get all posts
    getObjects(config, (err, res) => {
      // res, official
      // objects, official
      // type, we define
      // posts, we defined
      if (res.objects.type.posts) {
        // ob
        //
        this.posts = res.objects.type.posts;
        // ob
        this.is_loading = false;
      }
    });

  }
}
