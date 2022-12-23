# noapp-assignment
no app assignment using workers

## For install packages

  npm i

## Run server

  npm run start

## Packages & requirements

  ### csvtojson - for convert csv file data to json
  ### multer - for file upload
  ### jsonwebtoken - for authentication
  ### mongoose - for connecting mongo database
  ### sample CSV file - uploaded for reference

## API Curl

  ### check application live (token not required)

      curl --location --request GET 'localhost:5000'

  ### generate auth token (token not required)

      curl --location --request POST 'localhost:5000/gen/token'

  ### verify token (token required in headers x-auth-token)

      curl --location --request GET 'localhost:5000/verify/token' \
    --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOiJhc2hpc2giLCJkZXNjcmlwdGlvbiI6Im5vYXBwLWFzc2lnbm1lbnQifSwiaWF0IjoxNjcxNzQ1OTkwLCJleHAiOjE2NzE3NDYwNTB9.TJpkJPrnmJvdlZvoN4kL9Ny5WNPs5pL_Vt-Gc-CN21U'

  ### save csv data into database (token required in headers x-auth-token)

      curl --location --request POST 'localhost:5000/contact' \
    --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOiJhc2hpc2giLCJkZXNjcmlwdGlvbiI6Im5vYXBwLWFzc2lnbm1lbnQifSwiaWF0IjoxNjcxNzU3MTgxLCJleHAiOjE2NzE3NTc3ODF9.9ipD7Br1yQpuGVmG__m4agvDwQq55OtykPNorFTMLqE' \
    --form 'file=@"/Users/ashishgoyal/Downloads/contact-sample - Sheet1.csv"'

  ### get csv data records from db (token required in headers x-auth-token)

      curl --location --request GET 'localhost:5000/get/contact' \
    --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOiJhc2hpc2giLCJkZXNjcmlwdGlvbiI6Im5vYXBwLWFzc2lnbm1lbnQifSwiaWF0IjoxNjcxNzU3MTgxLCJleHAiOjE2NzE3NTc3ODF9.9ipD7Br1yQpuGVmG__m4agvDwQq55OtykPNorFTMLqE'
