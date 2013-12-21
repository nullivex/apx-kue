'use strict';

exports.name = 'hello'
exports.description = 'Just says hi'
exports.run = function(apx,req,done){
  apx.log.info('HI GUYS')
  done()
}