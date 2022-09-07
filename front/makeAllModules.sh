printf -v startDate '%(%Y-%m-%d %H:%M:%S)T' -1

dtoFilesDir=dto
dtoDirs=$(find "$dtoFilesDir" -mindepth 1 -maxdepth 1 -type d -exec ls -d {} +)
echo "dtoDirs:"
echo "$dtoDirs:"
echo

if  [[ ! -z "$dtoDirs" ]] && [ "" != "$dtoDirs" ]; then
	while read lineAux; do
        #echo $lineAux
        echo "${lineAux/$dtoFilesDir\//}"
        ./makeAll.sh -filesFolder "${lineAux/$dtoFilesDir\//}"
    done <<< $dtoDirs
fi

headers=$(find "output" -name "*.header.ts" -print0 | sort -z | xargs -r0)
eval "cat $headers > output/headers.ts"
eval "rm $headers"

printf -v endDate '%(%Y-%m-%d %H:%M:%S)T' -1
echo "Start: $startDate"
echo "End:   $endDate"
#path: '(.*)'
#path: '\L$1'