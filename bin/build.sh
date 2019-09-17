#!/bin/bash

cd ../roco_activity_api || exit
git pull

# 清除目标文件
rm -rf ./src/main/resources/static/admin/static
rm -rf ./src/main/resources/templates/page/admin/

cd ../roco_activity_admin || exit
gulp
vue-cli-service build


mkdir -p ../roco_activity_api/src/main/resources/static/admin/static
# 拷贝静态文件
cp -R ./dist/static/ ../roco_activity_api/src/main/resources/static/admin/static/
# 删除静态文件
rm -rf ./dist/static/
mkdir -p ../roco_activity_api/src/main/resources/templates/page/admin/
# 拷贝页面文件
cp -R ./dist/ ../roco_activity_api/src/main/resources/templates/page/admin/
