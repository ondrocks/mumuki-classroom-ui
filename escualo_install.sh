#/bin/bash
REV=$1


. /root/.nvm/nvm.sh && npm install --unsafe-perm
npm run-script build

find -maxdepth 1 | grep -vE 'build$' | grep './' | xargs rm -rf
mv build/* .
rm -rf build

echo '[Escualo::Install::Classroom] Publishing version'
echo $REV > version
