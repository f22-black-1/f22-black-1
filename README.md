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
- Lukas Mckennedy - lmcke009@odu.edu
- Anton Rasmussen - arasm002@odu.edu
- Andrew Undercoffer - aunde001@odu.edu
- Val Vega - vvega001@odu.edu

### Instructor
- James Brunelle - jabrunel@odu.edu

### Repository Organization
We should refactor the repo into (at least) two main directories [with actual directory names TBD]:
```
application
website
```
[TBD] Under app directory we might expect a structure similar the following:
```
application/
|----front_end/
|    |----src
|    |----tests
|----back_end/
|    |----src
|    |----tests
...
```
Under `website` directory we include our website's files (as hosted on ODU CS Department's Linux Server):
```
website/
|----secure_html/
...
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

[TBD]



