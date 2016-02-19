"use strict";

var yfm = require('../node_modules/hexo/node_modules/hexo-front-matter');
var layouts = ["post", "page"];

hexo.extend.filter.register('before_post_render', function(data){
  // filter layouts to keep only posts and pages
  if (layouts.indexOf(data.layout) < 0) {
    return data;
  }

  // ensure that the updated date was not set in the front matter
  var rawData = yfm(data.raw);
  if (rawData.updated) {
      return data;
  }
  
  // update date
  hexo.log.debug("Changed updated date: %s", data.source)
  data.updated = data.date;
  return data;
});