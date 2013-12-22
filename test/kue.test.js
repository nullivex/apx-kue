'use strict';
var expect = require('chai').expect

describe('InitializerKue',function(){
  var apx = require('apx')
  before(function(done){
    apx.once('ready',function(){
      done()
    })
    apx.setup({
      sysLogLevel: 2,
      testing: true,
      cwd: __dirname,
      tasks: 'tasks/*.js'
    })
    apx.start()
  })
  after(function(done){
    apx.once('dead',function(){
      done()
    })
    apx.stop()
  })
  it('should setup the job queue',function(done){
    var init = require('../lib/kue')
    init.start(apx.instance,function(){
      expect(apx.instance.kue).to.be.a('function')
      expect(apx.instance.jobs).to.be.an('object')
      done()
    })
  })
  it('should load tasks',function(done){
    var init = require('../lib/kue')
    init.start(apx.instance,function(){
      expect(apx.instance.tasks.hello.loaded).to.equal(true)
      done()
    })
  })
})