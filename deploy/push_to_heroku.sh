#!/bin/bash

eval "$(docker-machine env default)"
heroku container:login
docker tag boundary_service:v0.0.1 registry.heroku.com/${CUSTOM_ENVIRONMENT}boundary-beruni/web:build_${CI_BUILD_ID}
docker push registry.heroku.com/${CUSTOM_ENVIRONMENT}boundary-beruni/web:build_${CI_BUILD_ID}