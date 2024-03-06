/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import Router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import UserController from '#controllers/UserController'
import AuthController from '#controllers/AuthController'
import ConversationController from '#controllers/ConversationController'
import MessageController from '#controllers/MessageController'
import MessageEventsController from '#controllers/MessageEventsController'
import UserConversationController from '#controllers/UserConversationController'
import TypeController from '#controllers/TypeController'

Router.get('/', async () => {
  return {
    hello: 'world',
  }
})

Router.group(() => {
  //START USER ROUTES
  Router.group(() => {
    Router.post('/', [UserController, 'store'])
    Router.get('/:identifier', [UserController, 'show']).middleware(middleware.auth())
    Router.put('/:identifier', [UserController, 'update']).middleware(middleware.auth())
    Router.delete('/:identifier', [UserController, 'delete']).middleware(middleware.auth())
  }).prefix('user')

  //START AUTH ROUTES
  Router.group(() => {
    Router.post('/login', [AuthController, 'login'])
    Router.post('/logout', [AuthController, 'logout'])
    Router.post('/forgotPassword', [AuthController, 'forgotPassword']) //TODO:
  })

  //NEED AUTENTICATION
  Router.group(() => {
    //START MESSAGE EVENT ROUTESS
    Router.group(() => {
      Router.post('/auth/channel', [MessageEventsController, 'authChannel'])
      Router.post('/auth/user', [MessageEventsController, 'authUser'])
      Router.post('/end-connection', [MessageEventsController, 'terminateConnection'])
      Router.post('/', [MessageEventsController, 'triggerEvent'])
    }).prefix('event')

    //START CONVERSATION ROUTES
    Router.group(() => {
      Router.post('/', [ConversationController, 'crete'])
      Router.put('/:id', [ConversationController, 'update'])
      Router.delete('/:id', [ConversationController, 'delete'])
      Router.get('/', [ConversationController, 'getConversations'])
      Router.get('/:id', [ConversationController, 'getConversation'])
      Router.post('/user/add', [UserConversationController, 'create'])
      Router.delete('/user/remove', [UserConversationController, 'delete'])
      //TODO: START TYPES ROUTES
      Router.post('/type', [TypeController, 'create'])
      Router.delete('/type/:id', [TypeController, 'delete'])
    }).prefix('conversation')

    //START MESSAGES ROUTES
    Router.group(() => {
      Router.post('/', [MessageController, 'store'])
      // Router.put('/:id', [MessageController, 'update'])
      Router.delete('/:id', [MessageController, 'delete'])
      Router.get('/conversation/:conversationId', [MessageController, 'index'])
      Router.get('/:id', [MessageController, 'show'])
    }).prefix('message')
  }).middleware(middleware.auth())
}).prefix('api/v1')
