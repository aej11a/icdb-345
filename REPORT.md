Have you ever found yourself in a team of people living in different areas of the world and sent a chat for a meeting time only in your timezone? As a result, your team had to manually convert your preferred meeting time into their respective time zones causing a complete inconvenience. Same goes for any currency conversions which can be a hassle if you don’t know the conversion rate from one country to another off the top of your head. The International Communication Discord Bot (ICDB) aims to remove all the hassle of both time and currency conversions in messaging exchanging real-time.

The ICDB can be added to any Discord channel. During the setup, any user in a specific discord server can input their preferred time zone and currency which will be stored in our Firebase database. From here, the bot automatically translates any time zone and currency mentioned in any exchange to a list of all the related ones. Currently, the bot supports 25 time zones and 160 currencies. Using the ICDB allows for better project communication which is crucial during this time of remote work and takes away the worries of missing a meeting due to time differences. As a result, members are able to focus on the actual content of the meeting, stress free.

## Screenshots
![1](https://user-images.githubusercontent.com/49913087/118015514-5cac7c80-b322-11eb-9e12-dff7deb77e13.png)

*!setup command allows users to set their preferred timezone and currency to be associated with their username to be stored to the Firebase Database*

![2](https://user-images.githubusercontent.com/49913087/118015715-967d8300-b322-11eb-802d-e04d163a056a.png)

*!whoami command allows the users to remind them of what their saved timezone and currency is*

![3](https://user-images.githubusercontent.com/49913087/118015908-ca58a880-b322-11eb-8a57-51a3f5efcd92.png)

*!help commands presents users with the different commands they’re able to use as well as an explanation*

![4](https://user-images.githubusercontent.com/49913087/118016010-e4928680-b322-11eb-8da5-00dff716e2cc.png)

*Currency queries must be a quantity followed by a three letter currency code. Time queries must be a regular time expression followed by an AM or PM*

In order to complete this project, our team used an agile scrum-ban approach, meaning we divided the tickets into scrum-style sprints and then maintained a Kanban board for each sprint. We had two one-week sprints, from 4/11 to 4-17 and 4/18 to 4/25.  We created tickets based on tasks instead of user stories because we had a lot of tasks that were technical tasks rather than implementing a user-facing feature.

At the beginning of the project, before the 2 sprints, we had a sprint-planning meeting where we broke our project down into GitHub issues for each technical task. We used Pointing Poker to assign story points to each ticket so that we could agree on the amount of work for each ticket. We documented the story points as comments on each issue.

Within each sprint, we used a Kanban board through GitHub projects. For Sprint 1, We split up each task and individually worked on our own features for the first week which was mostly project setup. In our second sprint, we proceeded with implementing the conversion features that included a currency conversion API and our own time conversion through Javascript. Our process worked really well but due to other commitments, we started working late so we didn't get through as many tickets as we could have earlier but we were still able to get a significant amount of work done. Our second sprint was definitely the most work heavy because that’s when the feature implementation actually began. We spent a good amount of time in calls which produced a really well functioning bot. Overall, we really worked well together on this project and we hope to implement this development process moving forward especially with our senior design projects.

The biggest limitation for this project was simply the time that we had to do it. We truly only had about two weeks to create the bot and it was during a time where other project milestones were also due so it was challenging to devote a consistent amount of time to development. During our milestone 2, we created tasks for a potential sprint 3 which are listed below:

- Delete old timezones from a channel when a user changes their personal time zone 
- Account for daylight savings time 
- Add Military Time Option
- Delete Test Function to clean up code 
- Include half-hour timezones in time conversion 
- Include decimals in currency conversion 

Once again, due to time constraints we will not be able to implement these features but overall, we are proud of our bot and learned so much during the short process. 

Screenshare: https://drive.google.com/file/d/13JaIFCR2Im27LasC9RUWCRuDyku6aKQL/view?usp=sharing
