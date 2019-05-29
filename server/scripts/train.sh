#!/bin/bash

echo $$

cd ~
pwd
echo moro
source .zshrc
conda activate donkeyx
# python3 ~/car-donkeyx/manage.py drive
# ls -la

# exec kills the spawned process, if this script is killed
exec ping google.com
