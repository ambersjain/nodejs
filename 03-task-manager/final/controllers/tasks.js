//const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const Task = require('../models/Task')

const getAllTasks = asyncWrapper(async (req, res) => {
  // Task.find({}) retrieves all documents from the Task collection
  // The empty object {} as the query parameter means no filtering, so it returns all tasks

  // Get tasks that are not completed and have names starting with 'A' or 'H'
  // Exclude _id field and only select the name field in the response
  //const tasks = await Task.find({ completed: true, name: /^[AH]/ }).select('name -_id')

 // const tasks = await Task.find({ completed: true, name: /^[AH]/ }).select('name')
  // Send a JSON response with status 200 (OK) containing the filtered tasks
  const tasks = await Task.find({}) 
  res.status(200).json({ tasks })
  
  // These commented lines were likely used for debugging/testing:
  //console.log('gets all tasks');
  //res.send('get all tasks');

})

const createTask = asyncWrapper(async (req, res) => {`1 `
  const task = await Task.create(req.body)
  console.log('create task');
  res.status(201).json({ task })
  //res.json({id: req.params});

  //res.send('create task');
})

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  console.log(req.params);

  // Make a promise to find a task with the given id
  const task = await Task.findOne({ _id: taskID });
  
  // What is wrong with this code?
  if (!task) {
    //return next(createCustomError(`No task with id : ${taskID}`, 404))
    // always return to stop the function from executing further
     return res.status(404).json({ msg: `No task with id : ${taskID}` })
  }

  res.status(200).json({ task })

  // send a single id that is passed in the url
  // console.log('get task');
  // res.json({idhi: req.params});
  //res.send('get task');
})


const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })

  // console.log('delete task');
  // res.send('delete task');
})


const updateTask = asyncWrapper(async (req, res, next) => {

  // get the task id from url
  const { id: taskID } = req.params

  // find the task with the given id and update it with the new data
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body)
  // new means return the updated task
  // runValidators means run the validators again which were defined in the model schema
  // if these 2 options are not passed, the task will be updated but the validators will not be run

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
  //console.log('update task');
  //res.send('update task');
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
