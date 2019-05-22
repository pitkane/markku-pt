# import tornado.web
# from tornado.ioloop import IOLoop
# from terminado import TermSocket, SingleTermManager
# import socketio


# class CustomTermSocket(TermSocket):
#     def check_origin(self, origin):
#         return True


# if __name__ == '__main__':
#     term_manager = SingleTermManager(shell_command=['bash'])

#     sio = socketio.AsyncServer(async_mode="tornado", logger=True)

#     # @sio.on("connect", namespace='/chat')
#     # async def on_connect(sid, environ):
#     #     print('connected: ', sid)

#     # @sio.on('disconnect')
#     # def disconnect(sid):
#     #     print('disconnect ', sid)

#     # @sio.on('chat message', namespace='/chat')
#     # async def message(sid, data):
#     #     print("server received message!", data)

#     @sio.on('connect')
#     def connect(sid, environ):
#         print("connect", sid)

#     @sio.on('chat message')
#     async def message(sid, data):
#         print("server received message!", data)
#         await sio.emit('reply', data)
#         await sio.send(data)

#     @sio.on('disconnect')
#     def disconnect(sid):
#         print('disconnect', sid)

#     _Handler = socketio.get_tornado_handler(sio)

#     class SocketHandler(_Handler):
#         def check_origin(self, origin):
#             return True

#     tornadoWebApp = tornado.web.Application([
#         (r"/terminal-socket", CustomTermSocket,
#          {'term_manager': term_manager}),
#         (r"/socket.io/", SocketHandler),
#     ])
#     tornadoWebApp.listen(8080)

#     print("asdf")

#     tornado.ioloop.IOLoop.current().start()

# # from aiohttp import web
# # import socketio

# # sio = socketio.AsyncServer()
# # app = web.Application()
# # sio.attach(app)


# # @sio.on('connect', namespace='/chat')
# # def connect(sid, environ):
# #     print("connect ", sid)


# # @sio.on('chat message', namespace='/chat')
# # async def message(sid, data):
# #     print("message ", data)
# #     await sio.emit('reply', room=sid)


# # @sio.on('disconnect', namespace='/chat')
# # def disconnect(sid):
# #     print('disconnect ', sid)


# # if __name__ == '__main__':
# #     web.run_app(app)


import socketio
import engineio
import eventlet

sio = socketio.Server()
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
})


@sio.on('connect')
def connect(sid, environ):
    print('connect ', sid)


@sio.on('message')
def message(sid, data):
    print('message ', data)


@sio.on('disconnect')
def disconnect(sid):
    print('disconnect ', sid)
    sio.emit('lol', "hello")


if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 8080)), app)
    sio.emit('lol', "hello")
