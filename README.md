### Admin api built with Nest Js

# Config setup
- First setup config for environment variables and validating the availabity of the env variables before proceeding with the running of the application. This is to prevent returning of unknown at run time and causing error. Env variables can be accessed by using injected configService - 'configService.get<string>("<IDENTIFIER>")'
- setup a global prefix ("/api/v1") before creating a document for swagger

# Swagger Ui setup
- Required for ease of documentation