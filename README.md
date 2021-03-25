# Charades-socketio-vue
Online version: https://charades.osupoli.pl/ <br>
If you won't be able to connect with someone (or connect by yourself) give it a moment, the Backend server must start.<br>
It's turning off after 24H while nobody is playing.

<br>
Simple charades game connected with [Datamuse API wordfinding query engine](https://www.datamuse.com/api/)<br />
It's not a quality code, but I hope it's easy to edit and read <br />

## Frameworks/Libraries used:
<p> [KonvaJS](https://www.konvajs.org/) - the <b>biggest</b> problem of that project,  as I see, it's not good
in drawing a lot of elements, and if someone will draw huge pictures, then it could lag a little bit</p>

<p>[Bootstrap Vue](https://www.bootstrap-vue.org/) - UI elements</p>

<p>[Socket.io](https://www.socket.io/) - Communication between players</p>

<p>[Vue](https://www.vuejs.org/) - front</p>

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
