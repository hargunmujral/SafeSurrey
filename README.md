## Welcome to SafeSurrey!

# Purpose

I wanted to create a bot that scans recent headlines to alert when there is an act of violence in my home
town, Surrey British Columbia. Since the city was declared a hotspot for crime in Canada, I wanted to make sure that I would be alerted, because my entire family lives in the city and I want to be up-to-date in case of violence.

# Path

I decided to use NewsAPI to scrape the web of headlines within an hour timespan that contains a certain set of keywords. Every hour, a cronjob is run, and it sends a request to NewsAPI, which returns an object containing various datapoints and articles. This is hosted as a DiscordBot, which is now fully operational on my personal discord server.

# Ideas for improvement

I have a lot of ideas on what I can do to improve this project, listed below:

* Make the bot usable for any server, by simply inviting it and configuring it with built-in commands
* Let the home city be configurable for anyone
* Implement a mechanism to not allow repeat news stories
* Maybe change the scope of the project to instead make it an email/sms service instead of a discord bot
* Host on a remote server (probably docker -> docker hub -> digitalocean) 
