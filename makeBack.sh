set_base_files_config() {
	#Define el archivo base y su ruta.
	baseInputDir=${baseInputDir:-"$baseInputRootDir/back"}
	baseInputFile=${baseInputFile:-"EntidadGenerica"}
	baseInputFileSingular=${baseInputFileSingular:-"$baseInputFile"}
	baseInputFilePlural=${baseInputFilePlural:-"EntidadesGenericas"}
	baseJavaFilesFormat=${baseJavaFilesFormat:-".java"}
	baseDomainDir=${baseDomainDir:-"domain"}
	baseDtoDir=${baseDtoDir:-"dto"}
	baseJavaFilesDir=${baseJavaFilesDir:-"javaFiles"}
	basePostmanFilesDir=${basePostmanFilesDir:-"postman"}
	baseProjectFilesDir=${baseProjectFilesDir:-"project"}

	domainImports=${domainImports:-"DomainImports"}

	#Almacena información singular y plural del archivo base.
	baseInputFileSingularUp=${baseInputFileSingular^}
	baseInputFileSingularLow=${baseInputFileSingular,}
	baseInputFilePluralUp=${baseInputFilePlural^}
	baseInputFilePluralLow=${baseInputFilePlural,}

	#Define ruta de dominios por defecto y ruta de proyecto.
	domainFilesDir=${domainFilesDir:-"domain"}
	domainFilesFormat=${domainFilesFormat:-".java"}
	defaultOutputRootDir=${defaultOutputRootDir:-"output/back"}
	defaultProjectOutputName=${defaultProjectOutputName:-"default"}

	#Almacena información de los paquetes de los archivos a crear.
	inputBasePackage=${inputBasePackage:-"com.rtc.project.definicion"}
	inputBaseDir=$(echo "$inputBasePackage" | sed -E 's/\./\//g')
	outputBasePackage=${outputBasePackage:-"com.rtc.default.definicion"}
	outputBaseDir=$(echo "$outputBasePackage" | sed -E 's/\./\//g')
	outputRootDir=$(echo "$outputBaseDir" | sed -E 's/\/.*?//g')

	baseProjectFolder=${baseProjectFolder:-"project"}
	baseProjectRootDir=${baseProjectRootDir:-"src/main/java"}
	baseProjectSettingsGradle=${baseProjectSettingsGradle:-"settings.gradle"}

	basePostmanStart=${basePostmanStart:-"Project"}
	basePostmanEnd=${basePostmanEnd:-".postman"}
	basePostmanFilesFormat=${basePostmanFilesFormat:-".json"}
	basePostmanCollectionName=${basePostmanCollectionName:-"collection"}
	basePostmanCollectionStart=${basePostmanCollectionStart:-".start"}
	basePostmanCollectionEnd=${basePostmanCollectionEnd:-".end"}

	baseDtoStart=""
	baseDtoEnd=""
}

get_primary_key_info() {
	#echo "Path:   '$1'"
	#echo "Value:  '$2'"
	#echo "Format: '$3'"
	#echo

	#Almacena el contenido del archivo indicado.
	file=$(cat "$1")
	#echo "$file"
	eval $2=$(echo "$file" | egrep -o  -m 1 'private(.*?);' | perl -0pe 's/private\s+(.*?)\s+(.*?)\s*;/$2/smg')
	eval $3=$(echo "$file" | egrep -o  -m 1 'private(.*?);' | perl -0pe 's/private\s+(.*?)\s+(.*?)\s*;/$1/smg')
	#echo "PK Value:' '$1'"
	#echo "PK Form:   '$2'"
	#echo
}

set_primary_key_base_default() {
	#Define clave primaria y su formato por defecto.
	primaryKeyBase=${primaryKeyBase:-"intId"}
	primaryKeyBaseLow=${primaryKeyBase,}
	primaryKeyBaseUp=${primaryKeyBase^}
	primaryKeyBaseFormat=${primaryKeyBaseFormat:-"null"}
}

find_base_files_info() {
	#echo "Path: '$1'"
	#echo "Base: '$2'"
	filePaths=()
	fileStarts=()
	fileNames=()
	fileEnds=()
	fileFormats=()
	index=0
	foundFiles=$(find "$1" -name "*$2*" -exec ls {} +)

	#echo "$foundFiles"
	while read line; do
		#echo $line
		get_base_file_info "$1" "$2" "$index" "filePaths" "fileStarts" "fileNames" "fileEnds" "fileFormats"
		#fileStarts[$index]="Namess"
		#echo "filePaths[$index]:   '${filePaths[index]}'"
		#echo "fileStarts[$index]:  '${fileStarts[index]}'"
		#echo "fileNames[$index]:   '${fileNames[index]}'"
		#echo "fileEnds[$index]:    '${fileEnds[index]}'"
		#echo "fileFormats[$index]: '${fileFormats[index]}'"
		index=$((index+1))
	done <<< $foundFiles
}

get_base_file_info() {
	#echo "Path:    '$1'"
	#echo "Base:    '$2'"
	#echo "Index:   '$3'"
	#echo "Paths:   '$4'"
	#echo "starts:  '$5'"
	#echo "Names:   '$6'"
	#echo "Ends:    '$7'"
	#echo "Formats: '$8'"

	fileName=
	fileStart=
	fileEnd=
	fileFormat=
	fileName="${line/"$1/"/}"
	fileName="$fileName"
	#echo "fileName: '$fileName'"

	fileStart=$(echo "$fileName" | perl -pe "s/$2.*//g")
	#echo "fileStart: '$fileStart'"

	fileEnd=$(echo "$fileName" | perl -pe "s/.*?$2//g")
	fileEnd=$(echo "$fileEnd" | perl -pe "s/\..*//g")
	#echo "fileEnd: '$fileEnd'"

	fileFormat=$(echo "$fileName" | perl -pe "s/.*?$2//g")
	fileFormat=$(echo "$fileFormat" | perl -pe "s/.*?\././g")
	#echo "fileFormat: '$fileFormat'"

	#echo

	eval "$4[$index]='$line'"
	eval "$5[$index]='$fileStart'"
	eval "$6[$index]='$fileName'"
	eval "$7[$index]='$fileEnd'"
	eval "$8[$index]='$fileFormat'"
}

get_and_assign_flags() {

	add_editable_param "-glosaryFile" "glosaryFile"
	add_editable_param "-glosaryFormat" "glosaryFormat"

	add_editable_param "-baseInputDir" "baseInputDir"
	add_editable_param "-baseInputFile" "baseInputFile"
	add_editable_param "-baseInputFileSingular" "baseInputFileSingular"
	add_editable_param "-baseInputFilePlural" "baseInputFilePlural"
	add_editable_param "-baseJavaFilesFormat" "baseJavaFilesFormat"
	add_editable_param "-baseDomainDir" "baseDomainDir"
	add_editable_param "-baseDtoDir" "baseDtoDir"
	add_editable_param "-baseJavaFilesDir" "baseJavaFilesDir"
	add_editable_param "-basePostmanFilesDir" "basePostmanFilesDir"
	add_editable_param "-baseProjectFilesDir" "baseProjectFilesDir"

	add_editable_param "-domainFilesDir" "domainFilesDir"
	add_editable_param "-domainFilesFormat" "domainFilesFormat"
	add_editable_param "-defaultOutputRootDir" "defaultOutputRootDir"
	add_editable_param "-defaultProjectOutputName" "defaultProjectOutputName"

	add_editable_param "-inputBasePackage" "inputBasePackage"
	add_editable_param "-inputBaseDir" "inputBaseDir"
	add_editable_param "-outputBasePackage" "outputBasePackage"
	add_editable_param "-outputBaseDir" "outputBaseDir"
	add_editable_param "-outputRootDir" "outputRootDir"

	add_editable_param "-baseProjectFolder" "baseProjectFolder"
	add_editable_param "-baseProjectRootDir" "baseProjectRootDir"
	add_editable_param "-baseProjectSettingsGradle" "baseProjectSettingsGradle"

	validate_and_assign_params "$@"

	#Configura los archivos base
	set_base_files_config

	#Obtiene el nombre del archivo dto base
	find_base_files_info "$baseInputDir/$baseDtoDir" "$baseInputFile"
	baseDtoStart=${fileStarts[0]}
	baseDtoEnd=${fileEnds[0]}

	#Obtiene inforación de la clave primaria del archivo base.
	get_primary_key_info ${filePaths[0]} "primaryKeyBase" "primaryKeyBaseFormat"
	set_primary_key_base_default

	#Obtiene información del glosario.
	get_glosary_info
}

get_domain_file_info() {

	domainFilePath=$1
	domainFileNameUp=
	domainFileNameLow=

	#Obtiene ruta y nombre de cada archivo.
	domainFilePath="${1//'./'/}"
	domainFileName="${domainFilePath//$domainFilesFormat/}"
	domainFileName="${domainFileName//$domainFilesDir\//}"
	domainFileName="${domainFileName/"$2/"/}"
	domainFileNameUp="${domainFileName^}"
	domainFileNameLow="${domainFileName,}"

	# Imprime ruta y nombre del dominio.
	#echo "File:     '$domainFilePath'"
	#echo "Name Up:  '$domainFileNameUp'"
	#echo "Name Low: '$domainFileNameLow'"
	#echo
}

auxPackage=
auxDir=
get_package () {
	#echo "File: $1"
	#echo "Folder: $2"
  	file=$(cat "$1")
	#echo "$file"
	pack=$(echo "$file" | egrep -o 'package(.*?);' | perl -0pe 's/package\s*(.*?)\s*;/$1/smg')
	#echo "Package: '$pack'"
	#Remplaza la base del paquete.
	replacePack="s/$inputBasePackage/$outputBasePackage/g"
	pack=$(echo "$pack" | perl -pe $replacePack)
	pack=$(echo "$pack" | perl -pe "s/default/$2/g")
	#echo "Package: '$pack'"
	auxPackage=$pack
}

outputDomain=
replaceDomain() {

	echo "Replacing Domain"
	#echo "$fileOpen"

	# Borra comentarios del dominio.
	fileOpen=$(echo "$fileOpen" | perl -pe 's/.*?(\/)+((?!(.*?)(GeneratedValue|Table)).*?)\n//g')
	fileOpen=$(echo "$fileOpen" | perl -pe 's/.*?\*.*?\n//g')

	# Borra métodos del dominio.
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/.*?(if|else)\s+([^}]|\n)+\}.*?\n//g')
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/.*?public\s+(?!(class))([^}]|\n)+\}.*?\n//g')

	# Borra decoradores del dominio.
	fileOpen=$(echo "$fileOpen" | perl -pe 's/.*?((\/\/)*@(?!(Entity|Table|Id|Genera|Basic|Column|Temp|Join)).*?)\n//g')

	# Borra colecciones del dominio.
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/.*?private\s+(Collection).*\n//g')

	# Reemplaza el decorador table
	repTable="s/.*?((\/\/)*(@(Table))).*?(catalog\s+)(.*?(\".*?\")).*?\n/\$3(name = \"$domainFileNameUp\", schema = \$7, catalog = \$7)\n/g"
	fileOpen=$(echo "$fileOpen" | perl -pe "$repTable")

	#Añade decoradores.
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/.*?public\s+(class)/\@Getter\n\@Setter\n\@NoArgsConstructor\npublic class/g')

	# Comenta generatedValue y Table.
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/(.*?)(\@|\/\/\@)(GeneratedValue|Table)/$1\/\/\@$3/g')

	# Cambia tipo de dato a las claves foraneas.
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/((.*?\@JoinColumn.*\n)(.*?private\s+)(?!(.*?)\s+(str)).*?\s)/$2$3Long /g')
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/((.*?\@JoinColumn.*\n)(.*?private\s+)((.*?)\s+(str)))/$2$3String $6/g')

	# Borra imports del dominio.
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/.*?import\s+.*\n//g')

	#Almacena el contenido del archivo de imports de dominio.
	imports=$(cat "$baseInputDir/$baseDomainDir/$domainImports$baseJavaFilesFormat")
	#echo "$imports"

	# Añade imports al dominio.
	repImpots="s/(.*?package\s+.*?\n)/\$1$imports/g"
	fileOpen=$(echo "$fileOpen" | perl -pe "$repImpots")

	#Borra lineas vacias
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/\s+\n\s+\n\s+\n/\n\n/smg')

	#Remplaza BigInteger por Long.
	fileOpen=$(echo "$fileOpen" | perl -pe 's/BigInteger/Long/smg')

	#Obtiene clave primaria.
	pkAux=$(echo "$fileOpen" | perl -0ne 'print $1 if /(\s+\@Id.*?;)/s')
	pkAux=$(echo "$pkAux" | perl -0pe 's/@/\\@/smg')
	pkAux=$(echo "$pkAux" | perl -0pe 's/\//\\\//smg')
	#echo "pkAux: $pkAux"

	#Borra clave primaria.
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/\s+\@Id.*?;//smg')

	#Pone clave primaria como primer campo.
	fileOpen=$(echo "$fileOpen" | perl -0pe "s/(private.*?;)/\$1$pkAux/sm")
	outputDomain="$createdFile"

}

replaceDTO() {

	echo "Replacing DTO"
	#echo "$fileOpen"

	# Remplaza implements serializable por DTO
	fileOpen=$(echo "$fileOpen" | perl -pe 's/(\s)*implements\sSerializable/DTO/g')

	# Borra variables estaticas
	fileOpen=$(echo "$fileOpen" | perl -pe 's/.*?static\s.*?\n//g')

	# Borra decoradores del dominio.
	fileOpen=$(echo "$fileOpen" | perl -pe 's/.*?((\/\/)*@(?!(Getter|Setter|NoArg)).*?)\n//g')

	# Borra importes del dominio.
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/import\s+(?!(((lombok\.(Get|Set|NoArg))|(java\.(math|util))))).*?\n//g')
	fileOpen=$(echo "$fileOpen" | perl -0pe 's/import\s+(?!(((lombok\.(Get|Set|NoArg))|(java\.(math|util))))).*?\n//g')

	# Borra comentarios del dominio.
	fileOpen=$(echo "$fileOpen" | perl -pe 's/.*?(\/)+(.*?)\n//g')

	#Borra lineas vacias
	#fileOpen=$(echo "$fileOpen" | perl -0pe 's/\s+\n|\n+/\n/smg')

	#Si el archivo base está en singular.
	if [ "$baseInputFile" == "$baseInputFileSingular" ]; then
		#Remplaza el nombre de la clase en plural por el nombre en singular.
		replaceClassName="s/$baseDtoStar$pluralNameUp$baseDtoEnd/$baseDtoStar$singularNameUp$baseDtoEnd/smg"
		#echo "$replaceClassName"
		fileOpen=$(echo "$fileOpen" | perl -0pe "$replaceClassName")
	fi

}

replaceGeneric() {

	echo "Replacing Generic"

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

	#Remplaza el nombre del archivo base y su clave primaria por los del modelo.

	fileOpen=$(echo "$fileOpen" | perl -pe "$replacePkUp")
	fileOpen=$(echo "$fileOpen" | perl -pe "$replacePkLow")

	fileOpen=$(echo "$fileOpen" | perl -pe "$replaceUpPlur")
	fileOpen=$(echo "$fileOpen" | perl -pe "$replaceLowPlur")
	fileOpen=$(echo "$fileOpen" | perl -pe "$replaceUpSing")
	fileOpen=$(echo "$fileOpen" | perl -pe "$replaceLowSing")

	echo "Replacing Parse"
	parseFunct=valueOf
	if [ "Integer" == "$primaryKeyFormat" ]; then
		parseFunct=parseInt
	elif [ "Long" == "$primaryKeyFormat" ]; then
		parseFunct=parseLong
	fi
	# Remplaza el parse de la clave primaria.
	replaceParse="s/%parseId%/$primaryKeyFormat.$parseFunct/g"
	#echo $replaceParse
	fileOpen=$(echo "$fileOpen" | perl -pe "$replaceParse")

	echo "Replacing PK Format"

	# Remplaza el formato de la clave primaria.
	replacePkFormat="s/%PkFormat%/$primaryKeyFormat/g"
	#echo $replacePkFormat
	fileOpen=$(echo "$fileOpen" | perl -pe "$replacePkFormat")
}

replacePostmanItem() {

	echo "Replacing Postman Item"
	echo "Domain: '$outputDomain'"

	#Almacena el contenido del archivo de dominio.
	entityOpen=$(cat "$outputDomain")
	#echo "$entityOpen"

	#Borra el nombre de la clase del contenido del archivo de dominio abierto.
	entityOpen=$(echo "$entityOpen" | perl -pe 's/.*?\{.*?\n/{\n/g')

	#Borra el nombre de la clase del contenido del archivo de dominio abierto.
	entityOpen=$(echo "$entityOpen" | perl -pe 's/.*?\{.*?\n/{\n/g')

	#Borra variables estaticas
	entityOpen=$(echo "$entityOpen" | perl -pe 's/.*?static.*?\n//g')

	#Borra paquetes e importes del contenido del archivo de dominio abierto.
	entityOpen=$(echo "$entityOpen" | perl -pe 's/.*?(import|package).*?\n//g')

	#Borra decoradores del contenido del archivo de dominio abierto.
	entityOpen=$(echo "$entityOpen" | perl -pe 's/.*?@(?!(JoinColumn)).*?\n//g')
	entityOpen=$(echo "$entityOpen" | perl -pe 's/(.*?\@JoinColumn).*?\n/$1\n/smg')

	#Borra lineas vacias
	entityOpen=$(echo "$entityOpen" | perl -0pe 's/(\s+\n)+/\n/smg')

	#Borra private y reordena las variables.
	entityOpen=$(echo "$entityOpen" | perl -0pe 's/private\s+(.*?)\s+(.*?)\s*;/\\\\\"$2\\\\\" : $1;/smg;')

	#Remplaza los tipos de datos de las variables.
	entityOpen=$(echo "$entityOpen" | perl -0pe 's/Long|long|Integer|BigDecimal|Float|float|Double|double/number/smg')
	entityOpen=$(echo "$entityOpen" | perl -0pe 's/int\s*;/number;/smg')
	entityOpen=$(echo "$entityOpen" | perl -0pe 's/Boolean/boolean/smg')
	entityOpen=$(echo "$entityOpen" | perl -0pe 's/String|string|Character|character/string/smg')
	entityOpen=$(echo "$entityOpen" | perl -0pe 's/Date|date/date/smg')

	#Borra punto y comas.
	entityOpen=$(echo "$entityOpen" | perl -0pe 's/;//smg')

	#echo "'$entityOpen'"

	c=0
	jc=0
	columns=()
	joinColumns=()
	columns[0]=""
	joinColumns[0]=""
	isJoinColum=0
	while read entityLine || [ -n "$entityLine" ]; do
		#echo $entityLine
		if [[ "$entityLine" =~ \".* ]]; then
			if [ "0" == "$isJoinColum" ]; then
				columns[$c]=$entityLine
				c=$((c+1))
			else
				joinColumns[$jc]="$entityLine"
				jc=$((jc+1))
				isJoinColum=0
			fi
		elif [[ "$entityLine" =~ @Join.* ]]; then
			isJoinColum=1
		fi
	done <<< "$entityOpen"

	entityOpen=$(echo -e "\"{\",")

	spaces="                                          "
	value=
	for m in "${!columns[@]}"; do
		if [ "" != "${columns[m+1]}" ]; then
			value=$(echo "${columns[m]},")
		else
			value=$(echo "${columns[m]}")
		fi
		#echo "$value"
		entityOpen=$(echo -e "$entityOpen"; echo -e "  $spaces\"  $value\",";)
	done

	entityOpen=$(echo -e "$entityOpen"; echo -e "  $spaces\"  \/*\"",;)
	for m in "${!joinColumns[@]}"; do
		if [ "" != "${joinColumns[m+1]}" ]; then
			value=$(echo "${joinColumns[m]},")
		else
			value=$(echo "${joinColumns[m]}")
		fi
		#echo "$value"
		entityOpen=$(echo -e "$entityOpen"; echo -e "  $spaces\"  $value\",";)
	done
	entityOpen=$(echo -e "$entityOpen"; echo -e "  $spaces\"  *\/\"",;)
	entityOpen=$(echo -e "$entityOpen"; echo -e "  $spaces\"}\"";)

	#Reemplaza la clave primaria por un id.
	replacePkId="s/($primaryKeyLow.*?)(number|string)/\$1\\\\\"\\{\{id\}\}\\\\\"/smg"
	#echo  "$replacePkId"
	entityOpen=$(echo "$entityOpen" | perl -0pe "$replacePkId")

	#Añade caracteres de escape a las comillas.
	entityOpen=$(echo "$entityOpen" | perl -0pe 's/\"/\\\"/smg')

	#echo "'$entityOpen'"

	insertRequestBody=$(echo "$entityOpen" | perl -0pe "s/:\s*number/: -1/smg")
	#insertRequestBody=$(echo "$insertRequestBody" | perl -0pe "s/:\s*string/: null/smg")
	insertRequestBody=$(echo "$insertRequestBody" | perl -0pe "s/:\s*string/: \\\\\\\\\"\\\\\\\\\"/smg")
	insertRequestBody=$(echo "$insertRequestBody" | perl -0pe "s/:\s*date/: \\\\\\\\\"2020-03-07 05:23:10\\\\\\\\\"/smg")
	insertRequestBody=$(echo "$insertRequestBody" | perl -0pe "s/:\s*boolean/: false/smg")
	#echo "'$insertRequestBody'"

	updateRequestBody=$(echo "$entityOpen" | perl -0pe "s/:\s*number/: 102/smg")
	updateRequestBody=$(echo "$updateRequestBody" | perl -0pe "s/:\s*string/: \\\\\\\\\"S12\\\\\\\\\"/smg")
	updateRequestBody=$(echo "$updateRequestBody" | perl -0pe "s/:\s*date/: \\\\\\\\\"2021-01-02 01:24:45\\\\\\\\\"/smg")
	updateRequestBody=$(echo "$updateRequestBody" | perl -0pe "s/:\s*boolean/: true/smg")
	#echo "'$updateRequestBody'"

	#Reemplaza el body para inseción en el archivo postman.
	replaceBody="s/\[\"\\\$insertRequestBody\"\]/$insertRequestBody/smg"
	fileOpen=$(echo "$fileOpen" | perl -pe "$replaceBody")

	#Reemplaza el body para modificar en el archivo postman.
	replaceBody="s/\[\"\\\$updateRequestBody\"\]/$updateRequestBody/smg"
	fileOpen=$(echo "$fileOpen" | perl -pe "$replaceBody")

	#Obtiene y remplaza el id a utilizar en la entidad.
	pkPostmanFormat=$(echo "${columns[0]}" | perl -0pe "s/.*?:\s*//smg")
	#echo "'$pkPostmanFormat'"
	if [ "string" == "$pkPostmanFormat" ]; then
		id="10L"
	else
		id="101"
	fi
	fileOpen=$(echo "$fileOpen" | perl -0pe "s/{{primaryKey}}/$id/smg")

	#Hace un remplazo genérico.
	replaceGeneric
}

makeFile() {
	createdFile=
	echo "Input  : '$1'"
	if [ "" != "$3" ]; then
		# Obtiene el paquete y directorio del archivo indicado por $3.
		outputFileAux=${2//"$4/"/}
		get_package "$3" "$4"
		auxDir=""
		auxDir=$defaultOutputRootDir/$(echo "$auxPackage" | sed -E 's/\./\//g')
	else
		outputFileAux=$2
		auxDir=$(echo "$outputFileAux" | perl -0pe 's/\/([A-z]*\.)([A-z]|\.)*//g')
		outputFileAux=${outputFileAux//"$auxDir/"/}
	fi
	echo "Output : '$2'"
	echo "Output : '$outputFileAux'"
	#echo "DirFile: '$3'"
	echo "ApiName: '$4'"
	#echo "Pack Out: '$auxPackage'"
	#echo "Dir Out:  '$auxDir'"
	echo

	if [ "" != "$auxDir" ]; then
		mkdir -p $auxDir
	fi
	createdFile="$auxDir/$outputFileAux"
	#echo "Output : '$createdFile'"

	#Almacena el contenido del archivo de entrada.
	fileOpen=$(cat "$1")
	#echo "$fileOpen"

	outputApiBasePackage="${outputBasePackage/default/$4}"
	#echo $outputApiBasePackage

	#Si se indico un archivo con directorio a obtener.
	if [ "" != "$3" ]; then
		#Remplaza el paquete del archivo por el del archivo indicado por $3.
		replacePkg="s/(package)\s*(.*?)\s*;/\$1 $auxPackage;/smg"
		fileOpen=$(echo "$fileOpen" | perl -0pe "$replacePkg")
		replaceImport="s/(import)\s*(.*?)($inputBasePackage)(.*?)\s*;/\$1 $outputApiBasePackage\$4;/smg"
		fileOpen=$(echo "$fileOpen" | perl -pe "$replaceImport")
	fi

	#Ejecuta el reemplazo indicado.
	$5

	#Crea el archivo de salida.
	#mkdir -p $auxDir
	echo "$fileOpen" > $auxDir/$outputFileAux
	echo
}

replace_api_other_files() {
	#echo "Api: $1"
	#Reemplaza paquetes en archivos del projecto base.
	#echo "Replacing packages"
	find "./$defaultOutputRootDir/$1/$baseProjectRootDir" -name "*$baseJavaFilesFormat" | while read line; do
		filePath="${line//'./'/}"
		#echo "$filePath"

		#Almacena el contenido del archivo de entrada.
		fileOpen=$(cat "$filePath")

		#Remplaza los paquetes del archivo.
		replacePkg="s/$inputBasePackage/$outputApiBasePackage/smg"
		#echo "$replacePkg"
		fileOpen=$(echo "$fileOpen" | perl -0pe "$replacePkg")
		#echo "$fileOpen"

		#Crea el archivo de salida.
		echo "$fileOpen" > $filePath
	done

	#Reemplaza directorios en archivos del projecto base.
	#echo "Moving files"
	outputDir="$defaultOutputRootDir/$1/$baseProjectRootDir"
	#echo $outputDir
	inputArrayDir=(${inputBaseDir//// })
	outputArrayDirAux="${outputBaseDir/default/$1}"
	outputArrayDir=(${outputArrayDirAux//// })
	#echo "in Arr $inputArrayDir"
	#echo "ou Arr $outputBaseDir"
	END="${#inputArrayDir[@]}"
	END=$((END-1))
	for i in $(seq $END -1 0); do
		rename="$outputDir/"
		for j in $(seq 0 $((i-1))); do
			rename="$rename${inputArrayDir[j]}/"
		done
		makeDir="mkdir -p $rename${outputArrayDir[i]}"
		remove="rm -r $rename${inputArrayDir[i]}"
		rename="cp -r $rename${inputArrayDir[i]}/* $rename${outputArrayDir[i]}/"
		#echo "comm: $rename"
		if [ "${inputArrayDir[i]}" != "${outputArrayDir[i]}" ] ; then
			#echo "MK: '$makeDir'"
			eval $makeDir
			#echo "CP: '$rename'"
			eval $rename
			#echo "RM: '$remove'"
			eval $remove
		fi
	done
}

make_api() {

	echo "Api: $1"
	echo "Files:"
	echo "$2"
	echo

	while read line; do
		#echo "$line"
		#Obtiene información del archivo.
		get_domain_file_info $line $1

		#Obtiene información del glosario del archivo de entrada.
		search_in_glosary $domainFileNameUp

		#Crea el dominio.
		inpuFilePath="$domainFilePath"
		outputFilePath="$domainFileName$domainFilesFormat"
		dirFile="$inpuFilePath"
		makeFile "$inpuFilePath" "$outputFilePath" "$dirFile" $1 "replaceDomain"

		#Crea el DTO.
		inpuFilePath="$createdFile"
		outputFilePath="$baseDtoStart$domainFileName$baseDtoEnd$baseJavaFilesFormat"
		dirFile="$baseInputDir/$baseDtoDir/$baseDtoStart$baseInputFile$baseDtoEnd$baseJavaFilesFormat"
		makeFile "$inpuFilePath" "$outputFilePath" "$dirFile" $1 "replaceDTO"

		#Obtiene la clave primaria del archivo actual.
		get_primary_key_info $createdFile "primaryKey" "primaryKeyFormat"
		primaryKeyLow=${primaryKey,}
		primaryKeyUp=${primaryKey^}
		#echo "PK:      '$primaryKey'"
		#echo "PK Low:  '$primaryKeyLow'"
		#echo "PK Up:   '$primaryKeyUp'"
		#echo "PK Form: '$primaryKeyFormat'"

		#Crea el archivo json de postman.
		apiNameUp=${1^}
		inpuFilePath="$baseInputDir/$basePostmanFilesDir/$basePostmanStart.$baseInputFile$basePostmanEnd$basePostmanFilesFormat"
		outputFilePath="$defaultOutputRootDir/$basePostmanFilesDir/$1/$apiNameUp.$domainFileNameUp$basePostmanEnd$basePostmanFilesFormat"
		makeFile "$inpuFilePath" "$outputFilePath" "" "$1" "replacePostmanItem"

		#echo "Path:   '${filePaths[0]}'"
		#echo "Start:  '${fileStarts[0]}'"
		#echo "Name:   '${fileNames[0]}'"
		#echo "End:    '${fileEnds[0]}'"
		#echo "Format: '${fileFormats[0]}'"
		#echo

		#Crea el Servicio Implementacion.
		#pos=4
		#inpuFile="${filePaths[pos]}"
		#outputFilePath="${fileStarts[pos]}$domainFileName${fileEnds[pos]}${fileFormats[pos]}"
		#dirFile="$inpuFile"
		#makeFile "$inpuFile" "$outputFilePath" "$inpuFile" "$1" "replaceGeneric"

		for i in "${!filePaths[@]}"; do
			#echo "Path:   '${filePaths[i]}'"
			#echo "Start:  '${fileStarts[i]}'"
			#echo "Name:   '${fileNames[i]}'"
			#echo "End:    '${fileEnds[i]}'"
			#echo "Format: '${fileFormats[i]}'"
			#echo
			inpuFile="${filePaths[i]}"
			outputFilePath="${fileStarts[i]}$domainFileName${fileEnds[i]}${fileFormats[i]}"
			dirFile="$inpuFile"
			makeFile "$inpuFile" "$outputFilePath" "$inpuFile" "$1" "replaceGeneric"
		done

		#echo

	done <<< $2

	#Borra carpeta de la api a crear si existe.
	#remove="rm -r $defaultOutputRootDir/$1"
	#echo "'$remove'"
	#eval $remove

	#Crea copia de la carpeta de projecto base.
	mkdir -p $defaultOutputRootDir/$1
	copy="cp -r $baseInputDir/$baseProjectFolder/* $defaultOutputRootDir/$1"
	#echo "'$copy'"
	$copy

	replace_api_other_files $1

	#Copia carpeta temporal del proyecto dentro del proyecto base.
	copy="cp -r $defaultOutputRootDir/$outputRootDir $defaultOutputRootDir/$1/$baseProjectRootDir"
	#echo "'$copy'"
	$copy
	#echo

	#Borra carpeta temporal del proyecto.
	remove="rm -r $defaultOutputRootDir/$outputRootDir"
	#echo "'$remove'"
	eval $remove

	#Actualiza nombre del proyecto en setting.gradle.
	repGradleName="sed -i 's/$baseProjectFolder/$1/' $defaultOutputRootDir/$1/$baseProjectSettingsGradle"
	#echo $repGradleName
	eval  $repGradleName

	make_postmanCollection $1
}

make_postmanCollection() {
	echo "Postman collection: '$1'"
	postmanCollection="$defaultOutputRootDir/${1^}.$basePostmanCollectionName$basePostmanEnd$basePostmanFilesFormat"
	echo "Path: '$postmanCollection'"
	firstLine=1
	comm=""
	comm="$comm ( cat $baseInputDir/$basePostmanFilesDir/$basePostmanStart.$basePostmanCollectionName$basePostmanCollectionStart$basePostmanEnd$basePostmanFilesFormat ;"
	#echo $comm
	postmanFiles=$(find "$defaultOutputRootDir/$basePostmanFilesDir/$1" -name "*$basePostmanFilesFormat" -exec ls {} +)
	echo "Files:"
	echo "$postmanFiles"
	while read line; do
		# Obtiene información del archivo.
		if [ $firstLine == "1" ]; then
			#echo First
			firstLine=0
			comm="$comm cat $line ;"
		else
			comm="$comm echo ',' ; cat $line ;"
		fi
	done <<< $postmanFiles
	comm="$comm cat $baseInputDir/$basePostmanFilesDir/$basePostmanStart.$basePostmanCollectionName$basePostmanCollectionEnd$basePostmanEnd$basePostmanFilesFormat )"
	comm="$comm > $postmanCollection"
	#echo "comm: '$comm'"
	eval $comm

	#Remplaza el nombre del archivo postman.
	collectionInName=$basePostmanStart
	collectionOutName=${1^}
	#echo "sed -i 's/$collectionInName/$collectionOutName/' $postmanCollection"
	eval "sed -i 's/$collectionInName/$collectionOutName/' $postmanCollection"
	echo
}

start_process() {
	#Obtiene información de los archivos java base.
	find_base_files_info "$baseInputDir/$baseJavaFilesDir" "$baseInputFile"

	projectName="project"
	domainFiles=$(find "$domainFilesDir" -maxdepth 1 -name "*$domainFilesFormat*" -exec ls {} +)
	#echo "$projectName:"
	#echo "domainFiles:"
	#echo "'$domainFiles'"
	#echo
	if  [[ ! -z "$domainFiles" ]] && [ "" != "domainFiles" ]; then
		make_api "$projectName" "$domainFiles";
	fi

	domainDirs=$(find "$domainFilesDir" -mindepth 1 -maxdepth 1 -type d -print | sort -z | xargs -r0)
	#echo "domainDirs:"
	#echo "$domainDirs"
	#echo
	if  [[ ! -z "$domainDirs" ]] && [ "" != "$domainDirs" ]; then
		while read lineAux; do
			#echo "$lineAux"
			projectName="${lineAux/"$domainFilesDir/"/}"
			domainFiles=$(find "$lineAux" -maxdepth 1 -name "*$domainFilesFormat*" -exec ls {} +)
			#echo "$projectName:"
			#echo "domainFiles:"
			#echo "$domainFiles"
			#echo
			if  [[ ! -z "$domainFiles" ]] && [ "" != "domainFiles" ]; then
				make_api "$projectName" "$domainFiles";
			fi
		done <<< $domainDirs
	fi

	#Borra carpeta temporal de archivos postman.
	remove="rm -r $defaultOutputRootDir/$basePostmanFilesDir"
	#echo "'$remove'"
	$remove
}

printf -v startDate '%(%Y-%m-%d %H:%M:%S)T' -1

baseInputRootDir=${baseInputRootDir:-"base"}
source $baseInputRootDir/lib/flags.sh
source $baseInputRootDir/lib/glosary.sh

get_and_assign_flags

echo "baseInputDir:        '$baseInputDir'"
echo "baseInputFile:       '$baseInputFile'"
#echo "baseFileSingularLow: '$baseInputFileSingularLow'"
#echo "baseFileSingularUp:  '$baseInputFileSingularUp'"
#echo "baseFilePluralLow:   '$baseInputFilePluralLow'"
#echo "baseFilePluralUp:    '$baseInputFilePluralUp'"
echo "baseJavaFilesFormat: '$baseJavaFilesFormat'"
echo "baseDtoDir:          '$baseDtoDir'"
#echo "domainFilesDir:      '$domainFilesDir'"
#echo "inputBasePackage:    '$inputBasePackage'"
#echo "inputBaseDir:        '$inputBaseDir'"
#echo "outputBasePackage:   '$outputBasePackage'"
#echo "outputBaseDir:       '$outputBaseDir'"
#echo "outputRootDir:       '$outputRootDir'"
echo "PK Base Low:         '$primaryKeyBaseLow'"
echo "PK Base Up:          '$primaryKeyBaseUp'"
echo "PK Base Form:        '$primaryKeyBaseFormat'"
echo "Glosary file:        '$glosaryPathFile'"
echo

start_process

printf -v endDate '%(%Y-%m-%d %H:%M:%S)T' -1
echo "Start: $startDate"
echo "End:   $endDate"
