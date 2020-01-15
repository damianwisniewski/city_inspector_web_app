# City Inspector Web App

Do uruchomienia projektu, należy posiadać oczywiście zainstalowany NodeJS, a następnie zainstalować wszystkie zależności poprzez polecenie `npm install`. Następnie wystarczy zaledwie uruchomić `npm start`.

Domyślnie aplikacja uruchomi się z produkcyjną domeną dla rest api. Aby zmienić ją na lokalną, należ z pliku .env ustawić następującą zmienną: `REACT_APP_FEED_DOMAIN="http://local-city-inspector.herokuapp.com:3000"`

Konieczne równie będzie ustawienie mapowiania w `etc/hosts` dodając w pliku dodatkową linijkę `127.0.0.1 local-city-inspector.herokuapp.com`
