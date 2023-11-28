[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд


### Что сделанно:
#### ПР13:

Cоздавал express-сервер для Mesto, используя базу данных MongoDB.

Создал схемы и модели для пользователя и карточки.

Создал контроллеры и роуты для пользователя(GET /users — возвращает всех пользователей, GET /users/:userId - возвращает пользователя по _id, POST /users — создаёт пользователя, PATCH /users/me — обновляет профиль, PATCH /users/me/avatar — обновляет аватар) и карточки(GET /cards — возвращает все карточки,POST /cards — создаёт карточку, DELETE /cards/:cardId — удаляет карточку по идентификатору, PUT /cards/:cardId/likes — поставить лайк карточке, DELETE /cards/:cardId/likes — убрать лайк с карточки)

Тестировал в приложении Postman.


##### Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
