singulars[0]=""
plurals[0]=""
get_glosary_info() {
	glosaryFile=${glosaryFile:-"glosary"}
	glosaryFormat=${glosaryFormat:-".info"}
	glosaryPathFile="$baseInputRootDir/$glosaryFile$glosaryFormat"
	#echo "Glosary file:        '$glosaryPathFile'"
	singular=""
	plural=""
	j=0
	while read line || [ -n "$line" ]; do
		#echo "$line"
		singular=$(echo "$line" | egrep -o  -m 1 "'.*?'" | perl -pe "s/\'(.*?)\'/\$1/smg")
		plural=$(echo "$line" | egrep -o  -m 1 "\".*?\"" | perl -pe "s/\"(.*?)\"/\$1/smg")
		#echo "$j Sing: ¡$singular!  Plur: ¡$plural!"
		singulars[$j]="${singular^}"
		plurals[$j]="${plural^}"
		j=$((j+1))
	done < $glosaryPathFile

	#echo
	#for i in "${!singulars[@]}"; do
	#	#echo "$i ${singulars[i]}"
	#	echo "Sing: '${singulars[i]}'"
	#done

	#echo
	#for i in "${!plurals[@]}"; do
	#	#echo "$i ${plurals[i]}"
	#	echo "Plur: '${plurals[i]}'"
	#done
	#echo
}

isSingular=
singularNameUp=
singularNameLow=
pluralNameUp=
pluralNameLow=
type=
search_in_glosary() {

	type="Not Found"
	isSingular=
	singularNameUp="${1^}"
	singularNameLow="${1,}"
	pluralNameUp="${1^}"
	pluralNameLow="${1,}"

	#echo "Name:     '$1'"
	for i in "${!singulars[@]}"; do
		if [ "$1" == "${singulars[i]}" ]; then
			type="Singular"
			isSingular=true
			pluralNameUp="${plurals[$i]}"
			pluralNameUp="${pluralNameUp^}"
			pluralNameLow="${pluralNameUp,}"
			break;
		fi
	done

	if [ "$isSingular" != "true" ]; then
		for i in "${!plurals[@]}"; do
			if [ "$1" == "${plurals[i]}" ]; then
				type="Plural"
				isSingular=false
				singularNameUp="${singulars[$i]}"
				singularNameUp="${singularNameUp^}"
				singularNameLow="${singularNameUp,}"
				break;
			fi
		done
	fi

	#echo "Type:        '$type'"
	#echo "SingularUp:  '$singularNameUp'"
	#echo "SingularLow: '$singularNameLow'"
	#echo "PluralUp:    '$pluralNameUp'"
	#echo "PluralLow:   '$pluralNameLow'"
}

