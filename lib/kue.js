'use strict';

var kue = require('kue')
  , redis = require('redis')
  , redisMock = require('fakeredis')
exports.name = 'kue'
exports.description = 'Kue initializer'
exports.start = function(apx,fn){
  var redisHost = apx.config.get('kue.redis.host') || null
    , redisPort = apx.config.get('kue.redis.port') || null
    , redisPassword = apx.config.get('kue.redis.password') || null
    , kueHost = apx.config.get('kue.host') || null
    , kuePort = apx.config.get('kue.port') || null
    , kueTitle = apx.config.get('kue.title') || 'APX Job Status'
    , finish = function(){
        //register tasks
        if(apx.config.exists('tasks')){
          apx.loadItems(
            apx.config.get('tasks'),
            function(task,next){
              apx.tasks[task.name] = {loaded: true}
              apx.jobs.process(task.name,function(job,done){
                apx.runTask(task,new apx.Request(job.data),done)
              })
              next()
            },
            function(err){
              fn(err,apx)
            }
          )
        } else {
          fn(null,apx)
        }
      }
  //start kue
  apx.kue = kue
  if(true === apx.config.get('testing')){
    apx.kue.redis.createClient = function(){
      return redisMock.createClient()
    }
  } else {
    apx.kue.redis.createClient = function(){
      var client = redis.createClient(redisPort,redisHost)
      if(redisPassword) client.auth(redisPassword)
      return client
    }
  }
  apx.jobs = apx.kue.createQueue()
  if(true !== apx.config.get('testing')){
    apx.jobs.promote(1000)
    //setup kue web interface
    apx.kue.app.set('title',kueTitle)
    apx.kue.app.listen(kuePort,kueHost,finish)
  } else {
    finish()
  }

}
exports.stop = function(apx,fn){
  apx.kue.app.close(fn)
}