## Cryptoloka
Cryptoloka is a crypto currency exchange concept for Indonesian market. This repository is set up for maintaining documentation of the application development.

### Published Website
[Cryptoloka.com](https://cryptoloka-app.firebaseapp.com)

### Tech Stack
1. Front-end:
   * Single Page Framework: React JS
   * State Management: Redux
   * UI Framework: Bootstrap
   * Alerts: Sweetalert2
      _Reason: Most popular framework for application development._
2. Back-end:
   * Database: Google Firestore Realtime Database
   * Authentication: Firebase Authentication, React Cookie, Jsonwebtoken
   * Hosting: Firebase Hosting
      _Reason: Realtime database will be usefull when handling incoming changes in the order book for crypto exchange._

### Database Schema
[DB Schema](https://docs.google.com/spreadsheets/d/1yWXr3Q8Teqf5HIpDAjhGQbX5n9MEnj1QNFmJAZdqygY/edit?usp=sharing)

### Prerequisites Instructions
1. Git clone the folder directory to your local computer.
2. Switch to master branch for final reviewed documentation and go inside the 'client' folder.
3. Create a env file on the root of the application (inside the 'client' folder and inline with 'src' folder).
4. On the env file, create a 'REACT_APP_PRIVATEKEY' variable and assigned a value to it.
   You can use our private key value as consideration which is 'Allthatisgolddoesnotglitter,notallthosewhowanderarelost.Theoldthatisstrongdoesnotwither,deeprootsarenotreachedbythefrost.Fromtheashes,afireshallbewoken,alightfromtheshadowsshallspring.Renewedshallbebladethatwasbroken,thecrownlessagainshallbeking.TheRiddleofStrider.JRRTolkien;'.
5. On your terminal, type 'yarn start' and enter to run the application in development mode.
6. To login you can use our saved account with the following detail:
   * Email: marco@ex.com
   * Password: '123123123'

### Remarks
1. Structure of folder 'src':
   * assets: consist of general asset required for the application development including generally used CSS and changes to bootstrap CSS is documented here.
   * components: consist of jsx component that is used to build each page for development.
   * config: consist of required third party configuration to be installed on the application e.g. firebase config.
   * helpers: consist of reusable functions that commonly reused on several components.
   * pages: consist of each dedicated page for front-end development.
   * store: consist of actions and reducers to mutate changes to state management.
2. Color CSS is managed centrally and documented on 'index.css' on the root file.
3. For public images is stored inside the 'public' folder and for path routing is documented on the 'App.js'.
4. For each action and function purpose is documented on each above actions and functions as commentaries.
5. For any questions, you can always contact me at marco.sumali90@gmail.com.
      
