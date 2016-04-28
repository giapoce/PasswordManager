#!/bin/bash

grep text/javascript index.html | while read line
do 

	substr=$(echo ${line##*=\"})
	echo ${substr%\"*}

done | sed '$ !s/\([^ ]*\)/'\''&'\'',/;$s/\([^ ]*\)/'\''&'\''/'
