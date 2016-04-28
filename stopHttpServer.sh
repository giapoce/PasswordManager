#!/bin/bash

netstat -nap | egrep -w HttpServer | awk '{print $NF}' | cut -d '/' -f1 | sort | uniq | xargs -I {} kill -9 {}
