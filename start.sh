if [ -e .env ]
then
    IFS='
'
    export $(cat .env | grep -v "#" | grep -v '^$' | xargs -0)
    IFS=
    php -S localhost:3000 index.php
else
    echo ".env File was not found. Create a .env file in the root folder of the project following the example in .env.default"
fi
