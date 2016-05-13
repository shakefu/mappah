import { Session } from 'meteor/session'
import { Template } from 'meteor/templating'
 
// import { Tasks } from '../api/tasks.js'
 
import './body.html'


Session.set("resize", null) 

Meteor.startup(function () {
  window.addEventListener('resize', function(){
    Session.set("resize", new Date())
  })
})

 
Template.body.helpers({
    resized () {
        var width = $(window).width()
        var height = $(window).height()

        console.log(width, height)

        return Session.get('resize')
    }, 

    tiles () {
        console.log(window.innerHeight)
        console.log(window.innerWidth)
        let map = []
        for (let i=0;i<10;i++) {
            for (let j=0;j<10;j++) {
                map.push({x: i, y: j})
            }
        }
        return map
    }
    /*
  tasks() {
    // Show newest tasks at the top
    return Tasks.find({}, { sort: { createdAt: -1 } })
  },
  */
})

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault()
 
    // Get value from form element
    const target = event.target
    const text = target.text.value
 
    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    })
 
    // Clear form
    target.text.value = ''
  },
})
