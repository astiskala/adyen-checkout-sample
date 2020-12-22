if [ -e .env ]
then
    IFS='
'
    export $(cat .env | grep -v "#" | grep -v '^$' | xargs -0)
    IFS=
    php -S 127.0.0.1:3000 -t .
else
    echo ".env File was not found. Create a .env file in the root folder of the project following the example in .env.default"
fi
