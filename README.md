# Quiz Web Application

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Functionalities](#functionalities)
* [Setup](#setup)

## General info
This is a simple Quiz Game. The user has the possibility to select quiz categories and difficulty. Then, questions with multiple answer options are displayed on the screen.
The user selects the answer that he thinks is correct and immediately understands whether he gave a correct or incorrect answer (if it is correct the selected answer is colored green otherwise it becomes red). If the user does not give an answer within 15 seconds, the question is automatically marked as wrongly responsible.
The last screen displays information about the number of wrong and the number of correct answers given during the game.
	
## Technologies
Project is created with:
* npm version:         6.14.6
* Angular version:     11.2.4
* Typescript version :  4.1.5

## Functionalities
* GET QUESTIONS - API https://opentdb.com/api_config.php 
* GET QUESTIONS - node js server with mongo db
* TIMER - ngx-countdown (additional npm library)
* ANSWERS BACKGROUND COLOR  - angular attribute directives

	
## Setup
To run this project, download project folder quiz-web-app, in command prompt/terminal run:

```
$ cd ../quiz-web-app
$ ng serve
```
