
# Настройка
Для начала требуется внести изменения в env_vars.js и изменить SERVER_GEN (сервер
для генерации отпечатка), SERVER_DATA_TO (сервер для приема отпечатка), ELEMENT_FOR_HASH
(элемент для вывоша хэша), DEBUG (включает красные ошибки и некоторые console.log'и для проверка работы)

## Локальный запуск
Требуется перейти в директорию клиента и выполнить команды:
```bash
npm install -g http-server
http-server -p 8888
```

# Список собираемых свойств
1. userAgent //Агент юзера
2. webdriver //Используется ли юзер аггент в автоматическом режиме
3. language //Язык
4. colorDepth //Глубина цвета
5. deviceMemory //Оперативка в гигах
6. hardwareConcurrency//Сколько тредов можно 
7. screenResolution //Разрешение экрана
8. screenTop //смещение окна по вертикали
9. screenLeft //смещение окна по горизонтали
10. availableScreenResolution //Доступное для отображения
11. timezoneOffset // Разница между utc и текущей зоной
12. timezone //Пояс
13. sessionStorage // Доступно сессионное хранилище
14. localStorage // Доступно ли локальное хранилище
15. mediaDevices //медиа девайсы
16. mimeTypes // mime типы
17. mathConst // проверка что выдаст девайс при мат.операциях
18. indexedDb // Доступно ли indexDb
19. addBehavior // Что-то связанное с body тэгом
20. openDatabase // Есть ли функция открытия базы по типу sqllite
21. cpuClass // Проверка CPU
22. platform //ОС
23. permissions //права, которые даны броузеру юзером
24. plugins //Стандартные плагины браузера
25. canvas //Фингер канваса
26. webglVendorAndRenderer //карта и входы
27. adBlock  //Включен ли адблок
28. hasLiedLanguages //Проверка на подмену языков
29. hasLiedResolution //Проверка на подмену Разрешения
30. hasLiedOs //Проверка на подмену ОСи
31. oscpu  //Тож инфа об OS
32. isJavaEnabled  //Включена ли джава
33. appVersion //Вся информация о версии браузера
34. languages //Доступные языки
35. pluginsAvailable //Есть ли плагина
36. vendor //Разраб браузера 
37. vendorSub //Номер версии браузера от вендора
38. hasLiedBrowser //Проверка на подмену браузера
39. touchSupport //Сколько касаний одновременно поддерживает устройство
40. audioFormats // форматы аудио
41. audioParameters //звуковые хар-ки устройства
42. fonts //Фингерпринт с использованием шрифтов
43. audio //Фингерпринт с использованием аудио
44. ja3Hash //TLS fingerprinting(сейчас используется чужой сервис)
