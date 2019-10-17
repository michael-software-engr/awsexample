#!/usr/bin/env bash

deploy() {
  local app_root='../../..'

  local target_build_dir="$app_root/public/assets/"
  local templates_dir="$app_root/templates"

  if ! [ -d "$target_build_dir" ]; then
    echo "... target build dir '$target_build_dir' does not exist, creating..."
    mkdir -p "$target_build_dir" || exit 1
  fi
  test -d "$templates_dir" || error "templates dir '$templates_dir' does not exist."

  yarn build || exit

  local build_dir_bname='build'
  local target_build="$target_build_dir/$build_dir_bname"
  rm -rfv "$target_build" || exit
  /bin/cp -rv "$build_dir_bname" "$target_build" || exit

  /bin/cp -v "$build_dir_bname/index.html" "$templates_dir" || exit
}

error() {
  local msg="${1:?ERROR, must pass error message.}"

  echo "ERROR: $msg" >&2
  exit 1
}

set -o errexit
set -o pipefail
set -o nounset
deploy "$@"
