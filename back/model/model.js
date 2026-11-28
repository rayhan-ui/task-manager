const express = require('express')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true        
    },
    password:{
        type: String, 
        required: true,
        minlength: 8,
        select: false
    },
    role:{
        type: String,
        enum:['user', 'admin'],
        default: 'user'
    }
},{timestamps: true})
const User = mongoose.model('User', userSchema)


const boardSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type: String,
        required: true
    }
},{timestamps: true})
const Board = mongoose.model('Board', boardSchema)

const listSchema = new mongoose.Schema({
    board:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Board',
        required: true
    },
    name:{
        type: String, 
        required: true
    },
    order:{
        type: Number,
        default: 0
    }
})
const List = mongoose.model('List', listSchema)

const CardSchema = new mongoose.Schema({
    list:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'List',
        required: true
    },
    title:{
        type: String, 
        required: true
    },
    description:{
        type: String,
        default: ""
    }
})
const Card = mongoose.model('Card', CardSchema)
module.exports = {User, Board, List, Card}