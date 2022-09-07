__assign_param_to_var() {
    found=no
    for m in "${!accepted_params[@]}"; do
        if [ "${accepted_params[m]}" = "$1" ]; then
            eval "${param_variables[m]}=$2"
            found=yes
        fi
	done
    if [ "$found" = "no" ]; then
        echo "Error: Unrecognized flag \"$1\" value \"$2\" not set."
        echo
    fi
}

accepted_params=()
param_variables=()
add_editable_param() {
    size=${#accepted_params[@]}
    accepted_params[$size]="$1"
    param_variables[$size]="$2"
}

validate_and_assign_params() {
    if [ "0" == $(($# % 2)) ]; then
        flags=()
        values=()
        count=0
        for i in $(seq 1 2 $# ); do
            flags[$count]=${@: $(($i + 0)): 1}
            values[$count]=${@: $(($i + 1)): 1}
            count=$((count+1))
        done

        for m in "${!flags[@]}"; do
            __assign_param_to_var ${flags[m]} ${values[m]}
        done
    else
        echo "Incorrect number of params ($#)"
    fi
}

print_editable_params() {
    echo "Params:"
    for m in "${!param_variables[@]}"; do
        echo "'${param_variables[m]}': '${!param_variables[m]}'"
    done
}

#var1=10
#add_editable_param "-var1" "var1"
#validate_and_assign_params "$@"
#print_editable_params