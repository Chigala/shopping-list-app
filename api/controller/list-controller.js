const List = require('../database/models/list')
const randomWords = require('random-words')
const Product = require('../database/models/product')

//creating a new list
const create_list = async (req, res) => {
  const productId = req.params.id
  const listId = req.params.list
  const userList = await List.findOne({ _id: listId, listType: 'active' })

  //if there is already an active list just push the product id to the items
  if (userList) {
    if (userList.data.includes(productId)) {
      const product = await Product.findByIdAndUpdate(
        productId,
        { $inc: { quantity: 1 } },
        { new: true }
      )
      res.status(200).json({ msg:'product quantity updated', color: 'success'})
    } else {
      userList.data.push(productId)
      userList.save()
      res.status(200).json({ msg: 'new product added to the list ', color: 'success' })
    }
  } else {
    res.status(200).json({ msg:'there is no active list here ', color: 'success'})
  }
  //  else {
  //     const { name } = req.body
  //     const list = await new List({
  //       name,
  //       belongsTo: userId
  //     })

  //     list.data.push(productId)
  //     list.save()
  //     res.status(200).json(list)
  //   }
}
//completing the list and then changing the name;
const complete_list = async (req, res) => {
  const listId = req.params.id
  const userId = req.params.userId
  const list = await List.findById(listId)
  list.listType = 'completed'
  list.save()
  const randomListName = randomWords({ exactly: 1, wordsPerString: 2 })
  await List.create({
    name: randomListName[0],
    belongsTo: userId
  })
  res.status(200).json(list)
}

//change list name
const change_listName = async (req, res) => {
  const listId = req.params.id
  const list = await List.findById(listId)
  list.name = req.body.name || list.name
  console.log('this is the name', req.body)
  list.save()
  res.status(200).json(list)
}

//cancel list
const cancel_list = async (req, res) => {
  const listId = req.params.id
  const userId = req.params.userId
  console.log("this is the cancelled listId from the backend:", listId)
  console.log("this is the cancelled userId from the backend:", userId)

  const list = await List.findById(listId)
  list.listType = 'cancelled'
  list.save()
  const randomListName = randomWords({ exactly: 1, wordsPerString: 2 })
  await List.create({
    name: randomListName[0],
    belongsTo: userId
  })
  res.status(200).json(list)
}

//delete list
const delete_list = async (req, res) => {
  const listId = req.params.id
  const list = await List.findByIdAndDelete(listId)
  res.status(202).json(list)
}

//get full list
const get_fullList = async (req, res) => {
  //this would get you only the active list that you have and it must always be just one
  const userId = req.params.id
  const list = await List.findOne({
    belongsTo: userId,
    listType: 'active'
  }).populate('data')

  //transforming the list so it will return back to the format I want it to return to

  function groupArrayOfObjects (list, key) {
    return list.data.reduce((rv, x) => {
      ;(rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }
  let groupedPeople = groupArrayOfObjects(list, 'categoryName')
  console.log(groupedPeople)
  res.status(200).json(groupedPeople)
}

//get the list without the product in it arranged in their categories
const get_list = async (req, res) => {
  const userId = req.params.id
  const list = await List.findOne({
    belongsTo: userId,
    listType: 'active'
  })
  res.status(200).json(list)
}
//remove a product from the list
const remove_product = async (req, res) => {
  const productId = req.params.product
  const listId = req.params.listId
  const list = await List.findByIdAndUpdate(
    listId,
    { $pull: { data: productId } },
    { new: true }
  )
  res.status(200).json(list)
}

//display all the product sum in a chart
const displayDailyProductStatistics = async (req, res) => {
  const userId = req.params.id
  const list = await List.find({
    belongsTo: userId,
    listType: 'completed'
  }).populate('data')
  const transformed = []

  list.forEach(d => {
    d.data.forEach(item => {
      const exist = transformed.find(t => t.name == item.name)
      if (exist) exist.quantity += item.quantity
      else
        transformed.push({
          name: item.name,
          quantity: item.quantity,
          updatedAt: item.updatedAt,
          id: item._id
        })
    })
  })

  const newValue = transformed.reduce((acc, entry) => {
    return acc + entry.quantity
  }, 0)
    transformed
    .sort((a, b) => b.quantity - a.quantity)
    .forEach(entry => (entry.percent = Math.floor((entry.quantity / newValue) * 100)))
    
    
    
  console.log(transformed)

  res.status(200).json(transformed)
}

//get the frequency of all the categories
const frequencyOfCategories = async (req, res) => {
  const userId = req.params.id
  const list = await List.find({
    belongsTo: userId,
    listType: 'completed'
  }).populate('data')
  const transformed = []

  list.forEach(d => {
    d.data.forEach(item => {
      const exist = transformed.find(t => t.name == item.categoryName)
      if (exist) exist.number++
      else
        transformed.push({
          name: item.categoryName,
          number: 1,
          id: item._id
        })
    })
  })
  // let valueSum = {};
  // transformed.map(entry => valueSum[entry.name] = (valueSum[entry.label] || 0 ) + entry.number )

  //getting the total values in the whole thing
  const newValue = transformed.reduce((acc, entry) => {
    return acc + entry.number
  }, 0)
  transformed
    .sort((a, b) => b.number - a.number)
    .map(entry => (entry.percent = (entry.number / newValue) * 100))
  console.log(transformed)

  res.status(200).json(transformed)
}

//get all the list
const get_AllList = async (req, res) => {
  const userId = req.params.id
  const list = await List.find({
    belongsTo: userId,
    listType: 'completed' || 'cancelled'
  }).populate('data')
  const transform = data =>
    data.map(({ name, belongsTo, updatedAt, listType, id, data }) => {
      return {
        name,
        id,
        belongsTo,
        listType,
        updatedAt,
        data: data.reduce((res, { id, quantity, name, categoryName }) => {
          return {
            ...res,
            [categoryName]: [
              ...(res[categoryName] || []),
              { id, quantity, name, categoryName }
            ]
          }
        }, {})
      }
    })
  const result = transform(list)

  res.status(200).json(result)
}
module.exports = {
  create_list,
  complete_list,
  change_listName,
  cancel_list,
  delete_list,
  get_fullList,
  remove_product,
  get_list,
  displayDailyProductStatistics,
  get_AllList,
  frequencyOfCategories
}
