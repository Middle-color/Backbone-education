## Как запустить

1. Перейти в папку с проектом.
2. `npm install -g grunt-cli bower`.
2. `npm install`.
3. `bower install`.
4. Запустить основной сервер `node app.js`.
5. Открыть вторую консоль.
6. Во второй консоли запустить `grunt`.

## Как использовать

Grunt выполняет только jshint и livereload, никаких сборок.

При обновлении библиотек через bower выполнять `grunt copy`.

Если хочешь разрабатывать без Grunt - нужно закоментить livereload-script в **views/layout.jade**; Иначе будет падать ошибка и Require.js не работает.

Для простоты создания нового модуля есть файл **public/javascripts/boilerplate.js**. Его нужно скопировать, переименовать файл, добавить нужные зависимости в массив и переименовать объект внутри.

Содержание **public/javascripts/boilerplate.js**:

```javascript
define([
    'backbone'
],
function(Backbone){
    var Boilerplate = Backbone.View.extend();

    return Boilerplate;
});
```

Для быстроты разработки файлы шаблонов подтягиваются по http плагином и парсятся прямо в браузере.

Для подключения шаблона нужно в массив зависимостей добавить строку вида: `'jade!../../templates/login'`
