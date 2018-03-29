#!/usr/bin/env bash

RIGHT_HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

docker run --name='activemq' -it --rm \
	-e 'ACTIVEMQ_CONFIG_MINMEMORY=512' \
    -e 'ACTIVEMQ_CONFIG_MAXMEMORY=2048' \
    -p 8161:8161 \
	-p 61616:61616 \
	-p 61613:61613 \
	-p 5672:5672 \
	-v /Users/max/resolve/activemq/data:/data \
	-v /Users/max/resolve/activemq/logs:/var/log/activemq \
    resolve-amq

rm -rf ${RIGHT_HERE}/logs/*

#    webcenter/activemq:latest
#	-v /Users/max/resolve/activemq/conf:/opt/activemq/conf \

