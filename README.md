# Property-Management-Site
This is a fully functional property management site with authentication and a dashboard to create new listings

# Documentation
### Installation steps:
1. Clone the project `git clone https://github.com/Developer-Square/Property-Management-Site.git`
2. Open two terminals, in one of them cd into the `client` then do a  `npm install`. Do the same in the other terminal, cd into `server` and do a `npm install`
3. Before running the project, in the server terminal, do a `npm i ts-node`. The backend runs fully on a typescript environment hence you'll have to install `ts-node`.
4. Next head over to [Google Cloud Console](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwibooLC2vP9AhW_VaQEHdSgA4IQFnoECBMQAQ&url=https%3A%2F%2Fconsole.cloud.google.com%2F&usg=AOvVaw1GxwHR1WZnDu0xsR-djCrv) and create a new project. Next in the sidebar click on `Api and services` then `Oauth consent screen`. Fill in all the following details:
  - For `User type` select External
  - Add your `User support email` and `Developer contact`
  - For the Scopes and Test Users section just click `Save and Continue`
5. In the sidebar click on `credentials` then `Create credentials` and follow the following steps:
  - On the dropdown, choose `OAuth Client Id` and for application type select `Web Application`.
  - Under `Authorized Javascript origins` add your localhost port for both the client and server. That is the port you expect to run your client side and server side eg. add       both `http://localhost:3000` and `http://localhost:5000`. The first one is for the client side and the second is for the server side
  - Keep in mind you can always comeback and change these ports whenever you like.
6. When you're done copy over your new client id and place it in the .env file. There's a `.env.example` file to guide you on how your local .env file should look like.
7. Run both the client and server using the command `npm run dev`.
8. Make sure your ports for both the client and server side match the ones you added in your Goolge Cloud Console. Also add your backend port(http://localhost:5000) to the .env file in the client side.
9. We are done with everything that needs to be setup for the client side. Let's move on to the server side. The server also has a `.env.example` file to guide you on which variable to add to your local .env file. Follow the following steps:
  - Head over to [Cloudinary](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwir9dGa4fP9AhXPRMAKHeT8DJIQFnoECBAQAQ&url=https%3A%2F%2Fcloudinary.com%2F&usg=AOvVaw21MpFQypQosqq7PGr-xbWs), create an account then copy over the CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET and add them
  to your .env file
  - Next proceed to [Mongodb Cloud](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwij8dvJ4fP9AhW3RUEAHT4zCvYQFnoECBIQAQ&url=https%3A%2F%2Fwww.mongodb.com%2F&usg=AOvVaw2ODprZpw7B6asXJGVwvA-G), create an account then create a cluster. Copy over the mongodb connection url and add it to the .env file. Don't     forget to add your password to the mongodb connection url.
    - If you want to take it a step further and want to run mongodb locally then you can download Mongodb Compass and run it locally. Otherwise, if you're lazy😂, just copy         the same mongodb connection url and paste it into the `LOCAL_MONGODB_URI`
10. For the `SMTP_HOST` in your .env file you can use smtp.gmail.com, for the `SMTP_USERNAME` and `EMAIL_FROM` you can use your own email or the company email. Lastly, don't       forget to include the client side port in the `CLIENT_URL` variable.
