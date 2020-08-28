## If you run with docker
- Copy .env.example folder to .env (These folders are in the root)
- Copy application-staging.properties to application.properties 
    (You should do this for event-processor and core)
- Update variables in all files in .env folder with values from "KEYS" trello card
- Run `scripts/dev-infrustructure.sh` from root folder

## If you run without docker
- Copy application-staging.properties file to application properties
- Update variables in braces by appropriate values you can find in files 
    from .env.example folder (some of them could be find in "KEYS" trello card )

- Start core service via `gradle runBoot` or via IDE
