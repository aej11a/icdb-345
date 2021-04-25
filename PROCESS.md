# Process

We used an agile scrum-ban approach for this project, meaning we divided the tickets into scrum-style sprints and then maintained a Kanban board for each sprint.

We had two one-week sprints, from 4/11 to 4-17 and 4/18 to 4/25.

## Meeting Notes

3/22:

-   Decided on bot concept
-   Designed architecture for bot
-   Started work on proposal

3/29:

-   Finalized proposal

4/10:
Sprint planning meeting

-   created GitHub issues based on planned functionality
-   conducted Pointing Poker session to assign story points to tickets
-   split tickets into sprints
-   assigned tickets to each team member

4/15:

-   Working session

4/17:

-   Sprint 1 retrospective
-   Cleaned Kanban board
-   Assigned sprint 2 tickets

4/22:

-   Working session

4/25:

-   Updated ticket statuses
-   Created new tickets for sprint 3
-   Completed Readme

## Story Creation

We created tickets based on tasks instead of user stories because we had a lot of tasks that were technical tasks rather than implementing a user-facing feature.

At the beginning of the project, before the 2 sprints, we had a sprint-planning meeting where we broke our project down into GitHub issues for each technical task. We used Pointing Poker to
assign story points to each ticket so that we could agree on the amount of work for each ticket.
We documented the story points as comments on each issue.

![Pointing Poker](https://github.com/aej11a/icdb-345/raw/main/docs/pointing_poker.PNG)

![Example Issue](https://github.com/aej11a/icdb-345/raw/main/docs/example_issue.PNG)

## Kanban Sprint Management

Within each sprint, we used a Kanban board through GitHub projects.

The screenshots below are documentation of each sprint.

### Sprint 1

We began with a sprint-planning meeting as mentioned above. Then we split up and each worked on features, mostly related to the basic project setup.

Sprint 1, beginning:
![Sprint 1 beginning](https://github.com/aej11a/icdb-345/raw/main/docs/begininng_kanban.PNG)

Sprint 1, in-progress:
![Sprint 1 in-progress](https://github.com/aej11a/icdb-345/raw/main/docs/sprint1_wip.PNG)

Sprint 1, end:
![Sprint 1 end](https://github.com/aej11a/icdb-345/raw/main/docs/sprint1_end.PNG)

#### Retrospective

Our process worked well but we started working late so we didn't get through as many tickets as ideal.

Next sprint, we should start earlier so that we can get through all of the basic functionality we need to develop.

### Sprint 2

Sprint 2, beginning:
![Sprint 2 beginning](https://github.com/aej11a/icdb-345/raw/main/docs/sprint2_beginning.PNG)

Sprint 2, end:
![Sprint 2 end](https://github.com/aej11a/icdb-345/raw/main/docs/sprint2_end.PNG)

Throughout the course of sprints 1 and 2, we added more issues which we would implement
in the next iteration of the project.

Leftover issues (sprint 3 backlog):
![Sprint 3 backlog](https://github.com/aej11a/icdb-345/raw/main/docs/sprint3_backlog.PNG)

#### Retrospective

We made really good progress this sprint, especially because everyone contributed early and often.
We spent a good amount of time on calls working together, but it paid off well because the bot is working well now.
As we worked, we added issues for Sprint 3.

## Technical Information

We are building a Node.JS discord bot which listens for mentions of prices or times and then converts them to each of the users' timezones and currencies in the channel, to aid in international communication.

We used GitHub for code and project management, and we used Prettier and ESLint for code formatting and static code testing.

We used a free currency converter API for currency conversion, and a custom-written JavaScript function for time conversion.
We're using Firebase to keep track of each user's currency code and timezone.

For now we are hosting the bot on our local machines, not yet in the cloud.

Architecture diagram is visible [here](https://excalidraw.com/#json=5732516476485632,PHBhVgbTFBjanz6dqAOWHw)
![Architecture](https://github.com/aej11a/icdb-345/raw/main/docs/icdb_architecture.png)
