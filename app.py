import tornado.web
from tornado.ioloop import IOLoop
from terminado import TermSocket, SingleTermManager


class CustomTermSocket(TermSocket):
    def check_origin(self, origin):
        return True


if __name__ == '__main__':
    term_manager = SingleTermManager(shell_command=['bash'])
    handlers = [
        (r"/websocket", CustomTermSocket, {'term_manager': term_manager}),
        (r"/()", tornado.web.StaticFileHandler, {'path': 'index.html'}),
        (r"/(.*)", tornado.web.StaticFileHandler, {'path': '.'}),
    ]
    app = tornado.web.Application(handlers)
    app.listen(8080)
    print("asdf")
    IOLoop.current().start()
