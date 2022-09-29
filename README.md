## [Old Dominion University](https://www.odu.edu) CS411W 

## [Team Black - Fall 2022](https://www.cs.odu.edu/~411black)

```
______         _    ______     _             _
| ___ \       | |   | ___ \   | |           | |
| |_/ /__  ___| |_  | |_/ /_ _| |_ _ __ ___ | |
|  __/ _ \/ __| __| |  __/ _` | __| '__/ _ \| |
| | |  __/\__ \ |_  | | | (_| | |_| | | (_) | |
\_|  \___||___/\__| \_|  \__,_|\__|_|  \___/|_|

```

### Members

- Bryan Burton - bburt007@odu.edu
- Tom Cooch - tcooc001@odu.edu
- Trevor Hess - thess005@odu.edu
- Heather Mallalieu - hmall001@odu.edu
- Lukas McKennedy - lmcke009@odu.edu
- Anton Rasmussen - arasm002@odu.edu
- Andrew Undercoffer - aunde001@odu.edu
- Val Vega - vvega001@odu.edu

### Instructor
- James Brunelle - jabrunel@odu.edu

### Repository Organization

The meat of our application. The `client` directory is home to our front end and the `server` directory is home to our middleware/back end.
```
application
|----client/
|    |----src
|----server/
```
Some helpful scripts and what not can be found here:
```
utilities
```

Our website's files (as hosted on ODU CS Department's Linux Server) can be found here:
```
website/secure_html
```

### How to Use this Repository

##### Git Ops and Contributing Changes

Since we have multiple developers concurrently working on the same codebase, it is important to adopt a branching strategy that minimizes the amount of code conflicts.

**Git Flow:**

*Sync Local Repo with Main Code Line:*

Prior to making any changes, ensure your local repo is in sync with the main branch. (The assumption here is that any changes you made yesterday have already been commited and merged to the `main` branch (aka the "main code line") by today. So, if any changes made by other devs have been merged to the `main` branch between yesterday and today--perhaps because other people are working off hours, you want to start with the *latest* version of whats in main before making any changes today).

`git checkout main` # Ensures that you are on the main branch
`git pull origin main` # Syncs your local repo with what's in GitHub (the source of truth)

If you receive any errors it is likely because you have made changes to your local code that would cause a merge conflict and that code needs to be commited. Note: The next step should be done ***prior*** to commiting any code changes.

*Create a new branch:*

`git checkout -b <new branch name>`

Now you are safe to make changes. If you had an error when trying to pull down main you will need to do a commit and try the pull from main again (indeed this is even what git tells you you need to do). In this case, follow ***Path [A']*** below before moving to ***Path [A]*** otherwise, if you received no errors, GOTO ***Path [A]*** ... 


*Add and commit:*

`git add <whatever files have been added or changed *>`

\* Note: often if you are doing your git commands in the root of the repo you can just do `git .` and it'll pick up all the changes)

`git commit -m "<Descriptive commit message>"`


***Path [A']***

*Pull from main and merge:*

`git pull origin main`

At this point git will open vim and tell you to submit a merge message.

I always just save the file with the vim command `:x!` and hit [ENTER] 

***Path [A]***

*Push changes to new branch:*

`git push origin <new branch name>`

At this point you can go to GitHub and see a message about opening a Pull Request.

#### Story/Issue Tracking and Sub-Task Burndown

Navigation here will take you to our user stories (aka "issues"): https://github.com/f22-black-1/f22-black-1/issues

This page is pretty much only useful for quickly adding issues.

In order to see a better view of our stories it is better to navigate to our project's Kanban board here: https://github.com/orgs/f22-black-1/projects/1

1) Story/Issue is created on Kanban board
2) Story/Issue is claimed/assigned.
3) Story/Issue is broken up into smaller "sub tasks" (these can just be comments in the story or whatever and don't need to be tickets (yet!... see below))
4) Each sub task's work is done in a dev/feature branch
5) As each sub task is completed incremental changes should be committed to its corresponding dev/feature branch until that sub task is complete.
6) Next a PR is opened when the subtask is complete... this PR can be put on the Kanban to be tracked, and can be considered a "Sub task ticket". Each Sub task ticket moves to Done lane in Kanban when the PR is merged to master. (Though we do not yet move the Story/Issue ticket if there are still more subtasks)
7) When the PR is merged the process starts over at _Bullet-4_ until there are no more subtasks. Once the last PR for that issue is merged the issue itself can be closed and a new issue taken up.
8) ...
9) Profit