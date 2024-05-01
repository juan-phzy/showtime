# Welcome to Showtime !
### An academic project for Intro to Software Engineering at NYIT Spring '24

## Description:
This web application recommends movie showtimes to users depending on their favorite tastes.
Users are shown actors, directors, and companies who have movies now playing in theaters. They
are then able to choose their favorites as well as their preferred cinema and time of day to
go to theaters. Additionally, users are given access to browse all movies now showing and coming
up at their favorite cinema.

## Team Members:
* Juan Hernandez - Team Leader & Lead Developer, Front & Back End
* Tanat Sahta - Team Leader & Project Manager
* Emri Nesimi - Web Design Specialist, Front End Developer
* Elijah Ewers - Front End Developer, Project Analyst
* Cheuk Tung Ho - Front End Developer, Project Tester

## Check out our live deployment:
[Click here to view our application.](https://showtime-eight.vercel.app/)

## Technologies Used
* Web Development-------- Next.JS / React / Node
* Web Styling--------------- Tailwind CSS
* Programming & Logic---- Typescript / JavaScript
* Database------------------ Supabase
* Showtime API------------- MovieGlu
* Movie Data API----------- TMDB

## Try our project for yourself! Instructions provided by our lead developer:

To develop this project on your own you will need the following resources:
1. NVM -> Node & NPM, Git & VS Code
    1. Whether you're on mac or windows, install NVM (Node Version Manager). NVM for Apple and Windows are 2 completely different things. Make sure you installed the correct one. Then use NVM to install Node JS which should come with NPM (Node Package Manager).
    2. Install Git on your device for local version management.
    3. You can use any text editor of your choice but our preference is VS Code.
2. A SupaBase Account
    1. Go to [the Supabase Website](https://supabase.com/) and make a free account
    2. Follow their instructions to start a new project.
    3. You will need only two tables: A "generalUsers" table and a "preferences" table
    4. Follow the structure of the images below:
        1. ![This is an alt text.](/public/images/supa1.png "Table 1")
        2. ![This is an alt text.](/public/images/supa2.png "Table 2")
    5. Don't forget to add Row Level Security Policies on both tables. We used the following for both tables
        1. ![This is an alt text.](/public/images/rls.png "Row Level Security")
    6. Save Your SupaBase API Key and URL somewhere safe.
3. A TMDB API Key
    1. Go to [the TMDB Site](https://developer.themoviedb.org/reference/intro/authentication#api-key-quick-start) and make a free account
    2. Register for an API Key and Auth Token
4. A MovieGlu API Key
    1. Go to [the MovieGlu Site](https://api-registration.movieglu.com/) and make a free account
    2. Register for an API Key and Auth Token
5. Once you have all this set up, clone our project onto your text editor and run the following command:
    1. `npm i`
    2. This will install and update all depencies required to run the project
6. Create your own .local.env file at the root of your project and enter your personal keys with the following variable names:
    1. NEXT_PUBLIC_SUPABASE_URL:"your-url-goes-here"
    2. NEXT_PUBLIC_SUPABASE_ANON_KEY:"your-key-goes-here"
    3. MOVIEGULU_API_ENDPOINT="your-endpoint-goes-here"
    4. MOVIEGULU_CLIENT="your-client-goes-here"
    5. MOVIEGULU_API_KEY="your-key-goes-here"
    6. MOVIEGULU_AUTHORIZATION="your-auth-goes-here"
    7. MOVIEGULU_TERRITORY="xx"
    8. MOVIEGULU_API_VERSION="v200"
    9. MOVIEGULU_GEOLOCATION="-22;14"
    10. TMDB_ACCESS_TOKEN="your-token-here"
    11. TMBD_API_KEY="your-key-here"
    12. TMDB_AUTH="your-bearer-auth-here"
7. Finally run:
    1. `npm run dev` and navigate to your [localhost](localhost:3000) to see the project running