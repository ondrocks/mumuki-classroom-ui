#/bin/bash
REV=$1

echo $REV > version

. /root/.nvm/nvm.sh && npm install --unsafe-perm
npm run-script build

find -maxdepth 1 | grep -vE 'build$' | grep './' | xargs rm -rf
mv build/* .
rm -rf build
