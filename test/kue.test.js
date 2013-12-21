'use strict';

describe('InitializerMongoose',function(){
  var APX = require('apx'), apx
  before(function(done){
    apx = APX({
      sysLogLevel: 2,
      testing: true,
      cwd: __dirname,
      tasks: 'tasks/*.js',
      onReady: done
    })
  })
  it('should setup the job queue',function(done){
    var init = require('../lib/kue')
    init.init(apx,function(){
      expect(apx.kue).to.be.a('function')
      expect(apx.jobs).to.be.an('object')
      done()
    })
  })
  it('should load tasks',function(done){
    var init = require('../lib/kue')
    init.init(apx,function(){
      expect(apx.tasks.hello.loaded).to.equal(true)
      done()
    })
  })
})