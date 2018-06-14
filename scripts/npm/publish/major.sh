#!/usr/bin/env bash

set -e;

my_args=( "$@" );

# load shared bash tools
. "$(dirname "$(realpath "$0")")/.shared_tools.sh"

if ! tsproject_match_arg "--decree" "${my_args[@]}"; then
    echo "You must use the --decree argument to ensure this command is what you really want to do.";
    exit 1;
fi

if ! tsproject_run_checks "${my_args[@]}"; then
   echo "A validation routine failed. Please check your system.";
   exit 1;
fi

# consider running tests before you publish, something like this:
# rm -rf node_modules
# npm install --production --loglevel=warn
# tsc
# npm test

zmx npm version major
zmx git push --follow-tags

if ! tsproject_match_arg "--no-publish" "${my_args[@]}"; then
    zmx npm publish
fi