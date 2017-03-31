const Cosmic = require('cosmicjs');
const config = require('./config');
const Promise = require("bluebird");

/*
var params = {
  write_key: config.bucket.write_key,
  type_slug: 'posts',
  title: 'Test Title',
  content: 'Test Content'
};
Cosmic.addObject(config, params, function(error, response){
  console.log(response);
});
*/

/*
Cosmic.getBucket(config, function(error, response){
  console.log(response);
});
*/

/*
Cosmic.getObjects(config, function(error, response){
  console.log(response);
});
*/


var params = {
  type_slug: 'posts',
  limit: 5,
  skip: 0
};
Cosmic.getObjectType(config, params, function(error, response){
  console.log(response);
});
