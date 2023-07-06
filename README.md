<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://zar.networkmanager.pl/static/readme/logo_white.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://zar.networkmanager.pl/static/readme/logo_navy.svg">
  <img alt="EZ Vote logo" src="https://zar.networkmanager.pl/static/readme/logo_navy.svg">
</picture>

# About The Project

<kbd><img alt="" src="https://zar.networkmanager.pl/static/readme/main_screen.png"></kbd>

EZ Vote is a simple app that allows you to make polls and let people vote in them. 🗳️

Check out the live demo at [ezvote.it](https://ezvote.it)

# Features 🔧

### Current
* Multiple questions in a single poll
* Open-ended questions (multiple choice)
* Close-ended questions (single choice)
* Easy access to polls and results via unique links
* Use of cookies to prevent many votes by the same person.
* Vote percentage graph view for the results
* Responsive design implemented
* User registration and login
* _The Dudette_ <br><img alt="the dudette" src="https://zar.networkmanager.pl/static/media/cartoon.8cace218aea52624de38b8835e42bdb8.svg" width="200px" style="">

### Upcoming
* Managing your polls (list / edit / delete)
* UX improvements

### Bugs and issues
* False positive errors may sometimes occur 

# How it works⚙️

1. Create a poll<br><kbd><img alt="" src="https://zar.networkmanager.pl/static/readme/poll_setting.png" width="450px"></kbd><br>
 _(use multiple questions if you want)_<br><kbd><img alt="" src="https://zar.networkmanager.pl/static/readme/multiple_questions.png" width="450px"></kbd>

2. Select question types<br><kbd><img alt="" src="https://zar.networkmanager.pl/static/readme/single_multi_question.png" width="450px"></kbd>

3. Submit and share the link<br><kbd><img alt="" src="https://zar.networkmanager.pl/static/readme/link_sharing.png" width="450px"></kbd>

5. Let people vote<br><kbd><img alt="" src="https://zar.networkmanager.pl/static/readme/poll_filling.png" width="450px"></kbd>

6. Enjoy the results<br><kbd><img alt="" src="https://zar.networkmanager.pl/static/readme/results.png" width="450px"></kbd>



# About this repo🔍
This is a frontend client for the EZ Vote app. It was made using: 
* React [![react][react]][react-url] 
* Typescript [![typescript][typescript]][typescript-url]
* Additional packages, such as [React Hook Form](https://www.react-hook-form.com/), [react-icons](https://react-icons.github.io/react-icons/)


### Install locally
To install EZ Vote locally:

1. Clone the repo
   ```sh
   git clone https://github.com/mp-martin/ez-vote-front.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. run npm start
   ```sh
   npm start
   ```
###
<span style="color:#FF5F9E">You *will* need the EZ Vote Backend app for this to work</span>. 

Check it out at [https://github.com/mp-martin/ez-vote-back](https://github.com/mp-martin/ez-vote-back)

⚠️ Make sure the file structure of both apps is this *(and mind the folder names)*:

```
├─ //your folder
│   ├── ez-vote-backend
│   ├── ez-vote-frontend
```

# About the author
My name is Martin and I am on a journey to become a software engineer. By the way, I am a graphic designer.

You can find me on my [LinkedIn](https://www.linkedin.com/in/marcin-papierz/) 🤝


<!-- MARKDOWN LINKS & IMAGES -->
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
