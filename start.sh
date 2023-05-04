if [ -e .env ]
then
    IFS='
'
    export $(cat .env | grep -v "^#" | grep -v '^$' | xargs -0)
    IFS=

    until php -S 127.0.0.1:3000 -t .; do
        echo "PHP crashed with exit code $?. Respawning.." >&2
        sleep 1
    done
else
    echo ".env File was not found. Create a .env file in the root folder of the project following the example in .env.default"
fi
