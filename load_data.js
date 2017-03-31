const Promise = require("bluebird");
const osmosis = require('osmosis');
const cosmicjs = require('cosmicjs');
const config = require('./config');

const questionArr = [
  'https://www.techmeme.com/'
];

function run() {
  return Promise.each(questionArr, (url) => {
    return new Promise((resolve, reject) => {
      osmosis
        .get(url)
        // so the idea is that need to find the list item
        // then set smaller item
        .find('div.clus')
        .set({
          'title': '.ourh',
          'content': '.ii' // it grab all text include the title and summary
        })
        .data((data) => {
          //console.log('---- one ---');
          //console.log(data);
          let object = {
            write_key: config.bucket.write_key,
            type_slug: 'posts',
            title: data.title,
            content: data.content
          };

          cosmicjs.addObject(config, object, (err, res) => {
            if(err) {
              console.log('--- err ---');
              console.error(err);
              reject();
            }

            //console.log('---- done one ---');
            //console.log(object);
            console.log('---- res ---');
            console.log(res);
            resolve();
          });


        })
        .log(console.log)
        .error(console.log);


    });

  });
}


run().then(() => {
  console.log('--- all done ---');
});
