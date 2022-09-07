
baseInputRootDir=${baseInputRootDir:-"base"}
source $baseInputRootDir/lib/flags.sh

add_editable_param "-filesFolder" "filesFolder"
add_editable_param "-moduleBaseName" "moduleBaseName"
add_editable_param "-baseEntitySingular" "baseEntitySingular"
add_editable_param "-baseEntityPlural" "baseEntityPlural"
validate_and_assign_params "$@"

rootFolder=output

filesFolder=${filesFolder:-"default"}
filesFolderUp="${filesFolder^}"
filesFolderLow="${filesFolder,}"
moduleBaseName=${moduleBaseName:-"tayudo"}
moduleBaseNameUp="${moduleBaseName^}"
moduleBaseNameLow="${moduleBaseName,}"
baseEntitySingular=${baseEntitySingular:-"medicamento"}
baseEntityPlural=${baseEntityPlural:-"medicamentos"}

makeIntersectFile() {
    auxFolder="facade"
	if [ "" != "$1" ] &&  [ "." != "$1" ]; then
        auxFolder=$1
	fi
    filesInputDir=base/$auxFolder
    baseFile=medicamento
    filesFormat=".ts"
    files=$(find "./$filesInputDir" -name "*[0-9]*$filesFormat" -print0 | sort -z | xargs -r0)
    files=$(echo "$files" | sed -E "s/\\$filesFormat/$filesFormat\n/g")
    output=
    comm=
    repDir="s/\.//smg"
    while read line; do
        line="${line//'./'/}"
        output="${line//$filesInputDir\/$baseFile/}"
        output="${output//$filesFormat/}"

        if ! [[ $output =~ .*[0-9].+ ]]; then
            output="${output//\./}"
            #echo "1 '$line'  '$output'"
            comm="mkdir -p $rootFolder/$filesFolder/$auxFolder/$output/ && cp $line \"\$_\""
            #echo "$comm"
            eval $comm
        else
            #echo "2 '$line'  '$output'"
			outDir=$(echo "$output" | perl -pe "$repDir")
            #comm="./modToFile.sh \"$filesFolder\" \"\" \"$output\"     \"\" \"\" \"$auxFolder\" \"$auxFolder\""
            comm="./modToFile.sh  -filesFolder \"$filesFolder\" -filesOutputFolder \"$outDir\" -baseAndOutputEnd \"$output\" -baseInputFileSubDir \"$auxFolder\" -filesOutputSubDir \"$auxFolder\""
            #echo "$comm"
            eval $comm
        fi
    done <<< $files
    comm="cat"
    for i in $(ls -d $rootFolder/$filesFolder/$auxFolder/*); do
        comm="$comm ${i%%/}/*"
    done
    comm="$comm  > $rootFolder/$filesFolder/$filesFolder.$auxFolder$filesFormat"
    #echo "$comm"
    eval "$comm"
    eval "sed -i 's/$moduleBaseNameUp/$filesFolderUp/g' $rootFolder/$filesFolder/$filesFolder.$auxFolder.ts"
    eval "sed -i 's/$moduleBaseNameLow/$filesFolderLow/g' $rootFolder/$filesFolder/$filesFolder.$auxFolder.ts"
    eval "rm -r $rootFolder/$filesFolder/$auxFolder*"
}

#eval "rm -r $rootFolder/$filesFolder"
./dtoToMod.sh -dtoInputSubDir "$filesFolder" -modelOutputSubDir "$filesFolder"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "servicios" -baseAndOutputEnd ".service"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "estados"   -baseAndOutputEnd ".state"

./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%name%" -baseAndOutputEnd ".component" -baseAndOutputFormat ".ts"      -baseInputFileSubDir "componentes/$baseEntitySingular" -filesOutputSubDir "componentes"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%name%" -baseAndOutputEnd ".component" -baseAndOutputFormat ".html"    -baseInputFileSubDir "componentes/$baseEntitySingular" -filesOutputSubDir "componentes"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%name%" -baseAndOutputEnd ".component" -baseAndOutputFormat ".css"     -baseInputFileSubDir "componentes/$baseEntitySingular" -filesOutputSubDir "componentes"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%name%" -baseAndOutputEnd ".component" -baseAndOutputFormat ".spec.ts" -baseInputFileSubDir "componentes/$baseEntitySingular" -filesOutputSubDir "componentes"

./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%pluralName%" -baseAndOutputEnd ".component" -baseAndOutputFormat ".ts"      -baseInputFileSubDir "componentes/$baseEntityPlural" -filesOutputSubDir "componentes" -baseInputFile "%plural%"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%pluralName%" -baseAndOutputEnd ".component" -baseAndOutputFormat ".html"    -baseInputFileSubDir "componentes/$baseEntityPlural" -filesOutputSubDir "componentes" -baseInputFile "%plural%"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%pluralName%" -baseAndOutputEnd ".component" -baseAndOutputFormat ".css"     -baseInputFileSubDir "componentes/$baseEntityPlural" -filesOutputSubDir "componentes" -baseInputFile "%plural%"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%pluralName%" -baseAndOutputEnd ".component" -baseAndOutputFormat ".spec.ts" -baseInputFileSubDir "componentes/$baseEntityPlural" -filesOutputSubDir "componentes" -baseInputFile "%plural%"

./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%name%-container" -baseAndOutputEnd "-container.component" -baseAndOutputFormat ".ts"      -baseInputFileSubDir "contenedores/$baseEntitySingular-container" -filesOutputSubDir "contenedores"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%name%-container" -baseAndOutputEnd "-container.component" -baseAndOutputFormat ".html"    -baseInputFileSubDir "contenedores/$baseEntitySingular-container" -filesOutputSubDir "contenedores"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%name%-container" -baseAndOutputEnd "-container.component" -baseAndOutputFormat ".css"     -baseInputFileSubDir "contenedores/$baseEntitySingular-container" -filesOutputSubDir "contenedores"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%name%-container" -baseAndOutputEnd "-container.component" -baseAndOutputFormat ".spec.ts" -baseInputFileSubDir "contenedores/$baseEntitySingular-container" -filesOutputSubDir "contenedores"

./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%pluralName%-container" -baseAndOutputEnd "-container.component" -baseAndOutputFormat ".ts"      -baseInputFileSubDir "contenedores/$baseEntityPlural-container" -filesOutputSubDir "contenedores" -baseInputFile "%plural%"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%pluralName%-container" -baseAndOutputEnd "-container.component" -baseAndOutputFormat ".html"    -baseInputFileSubDir "contenedores/$baseEntityPlural-container" -filesOutputSubDir "contenedores" -baseInputFile "%plural%"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%pluralName%-container" -baseAndOutputEnd "-container.component" -baseAndOutputFormat ".css"     -baseInputFileSubDir "contenedores/$baseEntityPlural-container" -filesOutputSubDir "contenedores" -baseInputFile "%plural%"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%pluralName%-container" -baseAndOutputEnd "-container.component" -baseAndOutputFormat ".spec.ts" -baseInputFileSubDir "contenedores/$baseEntityPlural-container" -filesOutputSubDir "contenedores" -baseInputFile "%plural%"

eval "cp -r base/contenedores/document-viewer-container $rootFolder/$filesFolder/contenedores/"

./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%name%-view" -baseAndOutputEnd "-view.component" -baseAndOutputFormat ".ts"      -baseInputFileSubDir "vistas/$baseEntitySingular-view" -filesOutputSubDir "vistas"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%name%-view" -baseAndOutputEnd "-view.component" -baseAndOutputFormat ".html"    -baseInputFileSubDir "vistas/$baseEntitySingular-view" -filesOutputSubDir "vistas"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%name%-view" -baseAndOutputEnd "-view.component" -baseAndOutputFormat ".css"     -baseInputFileSubDir "vistas/$baseEntitySingular-view" -filesOutputSubDir "vistas"
./modToFile.sh -filesFolder "$filesFolder" -filesOutputFolder "%name%-view" -baseAndOutputEnd "-view.component" -baseAndOutputFormat ".spec.ts" -baseInputFileSubDir "vistas/$baseEntitySingular-view" -filesOutputSubDir "vistas"

./modToFile.sh -filesFolder "$filesFolder"  -filesOutputFolder "%pluralName%-view" -baseAndOutputEnd "-view.component" -baseAndOutputFormat ".ts"      -baseInputFileSubDir "vistas/$baseEntityPlural-view" -filesOutputSubDir "vistas" -baseInputFile "%plural%"
./modToFile.sh -filesFolder "$filesFolder"  -filesOutputFolder "%pluralName%-view" -baseAndOutputEnd "-view.component" -baseAndOutputFormat ".html"    -baseInputFileSubDir "vistas/$baseEntityPlural-view" -filesOutputSubDir "vistas" -baseInputFile "%plural%"
./modToFile.sh -filesFolder "$filesFolder"  -filesOutputFolder "%pluralName%-view" -baseAndOutputEnd "-view.component" -baseAndOutputFormat ".css"     -baseInputFileSubDir "vistas/$baseEntityPlural-view" -filesOutputSubDir "vistas" -baseInputFile "%plural%"
./modToFile.sh -filesFolder "$filesFolder"  -filesOutputFolder "%pluralName%-view" -baseAndOutputEnd "-view.component" -baseAndOutputFormat ".spec.ts" -baseInputFileSubDir "vistas/$baseEntityPlural-view" -filesOutputSubDir "vistas" -baseInputFile "%plural%"

makeIntersectFile "facade"
makeIntersectFile "module"
makeIntersectFile "routing.module"
makeIntersectFile "header"
