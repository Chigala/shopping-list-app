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
      res.status(200).json('product quantity updated')
    } else {
      userList.data.push(productId)
      userList.save()
      res.status(200).json('new product added to the list ')
    }
  } else {
    res.status(200).json('there is no active list here ')
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
  list.name = req.body.name
  list.save()
  res.status(200).json(list)
}

//cancel list
const cancel_list = async (req, res) => {
  const listId = req.params.id
  const userId = req.params.userId
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
        if(exist) 
            exist.quantity += item.quantity
        else 
            transformed.push(item)
    })
})

  res.status(200).json(transformed)
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
  displayDailyProductStatistics
}
