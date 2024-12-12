1- npm init
2- create index.js
3- download some thing like
npm i sequelize sequelize-cli
npm install -g sequelize-cli
sequelize init, you will get migrations, config, seeder, etc. folder with files.
4- npm install jsonwebtoken
5- npm install dotenv

Based on this duration or min, there is marks or score, now up to means >= 
i am using 24 hours time duration
you have to write a function that will generate scores from these data stored in sadhna_report.js it has all 7 data 
use this data to generate score and stored that data in varaible with the name like sleepscore, wakeupscore, etc. and put that data into sadhna_score table
Image 1: Sleep time for sleepscore
Up to 22:15: 25 marks
Up to 22:30: 20 marks
Up to 22:45: 15 marks
Up to 23:00: 10 marks
Up to 23:15: 5 marks
Up to 23:30: 0 marks

Image 2: Wakeup time for wakeupscore
Up to 04:45: 25 marks
Up to 05:00: 20 marks
Up to 05:15: 15 marks
Up to 05:30: 10 marks
Up to 05:45: 5 marks
Up to 06:00: 0 marks

Image 3: Day rest duration for dayrestscore
Up to 60 min: 25 marks
Up to 75 min: 20 marks
Up to 90 min: 15 marks
Up to 105 min: 10 marks
Up to 120 min: 5 marks
Up to 135 min: 0 marks
Up to 150 min: -5 marks

Image 4: Target Chanting End Time for chantingscore
Up to 07:15: 25 marks
Up to 09:30: 20 marks
Up to 13:00: 15 marks
Up to 19:00: 10 marks
Up to 21:00: 5 marks
Up to 23:00: 0 marks
Up to 23:30: -5 marks

Image 5: Hearing Duration for hearingscore
Up to 0 min: 0 marks
Up to 5 min: 5 marks
Up to 10 min: 10 marks
Up to 20 min: 15 marks
Up to 25 min: 20 marks
Up to 30 min: 25 marks

Image 6: Reading Duration for readingscore
Up to 0 min: 0 marks
Up to 5 min: 5 marks
Up to 10 min: 10 marks
Up to 20 min: 15 marks
Up to 25 min: 20 marks
Up to 30 min: 25 marks

image 7 : serive durations for servicescore
up to 5 min : 0 marks
up to 10 min : 5 marks
up to 15 min : 10 marks
up to 20 min : 15 marks
up to 25 min : 20 marks
up to 30 min : 25 marks
