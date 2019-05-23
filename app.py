import tornado
import terminado
import socketio


class TerminalSocket(terminado.TermSocket):
    # no CORS checks
    def check_origin(self, origin):
        return True


if __name__ == '__main__':
    term_manager = terminado.SingleTermManager(shell_command=['bash'])

    sio = socketio.AsyncServer(async_mode="tornado")

    @sio.on('connect')
    async def connect(sid, environ):
        print("connect", sid)

    @sio.on('message')
    async def message(sid, data):
        print("server received message!", data)

        await sio.emit("lol", "olololol")

    @sio.on('disconnect')
    async def disconnect(sid):
        print('disconnect', sid)

    # create tornado server, and define routes
    tornadoWebServer = tornado.web.Application([
        (r"/socket.io/", socketio.get_tornado_handler(sio)),

        (r"/terminal-socket", TerminalSocket,
         {'term_manager': term_manager}),
    ])

    # start tornada server
    tornadoWebServer.listen(8888)

    print("moro")

    # start also io loop for tornado
    tornado.ioloop.IOLoop.current().start()
