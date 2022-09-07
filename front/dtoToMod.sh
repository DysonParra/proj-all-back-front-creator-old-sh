baseInputRootDir=${baseInputRootDir:-"base"}
source $baseInputRootDir/lib/flags.sh

baseDtoStart=
baseDtoEnd=DTO
baseFormat=.java

dtoRootDir=dto
dtoInputSubDir=
dtoDir=

modelOutputDirRootDir=output/modelos
modelOutputSubDir=
modelOutputDir=
modelOutStart=
modelOutEnd=.model.ts

add_editable_param "-modelOutputSubDir" "modelOutputSubDir"
add_editable_param "-dtoInputSubDir" "dtoInputSubDir"
validate_and_assign_params "$@"

dtoDir=${dtoInputSubDir:+"$dtoRootDir/$dtoInputSubDir"}
dtoDir=${dtoDir:=$dtoRootDir}

modelOutputDir=${modelOutputSubDir:+"output/$modelOutputSubDir/modelos"}
modelOutputDir=${modelOutputDir:=$modelOutputDirRootDir}

mkdir -p $modelOutputDir

find "./$dtoDir" -maxdepth 1 -name "$baseDtoStart*$baseDtoEnd$baseFormat" | while read line; do

	filePath="${line//'./'/}"
	filename="${filePath//$files/}"
	filename="${filename//$dtoDir\//}"
	filename="${filename//$baseDtoStart/}"
	filename="${filename//$baseDtoEnd$baseFormat/}"
	fileNameUp="${filename^}"
	fileNameLow="${filename,}"
	fileModel="$modelOutputDir/$modelOutStart$fileNameLow$modelOutEnd"

	echo "DTO:   '$filePath'"
	#echo "Upper  '$fileNameUp'"
	#echo "Lower  '$fileNameLow'"
	echo "Model: '$fileModel'"

	#Almacena el contenido del archivo DTO de entrada.
	fileOpen=$(cat "$filePath")
	#echo "$fileOpen"

	#Borra paquetes del archivo DTO  .
	fileOpen=$(echo "$fileOpen" | perl -pe 's/.*?package.*?\n//g')

	#Borra imports del archivo DTO  .
	fileOpen=$(echo "$fileOpen" | perl -pe 's/.*?import.*?\n//g')

	#Borra decoradores del archivo DTO  .
	fileOpen=$(echo "$fileOpen" | perl -pe 's/.*?@.*?\n//g')

	#Borra lineas vacias
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/(\s+\n)+/\n/smg')

	#Remplaza public por export.
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/public\s+class/export class/smg')

	#Remplaza DTO por ViewModel.
	dtoRep="s/$baseDtoEnd/ViewModel/smg"
	fileOpen=$(echo "$fileOpen" | perl -0pe "$dtoRep")

	#Borra private y reordena las variables.
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/private\s+(.*?)\s+(.*?)\s*;/$2: $1;/smg;')

	#Remplaza los tipos de datos de las variables.
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/Long|Integer|BigDecimal|Float|float|Double|double/number/smg')
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/int\s*;/number;/smg')
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/String|Date|Character/string/smg')
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/Boolean/boolean/smg')

	#Crea el archivo de salida.
	echo "$fileOpen" > $fileModel
	echo

done
