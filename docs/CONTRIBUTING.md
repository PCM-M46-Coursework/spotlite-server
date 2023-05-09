# Git Strategy: 

## Before:

1. Pull all the latest changes to the dev branch. This will ensure that your local repo has all the latest changes, that everyone has added to the entire project.

`git switch dev`
`git pull origin dev`

2. Update the feature branch that you will be working from. This will ensure that the feature branch you'll be working from has all the latest changes, that everyone has added to the entire project.

`git switch feature/control` (Change the branch name appropriately)
`git rebase dev`

3. Make a new working branch. This will ensure that your work will not interfere with the work of others. Choose your branch prefix from the following list: enhancement, bugfix, or documentation.

`git switch -c enhancement/<featurename>-<activity>-<initials>`

Examples:
`git switch -c enhancement/control-install-packages-pm`
`git switch -c bugfix/user-management-missing-comma-pm`
`git switch -c documentation/control-edit-readme-pm`

4. Push your branch to the repository. It's good to do this early, so that the team can see what you are working on, track your progress, and collaborate, if necessary.

`git push origin <branch-name>`

Examples:
`git push origin enhancement/control-install-packages-pm`

## During:

5. At regular intervals, once a section of code has been completed, add a commit to your branch.

`git add .`
`git commit -m "Hello, World!"`
`git push origin enhancement/control-install-packages-pm`

## After:

**THIS STEP IS OPTIONAL. If you are not comfortable with this, please ignore step 6 and 7. This will only ever need to be done if you think there is a good chance that your code will create merge conflicts. Most of the time, it’s not needed.**

6. Once we are ready to make a pull request, we need to once again, ensure that our branch is using the latest version of the code within the repo.

a) Switch to dev: `git switch dev`
b) Pull all changes: `git pull origin dev`
c) Switch back to your working branch: `git switch enhancement/control-install-packages-pm`
d) Merge the changes: `git merge dev --no-ff`

7. Resolve any merge conflicts that may have resulted from merging the branches in step 6. It is much easier to resolve these conflicts now, than later on. Work with the team, if choices need to be made, or if you are unsure about how to resolve the conflicts.

## Pull Request:

8. Now you can create a pull request on GitHub. It is very important to pay attention to which branches you are pulling from, and into. The "***base***" is the branch you are pulling into. The "***compare***" is the branch you are pulling from. This is a two step process. At each step, double check which branches you are working with.

a) Pull your working branch into the feature branch (***base:*** `feature/control`, ***compare:*** `enhancement/control-install-packages-pm`).
b) Once that has been accepted, and merged, pull the feature branch into dev (***base:*** `dev`, ***compare:*** `feature/control`).

If you find that you have added a pull request for the wrong branch, close the pull request, and start again. If multiple people are working on the same feature branch, we'll need to queue the requests, and do one at a time, to stop people losing work.

9.  GOTO 1.