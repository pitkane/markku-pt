# import threading

# import aiohttp
# import tornado
# import socketio
# import terminado

# sio = socketio.AsyncServer()
# app = aiohttp.web.Application()


# sio.attach(app)


# @sio.on('connect')
# def connect(sid, environ):
#     print("connect ", sid)


# @sio.on('message')
# async def message(sid, data):
#     print("message ", data)
#     await sio.emit('reply', room=sid)


# @sio.on('disconnect')
# def disconnect(sid):
#     print('disconnect ', sid)


# term_manager = terminado.SingleTermManager(shell_command=['bash'])


# def aiohttp_server():
#     aiohttp.web.run_app(app)


# def runFlaskApp2():
#     tornadoWebApp = tornado.web.Application([
#         (r"/terminal-socket", terminado.TermSocket,
#          {'term_manager': term_manager}),
#     ])
#     tornadoWebApp.listen(8888)

#     tornado.ioloop.IOLoop.current().start()


# if __name__ == '__main__':

#     print("moro")

#     t1 = threading.Thread(target=aiohttp_server)
#     t2 = threading.Thread(target=runFlaskApp2)
#     t1.start()
#     t2.start()

import tornado.web
from tornado.ioloop import IOLoop
from terminado import TermSocket, SingleTermManager
import socketio


class CustomTermSocket(TermSocket):
    def check_origin(self, origin):
        return True


if __name__ == '__main__':
    term_manager = SingleTermManager(shell_command=['bash'])

    sio = socketio.AsyncServer(async_mode="tornado")

    # @sio.on("connect", namespace='/chat')
    # async def on_connect(sid, environ):
    #     print('connected: ', sid)

    # @sio.on('disconnect')
    # def disconnect(sid):
    #     print('disconnect ', sid)

    # @sio.on('chat message', namespace='/chat')
    # async def message(sid, data):
    #     print("server received message!", data)

    @sio.on('connect')
    async def connect(sid, environ):
        print("connect", sid)

    @sio.on('message')
    async def message(sid, data):
        print("server received message!", data)
        await sio.emit('reply', data)
        await sio.send(data)

    @sio.on('disconnect')
    async def disconnect(sid):
        print('disconnect', sid)

    tornadoWebApp = tornado.web.Application([
        (r"/socket.io/", socketio.get_tornado_handler(sio)),

        (r"/terminal-socket", CustomTermSocket,
         {'term_manager': term_manager}),
    ])
    tornadoWebApp.listen(8080)

    tornado.ioloop.IOLoop.current().start()

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
