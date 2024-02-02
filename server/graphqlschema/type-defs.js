const { gql } = require('apollo-server')
const typeDefs = gql`
type User{
    id:ID
    name:String
    age:Int
    email:String
    dep:String
    loc:String
    password:String
    token:String
}
type response {
  success: Boolean!
  message: String!
  data: [User]
}

type Authresponse{
    success: Boolean
    message: String
    token: String
    data:User
}
input addUserType{
    name:String
    email:String
    age:Int
    dep:String
    loc:String
}
input regUserType{
    name:String
    email:String
    password:String
}
input updateUserType{
    id:ID
    name:String
    age:ID
    email:String
    department:String
    location:String
}
input deleteUserType{
    id:ID
    email:String
    message:String
    success:Boolean
}
type Mutation{
    addUser(input:addUserType):Authresponse
    updateUser(input:updateUserType):Authresponse
    deleteUser(input:deleteUserType):Authresponse
    registerUser(input:regUserType):Authresponse
    loginUser(input:regUserType):Authresponse
}
type Query{
    users:response
    user(email:String):response
}
`

module.exports = { typeDefs }