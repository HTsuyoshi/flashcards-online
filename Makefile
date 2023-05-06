IMAGE_NAME     := flashcards-online:v1.0.0
CONTAINER_NAME := flashcards-online

.PHONY: 'start build'
start: build
	@echo 'Starting container...'
	@docker container run --rm -ti -p 127.0.0.1:8000:80 --name $(CONTAINER_NAME) $(IMAGE_NAME)

build:
	@echo 'Building the docker image...'
	@docker image build --tag $(IMAGE_NAME) .

.PHONY: 'clean'
clean:
	@echo 'Removing the docker images...'
	@docker image rm $(IMAGE_NAME)
