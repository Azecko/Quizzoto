WEBCONTAINER ?= quizzoto_web
DBCONTAINER ?= quizzoto_db

up:
	docker compose up -d

logs:
	docker compose logs -f

log:
	docker compose logs $(WEBCONTAINER) -f

log-db:
	docker compose logs $(DBCONTAINER) -f

exec:
	docker compose exec -it $(WEBCONTAINER) bash

stop-all:
	docker stop $$(docker ps -qa)

down:
	docker compose down
