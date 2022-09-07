baseInputRootDir=${baseInputRootDir:-"base"}
source $baseInputRootDir/lib/flags.sh
source $baseInputRootDir/lib/glosary.sh

set_base_files_config() {
	#Define el archivo base y su ruta.
	baseInputDir=${baseInputDir:-"$baseInputRootDir/back"}
	baseInputFilesDir=${baseInputFilesDir:-"domain"}
	baseInputFileName=${baseInputFileName:-"EntidadGenerica"}
	baseFileFormat=${baseFileFormat:-".java"}

	sqlFilePath=${sqlFilePath:-"database.sql"}

	outputRootDir=${outputRootDir:-"output/back"}
	outputDir=${outputDir:-"domain"}
	outputFilesFormat=${outputFilesFormat:-".java"}
}

get_and_assign_flags() {
	add_editable_param "-baseInputDir" "baseInputDir"
	add_editable_param "-baseInputFilesDir" "baseInputFilesDir"
	add_editable_param "-baseInputFileName" "baseInputFileName"
	add_editable_param "-baseFileFormat" "baseFileFormat"

	add_editable_param "-sqlFilePath" "sqlFilePath"

	add_editable_param "-outputRootDir" "outputRootDir"
	add_editable_param "-outputDir" "outputDir"
	add_editable_param "-outputFilesFormat" "outputFilesFormat"

	validate_and_assign_params "$@"

	#Configura los archivos base
	set_base_files_config
}

make_domains() {
	fileOpen=$(cat "$sqlFilePath")

	if [ "" != "$fileOpen" ]; then
		eval "rm -r $outputRootDir/$outputDir"
		mkdir -p $outputRootDir/$outputDir

		#Insert tables in an array
		tablesArray=
		for i in $(seq 0 1 500); do
			table=$(echo "$fileOpen" | perl -0ne 'print $1 if /(CREATE TABLE.*?;)/s')
			if [ "$table" != "" ] ; then
				#echo "<$table>"
				tablesArray[i]="$table"
				fileOpen=$(echo "$fileOpen" | perl -0pe 's/(CREATE TABLE(.*?));//sm')
			else
				break;
			fi
		done

		tablesQuantity="${#tablesArray[@]}"
		table=
		tableName=
		tablePk=
		fieldAux=
		formatAux=
		fieldNames=()
		fieldFormats=()
		fieldsQuantity=
		outputFile=
		for j in $(seq 0 $((tablesQuantity-1))); do
			fields=
			fieldNames=()
			fieldFormats=()
			table="${tablesArray[j]}"
			tableName=$(echo "$table" | perl -0ne 'print $1 if /(CREATE TABLE.*?\()/s')
			tableName=$(echo "$tableName" | perl -0pe 's/(CREATE TABLE.*?)//smg')
			tableName=$(echo "$tableName" | perl -0pe 's/(IF|NOT|EXISTS|\(|\s|`)*//smg')
			table=$(echo "$table" | perl -0pe 's/(CREATE TABLE.*?\(|;)//smg')
			echo "Name:   '$tableName'"

			tablePk=$(echo "$table" | perl -0ne 'print $1 if /(PRIMARY KEY.*?\))/s')
			tablePk=$(echo "$tablePk" | perl -0pe 's/(PRIMARY KEY.*?\()//smg')
			tablePk=$(echo "$tablePk" | perl -0pe 's/( ASC|\(|\)|\s|`)*//smg')
			table=$(echo "$table" | perl -0pe 's/(PRIMARY KEY.*?\))//smg')
			table=$(echo "$table" | perl -0pe 's/(PRIMARY KEY.*?\)|\))//smg')
			echo "PK:     '$tablePk'"

			for i in $(seq 0 1 200); do
				fieldAux=$(echo "$table" | perl -0ne 'print $1 if /(`.*?\,)/s')
				if [ "$fieldAux" != "" ] ; then
					fieldAux=$(echo "$fieldAux" | perl -0pe 's/\s\s+/ /smg')
					formatAux=$(echo "$fieldAux" | perl -0ne 'print $1 if /(`.*?`\s[A-z]+)/s')
					fieldAux=$(echo "$formatAux" | perl -0ne 'print $1 if /(`.*?`)/s')
					fieldAux=$(echo "$fieldAux" | perl -0pe 's/(`)*//smg')
					formatAux=$(echo "$formatAux" | perl -0pe 's/(`.*?`\s*)//smg')
					fieldNames[i]="$fieldAux"
					fieldFormats[i]="$formatAux"
					#echo "Field:  '$fieldAux'" "     Format: '$formatAux'"
					table=$(echo "$table" | perl -0pe 's/(`.*?\,)//sm')
				else
					break;
				fi
			done

			fieldsQuantity="${#fieldNames[@]}"
			for k in $(seq 0 $((fieldsQuantity-1))); do
				if [ "${fieldNames[k]}" == "$tablePk" ] ; then
					fields=$(echo "$fields\n    \@Id\n    \@Basic(optional = false)\n    \@Column(nullable = false)")
				fi

				#echo "${formatAux^^}"
				formatAux=${fieldFormats[k]}
				if [ "${formatAux^^}" == "BIGINT" ] ; then
					formatAux="Long"
				elif [ "${formatAux^^}" == "FLOAT" ] ; then
					formatAux="Float"
				elif [ "${formatAux^^}" == "BIT" ] ; then
					formatAux="Boolean"
				elif [ "${formatAux^^}" == "INT" ] ; then
					formatAux="Integer"
				elif [ "${formatAux^^}" == "DATE" ] ; then
					fields=$(echo "$fields\n    \@Temporal(TemporalType.TIMESTAMP)")
					formatAux="Date"
				elif [ "${formatAux^^}" == "VARCHAR" ] ; then
					formatAux="String"
				else
					fields=$(echo "$fields\n    \@Column(columnDefinition = \"${formatAux^^}\")")
					formatAux="String"
				fi

				echo "Field:  '${fieldNames[k]}'" "     Format: '${fieldFormats[k]}'"
				fields=$(echo "$fields\n    private $formatAux ${fieldNames[k]};")
			done

			outputFilePath="$outputRootDir/$outputDir/$tableName$outputFilesFormat"
			outputFile=$(cat "$baseInputDir/$baseInputFilesDir/$baseInputFileName$baseFileFormat")

			outputFile=$(echo "$outputFile" | perl -0pe "s/$baseInputFileName/$tableName/smg")
			outputFile=$(echo "$outputFile" | perl -0pe "s/%fields%/$fields/smg")
			echo "$outputFile" > $outputFilePath
			echo "Created file: '$outputFilePath'"

			echo ""
			#echo "<$table>"
		done
	fi
}

get_and_assign_flags

make_domains
