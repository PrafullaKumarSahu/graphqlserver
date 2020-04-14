const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        authorId: {
            type: GraphQLID
        }
        // author: {
        //     type: AuthorType,
        //     resolve(parent, args) {
        //         //
        //     }
        // }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: {
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //
            }
        }
    }
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, $args) {
                return authors;
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutator',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: GraphQLString
                },
                age: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                let author = Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: GraphQLString
                },
                genre: {
                    type: GraphQLString
                },
                authorId: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                let book = Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})