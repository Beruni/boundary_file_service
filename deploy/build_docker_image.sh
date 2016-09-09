#!/bin/bash -e

eval "$(docker-machine env default)"
cd deploy
docker build -f Dockerfile --tag boundary_service:v0.0.1 ../