echo off
echo Uploading file........
psftp pi@adamandlindsey.co.uk -P 24 -pw raspberry -batch -b myscript.src
echo ----------------------------------------------
echo Running node script.......
plink -ssh -P 24 pi@adamandlindsey.co.uk -pw raspberry -m commands.txt