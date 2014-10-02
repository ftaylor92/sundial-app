git init
git add *
git commit -m "first commit"
git remote add origin https://github.com/ftaylor92/sundial-app.git
git push -u origin master

git clone https://github.com/ftaylor92/sundial-app.git
see .gitignore

#cordova build -d && mv -v ./platforms/android/bin/Sundial-debug.apk ~/Desktop/Dropbox/Public/
cordova build -d && mv -v ./platforms/android/ant-build/Sundial-debug.apk ~/Desktop/Dropbox/Public/
