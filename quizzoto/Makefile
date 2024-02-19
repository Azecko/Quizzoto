include .env

WEBCONTAINER ?= quizzoto_web
DBCONTAINER ?= quizzoto_db

up:
	docker compose up -d

down:
	docker compose down

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



start-fresh: down
	sudo rm -rf data/*
	$(MAKE) up logs

get-quizz-url:
	@QUIZZID=$$(docker exec -it quizzotoDB bash -c 'mongosh "mongodb://$${MONGO_INITDB_USER_USERNAME}:$${MONGO_INITDB_USER_PASSWORD}@quizzoto_db:27017/$${MONGO_INITDB_DATABASE}" --quiet --eval "db.getCollection(\"quizzs\").find({}, {\"_id\":1})"' | grep -oE '[0-9a-f]{24}' | tr -d '[:space:]'); \
	echo http://localhost:3000/quizz/$$QUIZZID

test-e2e:
	npx playwright test

test-ui:
	npx playwright test --ui

test-chromium:
	npx playwright test --project=chromium

test-debug:
	npx playwright test --debug

test-codegen:
	npx playwright codegen

test-report:
	npx playwright test
