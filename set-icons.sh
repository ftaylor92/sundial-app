#to convert images to correct sizes

convert www/img/logo.png -resize 96x96 platforms/android/res/drawable/logo.png

convert www/img/logo.png -resize 72x72 platforms/android/res/drawable-hdpi/logo.png
convert www/img/logo.png -resize 36x36 platforms/android/res/drawable-ldpi/logo.png
convert www/img/logo.png -resize 48x48 platforms/android/res/drawable-mdpi/logo.png
convert www/img/logo.png -resize 96x96 platforms/android/res/drawable-xhdpi/logo.png

convert www/img/Protractor-android.png -resize 800x480 platforms/android/res/drawable-land-hdpi/screen.png
convert www/img/Protractor-android.png -resize 320x200 platforms/android/res/drawable-land-ldpi/screen.png
convert www/img/Protractor-android.png -resize 480x320 platforms/android/res/drawable-land-mdpi/screen.png
convert www/img/Protractor-android.png -resize 1280x720 platforms/android/res/drawable-land-xhdpi/screen.png

convert www/img/sundial.jpg -resize 480x800 platforms/android/res/drawable-port-hdpi/screen.png
convert www/img/sundial.jpg -resize 200x320 platforms/android/res/drawable-port-ldpi/screen.png
convert www/img/sundial.jpg -resize 320x480 platforms/android/res/drawable-port-mdpi/screen.png
convert www/img/sundial.jpg -resize 720x1280 platforms/android/res/drawable-port-xhdpi/screen.png

