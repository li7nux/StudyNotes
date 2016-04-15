db.players.insert({name: 'Leborn James', age: 30, team: 'cav', points: 25000, skills: ['3-points', 'dunk', 'shoot']})

kobe = ({ name: 'Kobe Byrant', age: 38, team: 'lal', points: 35000, skills: ['3-points', 'kill', 'shoot'] })
wade = ({ name: 'Dwyane Wade', age: 38, team: 'mia', points: 35000, skills: ['3-points', 'dunk', 'shoot'] })

db.players.insert({ name: 'Dwyane Wade', age: 38, team: 'mia', points: 35000, skills: ['3-points', 'dunk', 'shoot'] })

db.players.update({'name': 'Dwyane Wade'}, {$set:{'name': 'Dwyane Wade Jr'}})

db.players.save({"_id": ObjectId("570f3571ce1a94f8fe2a8665"), name: 'Dwyane Wade', age: 33, team: 'mia', points: 20000, skills: ['3-points', 'dunk', 'shoot']})

db.players.update({"points": {$gt : 21000}}, {$set: {"team": "Dream"}})

db.players.update({"points": {$gt : 10000}}, {$set: {"team": "Dream I"}}, false, true)

db.players.update({"points": {$gt : 10000}}, {$set: {"age": 20}}, true, false)

db.players.update({"points": {$gt : 10000}}, {$set: {"salary": 20000000}}, true, false)

db.players.update({"points": {$gt : 10000}}, {$set: {"ball": "nike"}}, true, true)

db.players.update({"points": {$gt : 10000}}, {$inc: {"points": 2000}}, false, false)

db.players.update({"points": {$gt : 10000}}, {$inc: {"points": 2000}}, false, true)

db.players.remove({"name": "Kobe Byrant"})

db.players.remove({"team": "Dream I"}, true)

db.players.find({"age": ($gt: 18), "skills" : [ "3-points", "dunk", "shoot" ]})

db.players.find({$or: [{"name": "Leborn James"}, {"age" : 38}]})

db.players.find({"age": {$gt:20}, $or: [{"name": "Leborn James"}, {"age" : 38}]})

db.players.remove({})



db.players.insert({name: 'James', age: 30, team: 'cav', points: 25000 })
db.players.insert({name: 'Curry', age: 27, team: 'saw', points: 15000 })
db.players.insert({name: 'Wade', age: 33, team: 'mia', points: 20000 })
db.players.insert({name: 'Bosh', age: 31, team: 'mia', points: 17000 })
db.players.insert({name: 'Kobe', age: 37, team: 'lal', points: 35000 })

db.players.insert({name: 'Coach', age: 57, team: 1024, points: "" })

db.players.find({"age": {$gt: 30}})
db.players.find({"age": {$gte: 30}})

db.players.find({"age": {$lt: 30}})

db.players.find({"age": {$gt: 30, $lt: 35}})

db.players.find( {"team": {$type : 16} })

db.players.find({}, {"name": 1, _id: 0}).limit(2)

db.players.find({}, {"name": 1, _id: 0}).limit(2).skip(2)

db.players.find({}, {"name": 1, "age": 1, _id: 0}).sort({age: 1})

# 聚合
db.players.insert({name: 'James', age: 30, team: 'Dream 1', points: 25000 })
db.players.insert({name: 'Curry', age: 27, team: 'Dream 2', points: 15000 })
db.players.insert({name: 'Wade', age: 33, team: 'Dream 1', points: 20000 })
db.players.insert({name: 'Bosh', age: 31, team: 'Dream 1', points: 17000 })
db.players.insert({name: 'Kobe', age: 37, team: 'Dream 1', points: 35000 })
db.players.insert({name: 'Drunt', age: 27, team: 'Dream 2', points: 19000 })

db.players.aggregate([	{$match: {age: {$gt: 30, $lte: 38 }}}, 	{$group: {_id: null,points: {$sum: 1}}}])
