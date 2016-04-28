#!/bin/bash

GOPATH=/root/work

[[ -f HttpServer.go ]] ||  { echo "Missing HttpServer.go"; exit 1; }

cp -p HttpServer.go $GOPATH/src/HttpServer/HttpServer.go

echo "Building ..."
[[ -f $GOPATH/bin/HttpServer ]] && rm -f $GOPATH/bin/HttpServer
go install HttpServer && $GOPATH/bin/HttpServer &

#go run HttpServer.go &
