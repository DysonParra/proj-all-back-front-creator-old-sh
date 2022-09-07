baseInputRootDir=${baseInputRootDir:-"base"}
source $baseInputRootDir/lib/flags.sh
source $baseInputRootDir/lib/glosary.sh

set_module_base_config() {
	#Define nombre base del modulo.
	moduleBaseName=${moduleBaseName:-"tayudo"}
	moduleBaseNameUp="${moduleBaseName^}"
	moduleBaseNameLow="${moduleBaseName,}"
}

set_base_config() {
	#Define el archivo base y su ruta.
	baseInputDir=${baseInputDir:-"base"}
	baseInputFilePlural=${baseInputFilePlural:-"medicamentos"}
	baseInputFile=${baseInputFile:-"medicamento"}

	if [[ $baseInputFile =~ .*"%".*"%".* ]]; then
		baseInputFileAux=$baseInputFile
		baseInputFile="medicamento";
	fi

	baseInputFileSingular=$baseInputFile

	#Almacena información singular y plural del archivo base.
	baseInputFileSingularUp="${baseInputFileSingular^}"
	baseInputFileSingularLow="${baseInputFileSingular,}"
	baseInputFilePluralUp="${baseInputFilePlural^}"
	baseInputFilePluralLow="${baseInputFilePlural,}"

	if [[ $baseInputFileAux =~ .*"%plural%".* ]]; then
		baseInputFile="${baseInputFileAux//'%plural%'/$baseInputFilePlural}"
	elif [[ $baseInputFileAux =~ .*"%pluralUp%".* ]]; then
		baseInputFile="${baseInputFileAux//'%pluralUp%'/$baseInputFilePluralUp}"
	elif [[ $baseInputFileAux =~ .*"%pluralLow%".* ]]; then
		baseInputFile="${baseInputFileAux//'%pluralLow%'/$baseInputFilePluralLow}"
	elif [[ $baseInputFileAux =~ .*"%singular%".* ]]; then
		baseInputFile="${baseInputFileAux//'%singular%'/$baseInputFileSingular}"
	elif [[ $baseInputFileAux =~ .*"%singularUp%".* ]]; then
		baseInputFile="${baseInputFileAux//'%singularUp%'/$baseInputFileSingularUp}"
	elif [[ $baseInputFileAux =~ .*"%singularLow%".* ]]; then
		baseInputFile="${baseInputFileAux//'%singularLow%'/$baseInputFileSingularLow}"
	fi

	#Define nombre del modelo base.
	baseInputModelDir=${baseInputModelDir:-$baseInputDir}
	baseInputModelFile=${baseInputModelFile:-"medicamento"}
	baseModelStart=${baseModelStart:-""}
	baseModelEnd=${baseModelEnd:-".model"}
	baseModelFormat=${baseModelFormat:-".ts"}
	baseInputModelPath="$baseInputModelDir/$baseModelStart$baseInputModelFile$baseModelEnd$baseModelFormat"

	#Define nombre del archivo base por defecto a usar.
	baseInputFileSubDir=${baseInputFileSubDir:-""}
	baseInputFileDir=${baseInputFileDir:-$baseInputDir}
	if [ "" != "baseInputFileSubDir" ] ; then baseInputFileDir=$baseInputFileDir/$baseInputFileSubDir; fi
	baseFileStart=${baseFileStart:-""}
	baseFileEnd=${baseFileEnd:-".service"}
	baseFileFormat=${baseFileFormat:-".ts"}
	baseInputFilePath="$baseInputFileDir/$baseFileStart$baseInputFile$baseFileEnd$baseFileFormat"
}

set_files_config() {
	#Define nombres de los modelos de cada archivo a crear.
	filesInputStart=${filesInputStart:-""}
	filesInputEnd=${filesInputEnd:-".model"}
	filesInputFormat=${filesInputFormat:-".ts"}

	#Define nombre por defecto de cada archivo de salida.
	filesOutputStart=${filesOutputStart:-""}
	filesOutputEnd=${filesOutputEnd:-".service"}
	filesOutputFormat=${filesOutputFormat:-".ts"}
}

set_directories() {
	#Define directorios de los archivos
	rootFolder=${rootFolder:-"output"}
	filesFolder=${filesFolder:-"generated"}
	outputModuleUp="${filesFolder^}"
	outputModuleLow="${filesFolder,}"
	filesInputFolder=${filesInputFolder:-"modelos"}
	filesOutputFolder=${filesOutputFolder:-"default"}
	filesInputDir="$rootFolder/$filesFolder/$filesInputFolder"
	filesOutputSubDir=${filesOutputSubDir:-""}
	if [ "" != "$filesOutputSubDir" ] ; then
		filesOutputDir="$rootFolder/$filesFolder/$filesOutputSubDir/$filesOutputFolder"
	else
		filesOutputDir="$rootFolder/$filesFolder/$filesOutputFolder"
	fi
}

getFileInfo() {
	fileNameUp=
	fileNameLow=
	fileOutPath=

	#Obtiene ruta y nombre de cada archivo.
	fileInpuPath="${1//'./'/}"
	filename="${fileInpuPath//$filesInputEnd$filesInputFormat/}"
	filename="${filename//$filesInputDir\//}"
	fileNameUp="${filename^}"
	fileNameLow="${filename,}"
	fileOutPath="$filesOutputDir/$filesOutputStart$fileNameLow$filesOutputEnd$filesOutputFormat"

	# Imprime ruta y nombre del archivo.
	#echo "Input:       '$fileInpuPath'"
	#echo Name Upper: \'$fileNameUp\'
	#echo Name Lower: \'$fileNameLow\'
	#echo "Output:      '$fileOutPath'"

}

set_config_as_custom() {

	add_editable_param "-moduleBaseName" "moduleBaseName"

	add_editable_param "-baseInputDir" "baseInputDir"
	add_editable_param "-baseInputModelDir" "baseInputModelDir"
	add_editable_param "-baseInputFileDir" "baseInputFileDir"

	add_editable_param "-baseInputFile" "baseInputFile"
	add_editable_param "-baseInputFilePlural" "baseInputFilePlural"

	add_editable_param "-baseInputModelDir" "baseInputModelDir"
	add_editable_param "-baseInputModelFile" "baseInputModelFile"
	add_editable_param "-baseModelStart" "baseModelStart"
	add_editable_param "-baseModelEnd" "baseModelEnd"
	add_editable_param "-baseModelFormat" "baseModelFormat"

	add_editable_param "-baseFileStart" "baseFileStart"
	add_editable_param "-baseFileEnd" "baseFileEnd"
	add_editable_param "-baseFileFormat" "baseFileFormat"

	add_editable_param "-filesInputStart" "filesInputStart"
	add_editable_param "-filesInputEnd" "filesInputEnd"
	add_editable_param "-filesInputFormat" "filesInputFormat"

	add_editable_param "-filesOutputStart" "filesOutputStart"
	add_editable_param "-filesOutputEnd" "filesOutputEnd"
	add_editable_param "-filesOutputFormat" "filesOutputFormat"

	add_editable_param "-rootFolder" "rootFolder"
	add_editable_param "-filesFolder" "filesFolder"
	add_editable_param "-filesInputFolder" "filesInputFolder"
	add_editable_param "-filesOutputFolder" "filesOutputFolder"

	add_editable_param "-baseAndOutputStart" "baseFileStart"
	add_editable_param "-baseAndOutputStart" "filesOutputStart"
	add_editable_param "-baseAndOutputEnd" "baseFileEnd"
	add_editable_param "-baseAndOutputEnd" "filesOutputEnd"
	add_editable_param "-baseAndOutputFormat" "baseFileFormat"
	add_editable_param "-baseAndOutputFormat" "filesOutputFormat"

	add_editable_param "-baseInputFileSubDir" "baseInputFileSubDir"
	add_editable_param "-filesOutputSubDir" "filesOutputSubDir"

	validate_and_assign_params "$@"
	set_base_config
	set_module_base_config
	set_files_config
	set_directories
}

getPrimaryKeyBase() {
	primaryKeyBaseUp=IntId
	primaryKeyBaseLow=intId
	primaryKeybaseFileFormat=null
	#Almacena el contenido del archivo base.
	file=$(cat "$baseInputModelPath")
	#echo "$file"
	primaryKeyBaseLow=$(echo "$file" | egrep -o  -m 1 '(.*?):' | perl -0pe 's/\s*(.*?)\s*:/$1/smg')
	primaryKeybaseFileFormat=$(echo "$file" | egrep -o  -m 1 ':(.*?);' | perl -0pe 's/\s*:\s*(.*?)\s*;/$1/smg')
	primaryKeyBaseUp="${primaryKeyBaseLow^}"
	echo "PK Base Low:         '$primaryKeyBaseLow'"
	echo "PK Base Up:          '$primaryKeyBaseUp'"
	#echo "PK Base Form: '$primaryKeybaseFileFormat'"
	#echo
}

getPrimaryKey() {
	primaryKeyUp=IntId
	primaryKeyLow=intId
	primaryKeyFormat=null
	#Almacena el contenido del modelo base.
	file=$(cat "$fileInpuPath")
	#echo "$file"
	primaryKeyLow=$(echo "$file" | egrep -o  -m 1 '(.*?):' | perl -0pe 's/\s*(.*?)\s*:/$1/smg')
	primaryKeyFormat=$(echo "$file" | egrep -o  -m 1 ':(.*?);' | perl -0pe 's/\s*:\s*(.*?)\s*;/$1/smg')
	primaryKeyUp="${primaryKeyLow^}"
	#echo "PK Low:       '$primaryKeyLow'"
	#echo "PK Up:        '$primaryKeyUp'"
	#echo "PK Form:      '$primaryKeyFormat'"
}

fieldsFilesFolder=fields
getFields() {
	#Almacena el contenido del modelo base.
	file=$(cat "$fileInpuPath")
	field=
	fieldFormat=
	fields=()
	fieldsFormat=()
	count=0
	while read line; do
	if [[ $line =~ .*:.+\;.* ]]; then
		#echo "--$line"
		field=$(echo "$line" | egrep -o  -m 1 '(.*?):' | perl -0pe 's/\s*(.*?)\s*:/$1/smg')
		fieldFormat=$(echo "$line" | egrep -o  -m 1 ':(.*?);' | perl -0pe 's/\s*:\s*(.*?)\s*;/$1/smg')
		#echo "'$field' '$fieldFormat'"
		fields[$count]=$field
		if [ "$fieldFormat" == "string" ]; then
			if [[ "$field" =~ .*Fecha.* ]] || [[ "$field" =~ .*fecha.* ]] || [[ "$field" =~ .*date.* ]] || [[ "$field" =~ .*Date.* ]]; then
				fieldsFormat[$count]="date"
			else
				fieldsFormat[$count]=$fieldFormat
			fi
		else
			fieldsFormat[$count]=$fieldFormat
		fi
		count=$((count+1))
	fi
	done <<< $file

	#for m in "${!fields[@]}"; do
	#	echo "'${fields[m]}' '${fieldsFormat[m]}'"
	#done
}

getFieldsColumns() {
	fieldsColumns=()
	allFieldColumns=
	fieldFilePath=
	fieldFile=
	count=0
	for m in "${!fields[@]}"; do
		fieldFilePath="$baseInputFileDir/$fieldsFilesFolder/${fieldsFormat[m]}$baseFileEnd$baseFileFormat"
		if ! [ -f "$fieldFilePath" ]; then
			fieldFilePath="$baseInputFileDir/$fieldsFilesFolder/string$baseFileEnd$baseFileFormat"
		fi
		#echo "$fieldFilePath"
		fieldFile=$(cat "$fieldFilePath")
		replaceField="s/fieldName/${fields[m]}/smg"
		#echo "$replaceField"
		fieldFile=$(echo "$fieldFile" | perl -pe "$replaceField")
		#echo "$fieldFile"
		fieldsColumns[$count]=$fieldFile
		if [ "$count" != "0" ]; then
			allFieldColumns="$allFieldColumns$fieldFile%newLine%"
		fi
		count=$((count+1))
	done
	allFieldColumns=$(echo "$allFieldColumns" | sed -E "s/%newLine%/\n/g")
	#echo "$allFieldColumns"
}

#Actualiza la informacion indicada como parámetro.
set_config_as_custom "$@"

echo "baseInputModelPath:  '$baseInputModelPath'"
echo "baseInputFilePath:   '$baseInputFilePath'"
echo "filesInputDir:       '$filesInputDir'"
echo "filesOutputDir:      '$filesOutputDir'"
echo "moduleBaseName:      '$moduleBaseName'"
echo "outputModule:        '$outputModuleLow'"

getPrimaryKeyBase
get_glosary_info

if ! [[ $filesOutputFolder =~ .*"%name%".* ]] && ! [[ $filesOutputFolder =~ .*"%pluralName%".* ]]; then
	mkdir -p $filesOutputDir
fi
fileOpen=
find "./$filesInputDir" -name "$filesStart*$filesInputEnd$filesInputFormat" | while read line; do

	getFileInfo $line
	getPrimaryKey
	search_in_glosary $fileNameUp

	fileOutPathAux=
	if [[ $filesOutputFolder =~ .*"%name%".* ]]; then
		fileOutPath="${fileOutPath//'%name%'/$singularNameLow}"
		newDir="${fileOutPath//$filesOutputStart$fileNameLow$filesOutputEnd$filesOutputFormat/}"
		mkdir -p $newDir
	elif  [[ $filesOutputFolder =~ .*"%pluralName%".* ]]; then
		fileOutPath="$filesOutputDir/$filesOutputStart$pluralNameLow$filesOutputEnd$filesOutputFormat"
		fileOutPath="${fileOutPath//'%pluralName%'/$pluralNameLow}"
		newDir="${fileOutPath//$filesOutputStart$pluralNameLow$filesOutputEnd$filesOutputFormat/}"
		mkdir -p $newDir
	fi

	#Imprime información del archivo.
	echo "Input:       '$fileInpuPath'"
	echo "Output:      '$fileOutPath'"
	echo "PK Low:      '$primaryKeyLow'"
	echo "PK Up:       '$primaryKeyUp'"
	echo "Name:        '$fileNameUp'"
	echo "Type:        '$type'"
	echo "SingularUp:  '$singularNameUp'"
	echo "SingularLow: '$singularNameLow'"
	echo "PluralUp:    '$pluralNameUp'"
	echo "PluralLow:   '$pluralNameLow'"

	#Almacena el contenido del archivo base de entrada.
	fileOpen=$(cat "$baseInputFilePath")
	#echo "$fileOpen"

	#Obtiene regex para remplazar la clave primaria del archivo base por la del modelo.
	replacePkUp="s/$primaryKeyBaseUp/$primaryKeyUp/smg"
	replacePkLow="s/$primaryKeyBaseLow/$primaryKeyLow/smg"
	#echo "$replacePkUp"
	#echo "$replacePkLow"

	#Obtiene regex para remplazar el nombre del archivo por el del base en singular, plural, minúscula y mayúscula.
	replaceUpPlur="s/$baseInputFilePluralUp/$pluralNameUp/smg"
	replaceLowPlur="s/$baseInputFilePluralLow/$pluralNameLow/smg"
	replaceUpSing="s/$baseInputFileSingularUp/$singularNameUp/smg"
	replaceLowSing="s/$baseInputFileSingularLow/$singularNameLow/smg"
	#echo "$replaceUpPlur"
	#echo "$replaceLowPlur"
	#echo "$replaceUpSing"
	#echo "$replaceLowSing"

	#Obtiene regex para remplazar nombre del modulo base por el específicado.
	replaceModuleUp="s/$moduleBaseNameUp/$outputModuleUp/smg"
	replaceModuleLow="s/$moduleBaseNameLow/$outputModuleLow/smg"
	#echo "$replacePkUp"
	#echo "$replacePkLow"

	#Remplaza el nombre del archivo base y su clave primaria por los del modelo.
	fileOpen=$(echo "$fileOpen" | perl -pe "$replaceUpPlur")
	fileOpen=$(echo "$fileOpen" | perl -pe "$replaceLowPlur")
	fileOpen=$(echo "$fileOpen" | perl -pe "$replaceUpSing")
	fileOpen=$(echo "$fileOpen" | perl -pe "$replaceLowSing")
	fileOpen=$(echo "$fileOpen" | perl -pe "$replacePkUp")
	fileOpen=$(echo "$fileOpen" | perl -pe "$replacePkLow")
	fileOpen=$(echo "$fileOpen" | perl -pe "$replaceModuleUp")
	fileOpen=$(echo "$fileOpen" | perl -pe "$replaceModuleLow")

	columnsReplaceMatch="<dxi-column>%columns%</dxi-column>"
	if [[ $fileOpen =~ .*$columnsReplaceMatch.* ]]; then
		echo "Replaced     '%columns%'"
		getFields
		getFieldsColumns

		columnsReplaceMatchScaped="${columnsReplaceMatch//\"/\\\"}"
		allFieldColumnsScaped="${allFieldColumns//\"/\\\"}"
		columnsReplaceMatchScaped="${columnsReplaceMatchScaped//\//\\\/}"
		allFieldColumnsScaped="${allFieldColumnsScaped//\//\\\/}"
		replaceColumns="s/$columnsReplaceMatchScaped/$allFieldColumnsScaped/smg"
		fileOpen=$(echo "$fileOpen" | perl -pe "$replaceColumns")
	fi

	#Crea el archivo de salida.
	echo "$fileOpen" > $fileOutPath

	echo

done
